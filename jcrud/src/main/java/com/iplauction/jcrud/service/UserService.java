package com.iplauction.jcrud.service;

import com.iplauction.jcrud.model.UserInfo;
import com.iplauction.jcrud.model.UserInfoVO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserInfoService userInfoService;


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        //Logic to get the user form the Database
        UserInfo userInfo = null;
        try {
            if(!StringUtils.isEmpty(userName)) {
                userInfo = userInfoService.getUserInfoByUserName(userName);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new User(userInfo.getUserName(),userInfo.getPwd(),new ArrayList<>());
    }
}
