package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.UserInfo;
import com.iplauction.jcrud.model.UserInfoVO;
import org.springframework.stereotype.Component;

@Component
public class UserInfoVOUserInfoMapper implements Mapper<UserInfoVO,UserInfo> {
    @Override
    public UserInfo map(UserInfoVO source) throws Exception {
        UserInfo userInfo = new UserInfo();
        userInfo.setUserName(source.getUserName());
        userInfo.setPwd(source.getPwd());
        userInfo.setUserLeagues(source.getUserLeagues());
        userInfo.setUserRole(source.getUserRole());
        return userInfo;
    }
}
