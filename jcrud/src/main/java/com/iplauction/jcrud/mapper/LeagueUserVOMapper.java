package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.*;
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
        leagueUserVO.setSpentAmount(source.getSpentAmount());
        leagueUserVO.setTotalBudget(source.getTotalBudget());
        leagueUserVO.setRemainingBudget(source.getRemainingBudget());
        List<PlayerInfoVO> playerInfoVOS = new ArrayList<>();
        if(!CollectionUtils.isEmpty(source.getPlayersSquad())){
            for(PlayerInfo playerInfo : source.getPlayersSquad()){
                playerInfoVOS.add(playerInfoPlayerInfoVOMapper.map(playerInfo));
            }
        }
        List<FinalSquadVO> finalSquadVOS = new ArrayList<>();
        if(!CollectionUtils.isEmpty(source.getFinalSquad())){
            for(FinalSquad finalSquad : source.getFinalSquad()){
                FinalSquadVO finalSquadVO = new FinalSquadVO();
                finalSquadVO.setPlayerId(finalSquad.getPlayerId());
                finalSquadVO.setPlayerName(finalSquad.getPlayerName());
                finalSquadVO.setCaptain(finalSquad.getCaptain());
                finalSquadVO.setWicketKeeper(finalSquad.getWicketKeeper());
                finalSquadVO.setPoints(finalSquad.getPoints());
                finalSquadVO.setTeamName(finalSquad.getTeamName());
                finalSquadVOS.add(finalSquadVO);
            }
        }
        leagueUserVO.setPlayersSquad(playerInfoVOS);
        leagueUserVO.setFinalSquad(finalSquadVOS);
        return leagueUserVO;
    }
}
