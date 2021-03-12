package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.LeagueUser;
import com.iplauction.jcrud.model.LeagueUserVO;
import org.springframework.stereotype.Component;

@Component
public class LeagueUserVOMapper implements Mapper<LeagueUser,LeagueUserVO> {
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
        return leagueUserVO;
    }
}
