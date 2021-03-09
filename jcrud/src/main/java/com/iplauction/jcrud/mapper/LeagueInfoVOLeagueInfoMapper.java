package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.LeagueInfo;
import com.iplauction.jcrud.model.LeagueInfoVO;
import org.springframework.stereotype.Component;

@Component
public class LeagueInfoVOLeagueInfoMapper implements Mapper<LeagueInfoVO,LeagueInfo> {
    @Override
    public LeagueInfo map(LeagueInfoVO source) throws Exception {
        LeagueInfo leagueInfo = new LeagueInfo();
        leagueInfo.setLeagueName(source.getLeagueName());
        leagueInfo.setUserId(source.getUserId());
        leagueInfo.setUserName(source.getUserName());
        leagueInfo.setCreatedDateTime(source.getCreatedDateTime());
        leagueInfo.setUserRole(source.getUserRole());
        leagueInfo.setLastModifiedDateTime(source.getLastModifiedDateTime());
        return leagueInfo;
    }
}
