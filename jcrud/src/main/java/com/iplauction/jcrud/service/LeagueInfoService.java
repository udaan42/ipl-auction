package com.iplauction.jcrud.service;

import com.iplauction.jcrud.mapper.LeagueInfoLeagueInfoVOMapper;
import com.iplauction.jcrud.mapper.LeagueInfoVOLeagueInfoMapper;
import com.iplauction.jcrud.model.LeagueInfo;
import com.iplauction.jcrud.model.LeagueInfoVO;
import com.iplauction.jcrud.repository.LeagueInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LeagueInfoService {

    @Autowired
    LeagueInfoRepository leagueInfoRepository;

    @Autowired
    LeagueInfoLeagueInfoVOMapper leagueInfoLeagueInfoVOMapper;

    @Autowired
    LeagueInfoVOLeagueInfoMapper leagueInfoVOLeagueInfoMapper;

    public List<LeagueInfoVO> getAllLeagueDetails() throws Exception {

        List<LeagueInfoVO> leagueInfoVOS = new ArrayList<>();
        Iterable<LeagueInfo> leagueInfos = leagueInfoRepository.findAll();

        for(LeagueInfo leagueInfo : leagueInfos){
            leagueInfoVOS.add(leagueInfoLeagueInfoVOMapper.map(leagueInfo));
        }
        return leagueInfoVOS;
    }

    public LeagueInfoVO getLeagueInfoById(String leagueId) throws Exception {

        LeagueInfoVO leagueInfoVO = null;
        Optional<LeagueInfo> leagueInfo = Optional.ofNullable(leagueInfoRepository.findOne(leagueId));

        if(leagueInfo!=null){
            leagueInfoVO = leagueInfoLeagueInfoVOMapper.map(leagueInfo.get());
        }
        return leagueInfoVO;
    }

    public LeagueInfoVO addNewLeagueInfo(LeagueInfoVO leagueInfoVO) throws Exception {
        LeagueInfoVO leagueInfoVO1 = null;
        if(leagueInfoVO != null){
            LeagueInfo leagueInfo = leagueInfoVOLeagueInfoMapper.map(leagueInfoVO);
            leagueInfo = leagueInfoRepository.save(leagueInfo);
            leagueInfoVO1 = leagueInfoLeagueInfoVOMapper.map(leagueInfo);
            return leagueInfoVO1;
        }
        return leagueInfoVO1;
    }
}
