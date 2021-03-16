package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.LeagueUser;
import com.iplauction.jcrud.model.LeagueUserVO;
import com.iplauction.jcrud.model.PlayerInfo;
import com.iplauction.jcrud.model.PlayerInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Component
public class LeagueUserVOMapper implements Mapper<LeagueUser,LeagueUserVO> {

    @Autowired
    PlayerInfoPlayerInfoVOMapper playerInfoPlayerInfoVOMapper;

    @Override
    public LeagueUserVO map(LeagueUser source) throws Exception {
        LeagueUserVO leagueUserVO = new LeagueUserVO();
        leagueUserVO.setUserId(source.getUserId());
        leagueUserVO.setUserName(source.getUserName());
        leagueUserVO.setTeamName(source.getTeamName());
        leagueUserVO.setUserRole(source.getUserRole());
        leagueUserVO.setLeagueRole(source.getLeagueRole());
        leagueUserVO.setPoints(source.getPoints());
        leagueUserVO.setCreatedDateTime(source.getCreatedDateTime());
        leagueUserVO.setLastModifiedDateTime(source.getLastModifiedDateTime());
        List<PlayerInfoVO> playerInfoVOS = new ArrayList<>();
        if(!CollectionUtils.isEmpty(source.getPlayersSquad())){
            for(PlayerInfo playerInfo : source.getPlayersSquad()){
                playerInfoVOS.add(playerInfoPlayerInfoVOMapper.map(playerInfo));
            }
        }
        leagueUserVO.setPlayersSquad(playerInfoVOS);

        return leagueUserVO;
    }
}
