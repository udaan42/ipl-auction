package com.iplauction.jcrud.controller;

import com.iplauction.jcrud.http.GenericServiceResponse;
import com.iplauction.jcrud.model.JwtRequest;
import com.iplauction.jcrud.model.JwtResponse;
import com.iplauction.jcrud.model.PlayerInfoVO;
import com.iplauction.jcrud.model.UserInfoVO;
import com.iplauction.jcrud.service.UserInfoService;
import com.iplauction.jcrud.service.UserService;
import com.iplauction.jcrud.utility.JWTUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static com.iplauction.jcrud.http.GenericServiceResponse.Status.FAIL;
import static com.iplauction.jcrud.http.GenericServiceResponse.Status.SUCCESS;

@RestController
public class LoginController {

    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;


    @Autowired
    private UserInfoService userInfoService;


    @Autowired
    PasswordEncoder passwordEncoder;


    @PostMapping("/authenticate")
    public ResponseEntity<GenericServiceResponse<String>> authenticate(@RequestBody JwtRequest jwtRequest) throws Exception{

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (Exception e) {
            return new ResponseEntity<GenericServiceResponse<String>>(new GenericServiceResponse<String>(FAIL, "INVALID_CREDENTIALS"), HttpStatus.FORBIDDEN);
        }

        final UserDetails userDetails
                = userService.loadUserByUsername(jwtRequest.getUsername());

        final String userId = userInfoService.getUserInfoByUserName(userDetails.getUsername()).getUserId();

        final String token =
                jwtUtility.generateToken(userDetails,userId);

        return new ResponseEntity<GenericServiceResponse<String>>(new GenericServiceResponse<String>(SUCCESS, "token", token), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<GenericServiceResponse<UserInfoVO>> addUserInfo(
            @RequestBody UserInfoVO userInfoVO) {

        try {

            if(userInfoService.getUserInfoByUserName(userInfoVO.getUserName()) == null){
                userInfoVO.setPwd(passwordEncoder.encode(userInfoVO.getPwd()));
                UserInfoVO userInfoVOResponse = userInfoService.addNewUser(userInfoVO);
                return new ResponseEntity<GenericServiceResponse<UserInfoVO>>(new GenericServiceResponse<UserInfoVO>(SUCCESS, "userInfo", userInfoVOResponse), HttpStatus.OK);
            }

            return new ResponseEntity<GenericServiceResponse<UserInfoVO>>(new GenericServiceResponse<UserInfoVO>(FAIL, "Username already exists"), HttpStatus.BAD_REQUEST);

        } catch (Exception e) {

            return new ResponseEntity<GenericServiceResponse<UserInfoVO>>(new GenericServiceResponse<UserInfoVO>(FAIL, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
