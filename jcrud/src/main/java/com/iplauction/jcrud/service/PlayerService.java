package com.iplauction.jcrud.service;

import com.iplauction.jcrud.mapper.PlayerInfoPlayerInfoVOMapper;
import com.iplauction.jcrud.mapper.PlayerInfoVOPlayerInfoMapper;
import com.iplauction.jcrud.model.*;
import com.iplauction.jcrud.repository.PlayerInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    ScoreService scoreService;

    @Autowired
    PlayerInfoPlayerInfoVOMapper playerInfoPlayerInfoVOMapper;

    @Autowired
    PlayerInfoVOPlayerInfoMapper playerInfoVOPlayerInfoMapper;

    @Autowired
    PlayerInfoRepository playerInfoRepository;


    public PlayerInfoVO addNewPlayer(PlayerInfoVO playerInfoVO) throws Exception {
        PlayerInfoVO playerInfoVO1 = null;
        if(playerInfoVO != null){
            PlayerInfo playerInfo = playerInfoVOPlayerInfoMapper.map(playerInfoVO);
            playerInfo = playerInfoRepository.save(playerInfo);
            playerInfoVO1 = playerInfoPlayerInfoVOMapper.map(playerInfo);
            return playerInfoVO1;
        }
        return playerInfoVO1;
    }

    public List<PlayerInfoVO> getAllPlayers() throws Exception {

        List<PlayerInfoVO> playerInfoVOS = new ArrayList<>();
        Iterable<PlayerInfo> playerInfos = playerInfoRepository.findAll();

        for(PlayerInfo playerInfo : playerInfos){
            playerInfoVOS.add(playerInfoPlayerInfoVOMapper.map(playerInfo));
        }
        return playerInfoVOS;
    }

    public PlayerInfoVO getPlayerInfoById(String playerInfoId) throws Exception {

        PlayerInfoVO playerInfoVO = null;
        Optional<PlayerInfo> playerInfo = playerInfoRepository.findById((playerInfoId));

        if(playerInfo!=null && playerInfo.isPresent()){
            playerInfoVO = playerInfoPlayerInfoVOMapper.map(playerInfo.get());
        }
        return playerInfoVO;
    }

    public List<PlayerInfoVO> getPlayersByBag(String bagNumber) throws Exception {

        List<PlayerInfoVO> playerInfoVOS = new ArrayList<>();
        List<PlayerInfoVO> playerInfoByBag = new ArrayList<>();
        Iterable<PlayerInfo> playerInfos = playerInfoRepository.findAll();

        for(PlayerInfo playerInfo : playerInfos){
            playerInfoVOS.add(playerInfoPlayerInfoVOMapper.map(playerInfo));
        }

        if(!CollectionUtils.isEmpty(playerInfoVOS)){
            for(PlayerInfoVO playerInfoVO : playerInfoVOS){
                if(playerInfoVO.getBagNumber() != null){
                    if(playerInfoVO.getBagNumber() == Integer.parseInt(bagNumber)){
                        playerInfoByBag.add(playerInfoVO);
                    }
                }
            }
        }
        return playerInfoByBag;
    }

    public List<PlayerInfoVO> calculatePoints(MatchStats matchStats) throws Exception {

        List<String> playersWhoPlayedCurrentMatch = new ArrayList<>();
        List<PlayerInfoVO> playerInfoVOS = new ArrayList<>();
        double stumpingPoints = 0.0;
        if(matchStats != null){
            if(!CollectionUtils.isEmpty(matchStats.getPlayerMatchStatList())){
                for(PlayerMatchStat playerMatchStat : matchStats.getPlayerMatchStatList()){
                    playersWhoPlayedCurrentMatch.add(playerMatchStat.getPlayerId());
                    playerMatchStat.setTotalMatchPoint(0.0);
                    Optional<PlayerInfo> optionalPlayerInfo = playerInfoRepository.findById((playerMatchStat.getPlayerId()));
                    PlayerInfo playerInfo = optionalPlayerInfo.get();

                    if(playerInfo!=null){
                        if(playerMatchStat.getBattingStats() != null) {
                           double battingPoints = scoreService.calculateBattingPoints(playerMatchStat.getBattingStats(),playerInfo.getPlayerRole());
                            playerMatchStat.getBattingStats().setBattingPoints(battingPoints);
                            playerMatchStat.setTotalMatchPoint(playerMatchStat.getTotalMatchPoint() + battingPoints);
                        }
                        if(playerMatchStat.getBowlingStats() != null) {
                           double bowlingPoints = scoreService.calculateBowlingPoints(playerMatchStat.getBowlingStats(),playerInfo.getPlayerRole());
                            playerMatchStat.getBowlingStats().setBowlingPoints(bowlingPoints);
                            playerMatchStat.setTotalMatchPoint(playerMatchStat.getTotalMatchPoint() + bowlingPoints);
                        }
                        if(playerMatchStat.getFieldingStats() != null) {
                            double fieldingPoints = scoreService.calculateFieldingPoints(playerMatchStat.getFieldingStats(),playerInfo.getPlayerRole());
                            playerMatchStat.getFieldingStats().setFieldingPoints(fieldingPoints);
                            stumpingPoints = scoreService.calculateStumpingPoints(playerMatchStat.getFieldingStats(),playerInfo.getPlayerRole());
                            playerMatchStat.setTotalMatchPoint(playerMatchStat.getTotalMatchPoint() + fieldingPoints + stumpingPoints);
                        }
                    }
                    MatchesList matchesList = new MatchesList();
                    matchesList.setMatchDate(matchStats.getMatchDate());
                    matchesList.setMatchId(matchStats.getMatchId());
                    matchesList.setMatchName(matchStats.getMatchName());
                    matchesList.setPlayerMatchStat(playerMatchStat);
                    matchesList.setLatest(true);
                  if(CollectionUtils.isEmpty(playerInfo.getMatchesList())){
                      List<MatchesList> matchesLists = new ArrayList<>();
                      matchesLists.add(matchesList);
                      playerInfo.setMatchesList(matchesLists);

                  }else{
                      playerInfo.getMatchesList().add(matchesList);
                      for(MatchesList matchesList1 : playerInfo.getMatchesList()){
                          if(matchesList1.getMatchId() != matchesList.getMatchId()){
                              matchesList1.setLatest(false);
                          }
                      }
                  }
                  if(playerMatchStat.getMOM()){
                      playerMatchStat.setTotalMatchPoint(playerMatchStat.getTotalMatchPoint() + 25);
                  }
                  playerInfo.setLatestMatchPoint(playerMatchStat.getTotalMatchPoint());
                  playerInfo.setLatestStumpingPoint(stumpingPoints);
                  playerInfo =  playerInfoRepository.save(playerInfo);
                  playerInfoVOS.add(playerInfoPlayerInfoVOMapper.map(playerInfo));
                }
            }
        }
        return playerInfoVOS;
    }

    public List<PlayerInfoVO> setLatestFlag(List<String> playerIds) throws Exception {

        List<PlayerInfoVO> playerInfoVOS = new ArrayList<>();
        for(String playerId: playerIds){
            Optional<PlayerInfo> optionalPlayerInfo = playerInfoRepository.findById(playerId);
            PlayerInfo playerInfo = optionalPlayerInfo.get();
            if(playerInfo != null){
                playerInfo.setPlayedToday(true);
                playerInfo =  playerInfoRepository.save(playerInfo);
                playerInfoVOS.add(playerInfoPlayerInfoVOMapper.map(playerInfo));
            }
        }
        return playerInfoVOS;
    }
}
