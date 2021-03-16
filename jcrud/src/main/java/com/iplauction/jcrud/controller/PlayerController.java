package com.iplauction.jcrud.controller;

import com.iplauction.jcrud.http.GenericServiceResponse;
import com.iplauction.jcrud.model.LeagueInfoVO;
import com.iplauction.jcrud.model.PlayerInfoVO;
import com.iplauction.jcrud.model.UserInfoVO;
import com.iplauction.jcrud.service.PlayerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import static com.iplauction.jcrud.http.GenericServiceResponse.Status.FAIL;
import static com.iplauction.jcrud.http.GenericServiceResponse.Status.SUCCESS;

@Controller
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    PlayerService playerService;

    private static Logger logger = LoggerFactory.getLogger(PlayerController.class);

    @PostMapping()
    public ResponseEntity<GenericServiceResponse<PlayerInfoVO>> addNewPlayer(
            @RequestBody PlayerInfoVO playerInfoVO) {

        try {
            logger.info("addUserInfo started ==>");
            PlayerInfoVO playerInfoVO1 = playerService.addNewPlayer(playerInfoVO);
            logger.info("addUserInfo completed <==");
            return new ResponseEntity<GenericServiceResponse<PlayerInfoVO>>(new GenericServiceResponse<PlayerInfoVO>(SUCCESS, "playerInfo", playerInfoVO1), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while addUserInfo", e);
            return new ResponseEntity<GenericServiceResponse<PlayerInfoVO>>(new GenericServiceResponse<PlayerInfoVO>(FAIL, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping({"/all"})
    public ResponseEntity<GenericServiceResponse<List<PlayerInfoVO>>> getAllPlayers() {
        try {
            List<PlayerInfoVO> playerInfoVOS = playerService.getAllPlayers();
            if (!playerInfoVOS.isEmpty()) {
                return new ResponseEntity<GenericServiceResponse<List<PlayerInfoVO>>>(
                        new GenericServiceResponse<List<PlayerInfoVO>>(SUCCESS, "playerInfos", playerInfoVOS), HttpStatus.OK);
            }
            return new ResponseEntity<GenericServiceResponse<List<PlayerInfoVO>>>(new GenericServiceResponse<List<PlayerInfoVO>>(FAIL, "No Player Info Found"),
                    HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<GenericServiceResponse<List<PlayerInfoVO>>>(new GenericServiceResponse<List<PlayerInfoVO>>(FAIL, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
