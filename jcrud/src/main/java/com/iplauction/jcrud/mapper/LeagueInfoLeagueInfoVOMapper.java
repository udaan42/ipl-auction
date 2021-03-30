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
public class LeagueInfoLeagueInfoVOMapper implements Mapper<LeagueInfo, LeagueInfoVO> {

    @Autowired
    LeagueUserVOMapper leagueUserVOMapper;

    @Override
    public LeagueInfoVO map(LeagueInfo source) throws Exception {
        LeagueInfoVO leagueInfoVO = new LeagueInfoVO();
        leagueInfoVO.setLeagueId(source.getLeagueId());
        leagueInfoVO.setLeagueName(source.getLeagueName());
        leagueInfoVO.setCreatedDateTime(source.getCreatedDateTime());
        leagueInfoVO.setLastModifiedDateTime(source.getLastModifiedDateTime());


        List<LeagueUserVO> leagueUserVOS = new ArrayList<>();
        if(!CollectionUtils.isEmpty(source.getLeagueUsers())){
            for(LeagueUser leagueUser : source.getLeagueUsers()){
                leagueUserVOS.add(leagueUserVOMapper.map(leagueUser));
            }
        }

        leagueInfoVO.setLeagueUsers(leagueUserVOS);
        leagueInfoVO.setIsActive(source.getIsActive());
        leagueInfoVO.setLeagueStatus(source.getLeagueStatus());
        return leagueInfoVO;
    }
}
