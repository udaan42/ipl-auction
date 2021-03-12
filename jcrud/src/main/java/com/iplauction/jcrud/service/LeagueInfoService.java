package com.iplauction.jcrud.service;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.iplauction.jcrud.mapper.LeagueInfoLeagueInfoVOMapper;
import com.iplauction.jcrud.mapper.LeagueInfoVOLeagueInfoMapper;
import com.iplauction.jcrud.mapper.LeagueUserMapper;
import com.iplauction.jcrud.model.LeagueInfo;
import com.iplauction.jcrud.model.LeagueInfoVO;
import com.iplauction.jcrud.model.LeagueUserVO;
import com.iplauction.jcrud.repository.LeagueInfoRepository;
import org.apache.commons.lang3.StringUtils;
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

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    @Autowired
    LeagueUserMapper leagueUserMapper;

    public List<LeagueInfoVO> getAllLeagueDetails() throws Exception {

        List<LeagueInfoVO> leagueInfoVOS = new ArrayList<>();
        Iterable<LeagueInfo> leagueInfos = leagueInfoRepository.findAll();

        for(LeagueInfo leagueInfo : leagueInfos){
            leagueInfoVOS.add(leagueInfoLeagueInfoVOMapper.map(leagueInfo));
        }
        return leagueInfoVOS;
    }

    public LeagueInfoVO getLeagueInfoById(String leagueInfoId) throws Exception {

        LeagueInfoVO leagueInfoVO = null;
        Optional<LeagueInfo> leagueInfo = leagueInfoRepository.findById((leagueInfoId));

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

    public LeagueInfoVO joinLeague(LeagueUserVO leagueUserVO, String leagueInfoId) throws Exception {

        LeagueInfoVO leagueInfoVO = null;
        if(leagueUserVO != null) {
            Optional<LeagueInfo> optionalLeagueInfo = leagueInfoRepository.findById((leagueInfoId));

            if (optionalLeagueInfo != null) {
                LeagueInfo leagueInfo = optionalLeagueInfo.get();
                leagueInfo.getLeagueUsers().add(leagueUserMapper.map(leagueUserVO));
                leagueInfo = leagueInfoRepository.save(leagueInfo);
                leagueInfoVO = leagueInfoLeagueInfoVOMapper.map(leagueInfo);
            }
        }
        return leagueInfoVO;
    }
}
