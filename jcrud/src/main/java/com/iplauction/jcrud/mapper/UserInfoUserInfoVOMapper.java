package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.UserInfo;
import com.iplauction.jcrud.model.UserInfoVO;
import org.springframework.stereotype.Component;

@Component
public class UserInfoUserInfoVOMapper implements Mapper<UserInfo, UserInfoVO> {
    @Override
    public UserInfoVO map(UserInfo source) throws Exception {
        UserInfoVO userInfoVO = new UserInfoVO();
        userInfoVO.setUserId(source.getUserId());
        userInfoVO.setUserName(source.getUserName());
        userInfoVO.setUserLeagues(source.getUserLeagues());
        userInfoVO.setUserRole(source.getUserRole());
        userInfoVO.setCreatedDateTime(source.getCreatedDateTime());
        userInfoVO.setLastModifiedDateTime(source.getLastModifiedDateTime());
        return userInfoVO;
    }
}
