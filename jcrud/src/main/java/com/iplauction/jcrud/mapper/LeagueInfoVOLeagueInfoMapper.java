package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.LeagueInfo;
import com.iplauction.jcrud.model.LeagueInfoVO;
import com.iplauction.jcrud.model.LeagueUser;
import com.iplauction.jcrud.model.LeagueUserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Component
public class LeagueInfoVOLeagueInfoMapper implements Mapper<LeagueInfoVO,LeagueInfo> {


    @Autowired
    LeagueUserMapper leagueUserMapper;

    @Override
    public LeagueInfo map(LeagueInfoVO source) throws Exception {
        LeagueInfo leagueInfo = new LeagueInfo();
        leagueInfo.setLeagueName(source.getLeagueName());
        leagueInfo.setCreatedDateTime(source.getCreatedDateTime());

        List<LeagueUser> leagueUsers = new ArrayList<>();
        if(!CollectionUtils.isEmpty(source.getLeagueUsers())){
            for(LeagueUserVO leagueUserVO : source.getLeagueUsers()){
                leagueUsers.add(leagueUserMapper.map(leagueUserVO));
            }
        }
        leagueInfo.setLeagueUsers(leagueUsers);
        leagueInfo.setIsActive(source.getIsActive());
        leagueInfo.setLeagueStatus(source.getLeagueStatus());

        return leagueInfo;
    }
}
