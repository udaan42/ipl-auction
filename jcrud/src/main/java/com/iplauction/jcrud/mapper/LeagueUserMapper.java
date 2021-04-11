package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Component
public class LeagueUserMapper implements Mapper<LeagueUserVO, LeagueUser> {

    @Autowired
    PlayerInfoVOPlayerInfoMapper playerInfoVOPlayerInfoMapper;

    @Override
    public LeagueUser map(LeagueUserVO source) throws Exception {
        LeagueUser leagueUser = new LeagueUser();
        leagueUser.setUserId(source.getUserId());
        leagueUser.setUserName(source.getUserName());
        leagueUser.setTeamName(source.getTeamName());
        leagueUser.setUserRole(source.getUserRole());
        leagueUser.setLeagueRole(source.getLeagueRole());
        leagueUser.setPoints(source.getPoints());
        leagueUser.setCreatedDateTime(source.getCreatedDateTime());
        leagueUser.setLastModifiedDateTime(source.getLastModifiedDateTime());
        leagueUser.setSpentAmount(source.getSpentAmount());
        leagueUser.setTotalBudget(source.getTotalBudget());
        leagueUser.setRemainingBudget(source.getRemainingBudget());

        List<PlayerInfo> playerInfos = new ArrayList<>();
        if(!CollectionUtils.isEmpty(source.getPlayersSquad())){
            for(PlayerInfoVO playerInfoVO : source.getPlayersSquad()){
                playerInfos.add(playerInfoVOPlayerInfoMapper.map(playerInfoVO));
            }
        }
        List<FinalSquad> finalSquadVOS = new ArrayList<>();
        if(!CollectionUtils.isEmpty(source.getFinalSquad())){
            for(FinalSquadVO finalSquadVO : source.getFinalSquad()){
                FinalSquad finalSquad = new FinalSquad();
                finalSquad.setPlayerId(finalSquadVO.getPlayerId());
                finalSquad.setPlayerName(finalSquadVO.getPlayerName());
                finalSquad.setCaptain(finalSquadVO.getCaptain());
                finalSquad.setWicketKeeper(finalSquadVO.getWicketKeeper());
                finalSquad.setPoints(finalSquadVO.getPoints());
                finalSquad.setTeamName(finalSquadVO.getTeamName());
                finalSquad.setPlayerRole(finalSquadVO.getPlayerRole());
                finalSquad.setRank(finalSquadVO.getRank());
                finalSquadVOS.add(finalSquad);
            }
        }
        leagueUser.setPlayersSquad(playerInfos);
        leagueUser.setFinalSquad(finalSquadVOS);
        return leagueUser;
    }
}
