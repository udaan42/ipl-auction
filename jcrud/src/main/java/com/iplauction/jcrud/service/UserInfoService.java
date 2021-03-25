package com.iplauction.jcrud.service;

import com.iplauction.jcrud.mapper.UserInfoUserInfoVOMapper;
import com.iplauction.jcrud.mapper.UserInfoVOUserInfoMapper;
import com.iplauction.jcrud.model.LeagueInfo;
import com.iplauction.jcrud.model.LeagueInfoVO;
import com.iplauction.jcrud.model.UserInfo;
import com.iplauction.jcrud.model.UserInfoVO;
import com.iplauction.jcrud.repository.UserInfoRepository;
import org.apache.commons.lang3.StringUtils;
import org.graalvm.compiler.lir.LIRInstruction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService {

    @Autowired
    UserInfoVOUserInfoMapper userInfoVOUserInfoMapper;

    @Autowired
    UserInfoUserInfoVOMapper userInfoUserInfoVOMapper;

    @Autowired
    UserInfoRepository userInfoRepository;

    public UserInfoVO addNewUser(UserInfoVO userInfoVO) throws Exception {
        UserInfoVO userInfoVO1 = null;
        if (userInfoVO != null) {
            UserInfo userInfo = userInfoVOUserInfoMapper.map(userInfoVO);
            userInfo = userInfoRepository.save(userInfo);
            userInfoVO1 = userInfoUserInfoVOMapper.map(userInfo);
            return userInfoVO1;
        }
        return userInfoVO1;
    }

    public List<UserInfoVO> getAllUsers() throws Exception {

        List<UserInfoVO> userInfoVOS = new ArrayList<>();
        Iterable<UserInfo> userInfos = userInfoRepository.findAll();

        for (UserInfo userInfo : userInfos) {
            userInfoVOS.add(userInfoUserInfoVOMapper.map(userInfo));
        }
        return userInfoVOS;
    }

    public UserInfoVO getUserInfoById(String userInfoId) throws Exception {

        UserInfoVO userInfoVO = null;
        Optional<UserInfo> userInfo = userInfoRepository.findById((userInfoId));

        if (userInfo != null && userInfo.isPresent()) {
            userInfoVO = userInfoUserInfoVOMapper.map(userInfo.get());
        }
        return userInfoVO;
    }

    public UserInfoVO addLeagueToUser(String userInfoId, String leagueInfoId) throws Exception {
        UserInfoVO userInfoVO = null;
        Optional<UserInfo> optionalUserInfo = userInfoRepository.findById((userInfoId));
        if (!StringUtils.isEmpty(leagueInfoId)) {
            if (optionalUserInfo != null && optionalUserInfo.isPresent()) {
                UserInfo userInfo = optionalUserInfo.get();
                if (!CollectionUtils.isEmpty(userInfo.getUserLeagues())) {
                    userInfo.getUserLeagues().add(leagueInfoId);
                    userInfo = userInfoRepository.save(userInfo);
                    userInfoVO = userInfoUserInfoVOMapper.map(userInfo);
                } else {
                    List<String> userLeagues = new ArrayList<>();
                    userLeagues.add(leagueInfoId);
                    userInfo.setUserLeagues(userLeagues);
                    userInfo = userInfoRepository.save(userInfo);
                    userInfoVO = userInfoUserInfoVOMapper.map(userInfo);

                }
            }
        }
        return userInfoVO;
    }
}
