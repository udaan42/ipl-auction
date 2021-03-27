package com.iplauction.jcrud.service;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.iplauction.jcrud.mapper.LeagueInfoLeagueInfoVOMapper;
import com.iplauction.jcrud.mapper.LeagueInfoVOLeagueInfoMapper;
import com.iplauction.jcrud.mapper.LeagueUserMapper;
import com.iplauction.jcrud.mapper.PlayerInfoVOPlayerInfoMapper;
import com.iplauction.jcrud.model.*;
import com.iplauction.jcrud.repository.LeagueInfoRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LeagueInfoService {

    @Autowired
    LeagueInfoRepository leagueInfoRepository;

    @Autowired
    LeagueInfoLeagueInfoVOMapper leagueInfoLeagueInfoVOMapper;

    @Autowired
    LeagueInfoVOLeagueInfoMapper leagueInfoVOLeagueInfoMapper;

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    @Autowired
    LeagueUserMapper leagueUserMapper;

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    PlayerService playerService;

    @Autowired
    PlayerInfoVOPlayerInfoMapper playerInfoVOPlayerInfoMapper;


    public List<LeagueInfoVO> getAllLeagueDetails() throws Exception {

        List<LeagueInfoVO> leagueInfoVOS = new ArrayList<>();
        Iterable<LeagueInfo> leagueInfos = leagueInfoRepository.findAll();

        for (LeagueInfo leagueInfo : leagueInfos) {
            leagueInfoVOS.add(leagueInfoLeagueInfoVOMapper.map(leagueInfo));
        }
        return leagueInfoVOS;
    }

    public LeagueInfoVO getLeagueInfoById(String leagueInfoId) throws Exception {

        LeagueInfoVO leagueInfoVO = null;
        Optional<LeagueInfo> leagueInfo = leagueInfoRepository.findById((leagueInfoId));

        if (leagueInfo != null && leagueInfo.isPresent()) {
            leagueInfoVO = leagueInfoLeagueInfoVOMapper.map(leagueInfo.get());
        }
        return leagueInfoVO;
    }

    public LeagueInfoVO addNewLeagueInfo(LeagueInfoVO leagueInfoVO, String userId) throws Exception {
        LeagueInfoVO leagueInfoVO1 = null;

        if (!StringUtils.isEmpty(userId)) {
            UserInfoVO userInfoVO = userInfoService.getUserInfoById(userId);
            if (userInfoVO != null) {
                LeagueUserVO leagueUserVO = new LeagueUserVO();
                leagueUserVO.setUserId(userInfoVO.getUserId());
                leagueUserVO.setUserRole(userInfoVO.getUserRole());
                leagueUserVO.setUserName(userInfoVO.getUserName());
                leagueUserVO.setLeagueRole(leagueInfoVO.getLeagueUsers().get(0).getLeagueRole());
                leagueUserVO.setTeamName(leagueInfoVO.getLeagueUsers().get(0).getTeamName());
                if (leagueInfoVO != null) {
                    List<LeagueUserVO> leagueUserVOS = new ArrayList<>();
                    leagueUserVOS.add(leagueUserVO);
                    leagueInfoVO.setLeagueUsers(leagueUserVOS);
                    LeagueInfo leagueInfo = leagueInfoVOLeagueInfoMapper.map(leagueInfoVO);
                    leagueInfo = leagueInfoRepository.save(leagueInfo);
                    leagueInfoVO1 = leagueInfoLeagueInfoVOMapper.map(leagueInfo);
                    userInfoService.addLeagueToUser(userId, leagueInfoVO1.getLeagueId());
                    return leagueInfoVO1;
                }
            }
        }
        return leagueInfoVO1;
    }

    public LeagueInfoVO joinLeague(LeagueUserVO leagueUserVO, String leagueInfoId, String userId) throws Exception {

        LeagueInfoVO leagueInfoVO = null;
        if (!StringUtils.isEmpty(userId)) {
            UserInfoVO userInfoVO = userInfoService.getUserInfoById(userId);
            if (userInfoVO != null) {
                leagueUserVO.setUserId(userInfoVO.getUserId());
                leagueUserVO.setUserRole(userInfoVO.getUserRole());
                leagueUserVO.setUserName(userInfoVO.getUserName());
                leagueUserVO.setTotalBudget((long) 10000);
                leagueUserVO.setRemainingBudget((long) 10000);
                leagueUserVO.setSpentAmount((long) 0);
                if (leagueUserVO != null) {
                    Optional<LeagueInfo> optionalLeagueInfo = leagueInfoRepository.findById((leagueInfoId));
                    if (optionalLeagueInfo != null && optionalLeagueInfo.isPresent()) {
                        LeagueInfo leagueInfo = optionalLeagueInfo.get();
                        leagueInfo.getLeagueUsers().add(leagueUserMapper.map(leagueUserVO));
                        leagueInfo = leagueInfoRepository.save(leagueInfo);
                        leagueInfoVO = leagueInfoLeagueInfoVOMapper.map(leagueInfo);
                        userInfoService.addLeagueToUser(userId, leagueInfoVO.getLeagueId());
                    }
                }
            }
        }

        return leagueInfoVO;
    }

    public List<LeagueInfoVO> getLeagueInfoByUserId(String userId) throws Exception {

        List<LeagueInfoVO> leagueInfoVOS = new ArrayList<>();
        UserInfoVO userInfoVO = userInfoService.getUserInfoById(userId);
        if (userInfoVO != null) {
            List<String> userLeagues = userInfoVO.getUserLeagues();
            if(!CollectionUtils.isEmpty(userLeagues)) {
                for (String leagueId : userLeagues) {
                    Optional<LeagueInfo> optionalLeagueInfo = leagueInfoRepository.findById((leagueId));
                    if (optionalLeagueInfo != null && optionalLeagueInfo.isPresent()) {
                        leagueInfoVOS.add(leagueInfoLeagueInfoVOMapper.map(optionalLeagueInfo.get()));
                    }
                }
            }
        }
        return leagueInfoVOS;
    }

    public LeagueInfoVO sellPlayerToUser(String leagueId, String userId, String playerId, Long soldPrice) throws Exception {

        LeagueInfoVO leagueInfoVO = null;
        LeagueInfo leagueInfo = null;
        Optional<LeagueInfo> optionalLeagueInfo = leagueInfoRepository.findById((leagueId));
        if (optionalLeagueInfo != null && optionalLeagueInfo.isPresent()) {
            leagueInfo = optionalLeagueInfo.get();
        }

        if (leagueInfo != null) {
            if (!CollectionUtils.isEmpty(leagueInfo.getLeagueUsers())) {
                for (LeagueUser leagueUser : leagueInfo.getLeagueUsers()) {
                    if (!StringUtils.isEmpty(userId)) {
                        if (!StringUtils.isEmpty(leagueUser.getUserId())) {
                            if (leagueUser.getUserId().equalsIgnoreCase(userId)) {
                                PlayerInfoVO playerInfoVO = playerService.getPlayerInfoById(playerId);
                                playerInfoVO.setSoldPrice(soldPrice);
                                playerInfoVO.setWicketKeeper(false);
                                playerInfoVO.setCaptain(false);
                                playerInfoVO.setPlaying(false);
                                leagueUser.setSpentAmount(leagueUser.getSpentAmount() + soldPrice);
                                leagueUser.setRemainingBudget(leagueUser.getRemainingBudget() - soldPrice);
                                if (playerInfoVO != null) {
                                    if (!CollectionUtils.isEmpty(leagueUser.getPlayersSquad())) {
                                        leagueUser.getPlayersSquad().add(playerInfoVOPlayerInfoMapper.map(playerInfoVO));
                                        leagueInfoRepository.save(leagueInfo);
                                    } else {
                                        List<PlayerInfo> playerInfos = new ArrayList<>();
                                        playerInfos.add(playerInfoVOPlayerInfoMapper.map(playerInfoVO));
                                        leagueUser.setPlayersSquad(playerInfos);
                                        leagueInfo = leagueInfoRepository.save(leagueInfo);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        leagueInfoVO = leagueInfoLeagueInfoVOMapper.map(leagueInfo);
        return leagueInfoVO;
    }

    public List<PlayerInfoVO> getTeamSquad(String leagueId, String userId) throws Exception {

        List<PlayerInfoVO> playerInfoVOS = null;
        if (!StringUtils.isEmpty(leagueId)) {
            LeagueInfoVO leagueInfoVO = getLeagueInfoById(leagueId);
            if (leagueInfoVO != null) {
                if (!CollectionUtils.isEmpty(leagueInfoVO.getLeagueUsers())) {
                    for (LeagueUserVO leagueUserVO : leagueInfoVO.getLeagueUsers()) {
                        if (!StringUtils.isEmpty(userId)) {
                            if (!StringUtils.isEmpty(leagueUserVO.getUserId())) {
                                if (leagueUserVO.getUserId().equalsIgnoreCase(userId)) {
                                    if (!CollectionUtils.isEmpty(leagueUserVO.getPlayersSquad())) {
                                        playerInfoVOS = leagueUserVO.getPlayersSquad();
                                        return playerInfoVOS;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    public List<PlayerInfoVO> updateTeamSquad(String leagueId, String userId, List<PlayerInfoVO> playerInfoVOS) throws Exception {

        List<PlayerInfo> playerInfos = new ArrayList<>();
        if (!CollectionUtils.isEmpty(playerInfoVOS)) {
            for (PlayerInfoVO playerInfoVO : playerInfoVOS) {
                playerInfos.add(playerInfoVOPlayerInfoMapper.map(playerInfoVO));
            }
        }

        if (!StringUtils.isEmpty(leagueId)) {
            Optional<LeagueInfo> optionalLeagueInfo = leagueInfoRepository.findById((leagueId));
            if (optionalLeagueInfo != null && optionalLeagueInfo.isPresent()) {
                LeagueInfo leagueInfo = optionalLeagueInfo.get();
                if (leagueInfo != null) {
                    if (!CollectionUtils.isEmpty(leagueInfo.getLeagueUsers())) {
                        for (LeagueUser leagueUser : leagueInfo.getLeagueUsers()) {
                            if (!StringUtils.isEmpty(userId)) {
                                if (!StringUtils.isEmpty(leagueUser.getUserId())) {
                                    if (leagueUser.getUserId().equalsIgnoreCase(userId)) {
                                        if (!CollectionUtils.isEmpty(leagueUser.getPlayersSquad())) {
                                            leagueUser.setPlayersSquad(playerInfos);
                                            leagueInfo = leagueInfoRepository.save(leagueInfo);
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }

        List<PlayerInfoVO> playerInfoVOS1 = getTeamSquad(leagueId,userId);

        return playerInfoVOS1;

    }

    public List<PlayerInfoVO> getUnsoldPlayers(String leagueId) throws Exception {

        List<String> soldPlayers = new ArrayList<>();
        List<PlayerInfoVO> unSoldPlayers = new ArrayList<>();
        if (!StringUtils.isEmpty(leagueId)) {
            Optional<LeagueInfo> optionalLeagueInfo = leagueInfoRepository.findById((leagueId));
            if (optionalLeagueInfo != null && optionalLeagueInfo.isPresent()) {
                LeagueInfo leagueInfo = optionalLeagueInfo.get();
                if(leagueInfo != null){
                    if(!CollectionUtils.isEmpty(leagueInfo.getLeagueUsers())){
                        for(LeagueUser leagueUser : leagueInfo.getLeagueUsers()){
                            if(!CollectionUtils.isEmpty(leagueUser.getPlayersSquad())){
                                for(PlayerInfo playerInfo : leagueUser.getPlayersSquad()){
                                    if(!StringUtils.isEmpty(playerInfo.getPlayerId())){
                                        soldPlayers.add(playerInfo.getPlayerId());
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        List<PlayerInfoVO> allPlayers = playerService.getAllPlayers();
        if(!CollectionUtils.isEmpty(allPlayers)){
            for(PlayerInfoVO playerInfoVO : allPlayers){
                if(!soldPlayers.contains(playerInfoVO.getPlayerId())){
                    unSoldPlayers.add(playerInfoVO);
                }
            }
        }
        return unSoldPlayers;
    }
}
