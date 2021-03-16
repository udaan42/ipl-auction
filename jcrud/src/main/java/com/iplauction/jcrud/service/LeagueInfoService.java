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

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
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

        if (leagueInfo != null) {
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
                leagueUserVO.setLeagueRole("Admin");
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
                if (leagueUserVO != null) {
                    Optional<LeagueInfo> optionalLeagueInfo = leagueInfoRepository.findById((leagueInfoId));
                    if (optionalLeagueInfo != null) {
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
            for (String leagueId : userLeagues) {
                Optional<LeagueInfo> optionalLeagueInfo = leagueInfoRepository.findById((leagueId));
                if (optionalLeagueInfo != null) {
                    leagueInfoVOS.add(leagueInfoLeagueInfoVOMapper.map(optionalLeagueInfo.get()));
                }
            }
        }
        return leagueInfoVOS;
    }

    public LeagueInfoVO sellPlayerToUser(String leagueId, String userId, String playerId,Long soldPrice) throws Exception {

        LeagueInfoVO leagueInfoVO = null;
        LeagueInfo leagueInfo = null;
        Optional<LeagueInfo> optionalLeagueInfo = leagueInfoRepository.findById((leagueId));
        leagueInfo=  optionalLeagueInfo.get();
        if(leagueInfo != null){
            if(!CollectionUtils.isEmpty(leagueInfo.getLeagueUsers())){
                for(LeagueUser leagueUser : leagueInfo.getLeagueUsers()){
                    if(!StringUtils.isEmpty(userId)){
                        if(!StringUtils.isEmpty(leagueUser.getUserId())){
                            if(leagueUser.getUserId().equalsIgnoreCase(userId)){
                                PlayerInfoVO playerInfoVO = playerService.getPlayerInfoById(playerId);
                                playerInfoVO.setSoldPrice(soldPrice);
                                if(playerInfoVO!= null) {
                                    if (!CollectionUtils.isEmpty(leagueUser.getPlayersSquad())) {
                                        leagueUser.getPlayersSquad().add(playerInfoVOPlayerInfoMapper.map(playerInfoVO));
                                        leagueInfoRepository.save(leagueInfo);
                                    }else{
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
        if(!StringUtils.isEmpty(leagueId)) {
            LeagueInfoVO leagueInfoVO = getLeagueInfoById(leagueId);
            if (leagueInfoVO != null) {
                if (!CollectionUtils.isEmpty(leagueInfoVO.getLeagueUsers())) {
                    for (LeagueUserVO leagueUserVO : leagueInfoVO.getLeagueUsers()) {
                        if (!StringUtils.isEmpty(userId)) {
                            if (!StringUtils.isEmpty(leagueUserVO.getUserId())) {
                                if (leagueUserVO.getUserId().equalsIgnoreCase(userId)) {
                                    if(!CollectionUtils.isEmpty(leagueUserVO.getPlayersSquad())){
                                        playerInfoVOS =  leagueUserVO.getPlayersSquad();
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
}
