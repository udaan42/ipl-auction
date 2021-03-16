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

        List<PlayerInfo> playerInfos = new ArrayList<>();
        if(!CollectionUtils.isEmpty(source.getPlayersSquad())){
            for(PlayerInfoVO playerInfoVO : source.getPlayersSquad()){
                playerInfos.add(playerInfoVOPlayerInfoMapper.map(playerInfoVO));
            }
        }
        leagueUser.setPlayersSquad(playerInfos);
        return leagueUser;
    }
}
