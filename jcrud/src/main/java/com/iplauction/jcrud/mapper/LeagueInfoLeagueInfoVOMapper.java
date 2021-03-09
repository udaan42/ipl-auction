package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.LeagueInfo;
import com.iplauction.jcrud.model.LeagueInfoVO;
import org.springframework.stereotype.Component;

@Component
public class LeagueInfoLeagueInfoVOMapper implements Mapper<LeagueInfo, LeagueInfoVO> {
    @Override
    public LeagueInfoVO map(LeagueInfo source) throws Exception {
        LeagueInfoVO leagueInfoVO = new LeagueInfoVO();
        leagueInfoVO.setLeagueId(source.getLeagueId());
        leagueInfoVO.setLeagueName(source.getLeagueName());
        leagueInfoVO.setUserId(source.getUserId());
        leagueInfoVO.setUserName(source.getUserName());
        leagueInfoVO.setCreatedDateTime(source.getCreatedDateTime());
        leagueInfoVO.setUserRole(source.getUserRole());
        leagueInfoVO.setLastModifiedDateTime(source.getLastModifiedDateTime());
        leagueInfoVO.setTeamName(source.getTeamName());
        return leagueInfoVO;
    }
}
