package com.iplauction.jcrud.service;

import com.iplauction.jcrud.mapper.PlayerInfoPlayerInfoVOMapper;
import com.iplauction.jcrud.mapper.PlayerInfoVOPlayerInfoMapper;
import com.iplauction.jcrud.model.PlayerInfo;
import com.iplauction.jcrud.model.PlayerInfoVO;
import com.iplauction.jcrud.model.UserInfo;
import com.iplauction.jcrud.model.UserInfoVO;
import com.iplauction.jcrud.repository.PlayerInfoRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

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

        if(playerInfo!=null){
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
                if(!StringUtils.isEmpty(playerInfoVO.getBagNumber())){
                    if(playerInfoVO.getBagNumber().equalsIgnoreCase(bagNumber)){
                        playerInfoByBag.add(playerInfoVO);
                    }
                }
            }
        }
        return playerInfoByBag;
    }
}
