package com.iplauction.jcrud.controller;

import com.iplauction.jcrud.http.GenericServiceResponse;
import com.iplauction.jcrud.model.LeagueInfoVO;
import com.iplauction.jcrud.model.LeagueUserVO;
import com.iplauction.jcrud.model.UserInfoVO;
import com.iplauction.jcrud.service.UserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

import static com.iplauction.jcrud.http.GenericServiceResponse.Status.FAIL;
import static com.iplauction.jcrud.http.GenericServiceResponse.Status.SUCCESS;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserInfoService userInfoService;

    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping()
    public ResponseEntity<GenericServiceResponse<UserInfoVO>> addUserInfo(
            @RequestBody UserInfoVO userInfoVO) {

        try {
            logger.info("addUserInfo started ==>");
            UserInfoVO userInfoVOResponse = userInfoService.addNewUser(userInfoVO);
            logger.info("addUserInfo completed <==");
            return new ResponseEntity<GenericServiceResponse<UserInfoVO>>(new GenericServiceResponse<UserInfoVO>(SUCCESS, "userInfo", userInfoVOResponse), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while addUserInfo", e);
            return new ResponseEntity<GenericServiceResponse<UserInfoVO>>(new GenericServiceResponse<UserInfoVO>(FAIL, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping({"/all"})
    public ResponseEntity<GenericServiceResponse<List<UserInfoVO>>> getAllUserInfo() {
        try {
            List<UserInfoVO> userInfoVOS = userInfoService.getAllUsers();
            if (!userInfoVOS.isEmpty()) {
                return new ResponseEntity<GenericServiceResponse<List<UserInfoVO>>>(
                        new GenericServiceResponse<List<UserInfoVO>>(SUCCESS, "userInfos", userInfoVOS), HttpStatus.OK);
            }
            return new ResponseEntity<GenericServiceResponse<List<UserInfoVO>>>(new GenericServiceResponse<List<UserInfoVO>>(FAIL, "No User Info Found"),
                    HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<GenericServiceResponse<List<UserInfoVO>>>(new GenericServiceResponse<List<UserInfoVO>>(FAIL, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping({"/{userInfoId}"})
    public ResponseEntity<GenericServiceResponse<UserInfoVO>> getUserInfoById(
            @PathVariable(name = "userInfoId")   @Valid @NotNull String userInfoId) {
        try {
            logger.info("getUserInfoById {userInfoId} ==>", userInfoId);

            UserInfoVO userInfoVO = userInfoService.getUserInfoById(userInfoId);

            logger.info("getUserInfoById {leagueInfoId} is Complete <==", userInfoId);
            return new ResponseEntity<GenericServiceResponse<UserInfoVO>>(new GenericServiceResponse<UserInfoVO>(SUCCESS, "userInfo", userInfoVO), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while getting User Details", e);
            return new ResponseEntity<GenericServiceResponse<UserInfoVO>>(new GenericServiceResponse<UserInfoVO>(FAIL, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping({"/addLeague/{userInfoId}/{leagueInfoId}"})
    public ResponseEntity<GenericServiceResponse<UserInfoVO>> addLeagueToUser(
            @PathVariable(name = "userInfoId")   @Valid @NotNull String userInfoId,
            @PathVariable(name = "leagueInfoId")   @Valid @NotNull String leagueInfoId) {
        try {
            logger.info("getUserInfoById {userInfoId} ==>", userInfoId);

            UserInfoVO userInfoVO = userInfoService.addLeagueToUser(userInfoId,leagueInfoId);

            logger.info("getUserInfoById {leagueInfoId} is Complete <==", userInfoId);
            return new ResponseEntity<GenericServiceResponse<UserInfoVO>>(new GenericServiceResponse<UserInfoVO>(SUCCESS, "userInfo", userInfoVO), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while getting User Details", e);
            return new ResponseEntity<GenericServiceResponse<UserInfoVO>>(new GenericServiceResponse<UserInfoVO>(FAIL, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
