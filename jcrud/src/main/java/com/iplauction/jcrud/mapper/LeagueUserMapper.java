package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.LeagueUser;
import com.iplauction.jcrud.model.LeagueUserVO;
import org.springframework.stereotype.Component;

@Component
public class LeagueUserMapper implements Mapper<LeagueUserVO, LeagueUser> {
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
        return leagueUser;
    }
}
