package com.iplauction.jcrud.controller;

import com.iplauction.jcrud.http.GenericServiceResponse;
import com.iplauction.jcrud.model.LeagueInfoVO;
import com.iplauction.jcrud.model.LeagueUserVO;
import com.iplauction.jcrud.model.PlayerInfoVO;
import com.iplauction.jcrud.service.LeagueInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

import static com.iplauction.jcrud.http.GenericServiceResponse.Status.FAIL;
import static com.iplauction.jcrud.http.GenericServiceResponse.Status.SUCCESS;

@Controller
@RequestMapping("/league")
public class LeagueController {

    @Autowired
    LeagueInfoService leagueInfoService;

    private static Logger logger = LoggerFactory.getLogger(LeagueController.class);

    @PostMapping()
    public ResponseEntity<GenericServiceResponse<LeagueInfoVO>> addLeagueInfo(
            @RequestHeader(name = "X-UserId") @Pattern(regexp="^[a-zA-Z0-9@./#&+-]+$", message = "User-Id cannot be empty and should be Alpha-Numeric") final String userId,
            @RequestBody LeagueInfoVO leagueInfoVO) {

        try {
            logger.info("addLeagueInfo started ==>");
            LeagueInfoVO leagueInfoVOResponse = leagueInfoService.addNewLeagueInfo(leagueInfoVO,userId);
            logger.info("addLeagueInfo completed <==");
            return new ResponseEntity<GenericServiceResponse<LeagueInfoVO>>(new GenericServiceResponse<LeagueInfoVO>(SUCCESS, "leagueInfo", leagueInfoVOResponse), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while addLeagueInfo", e);
            return new ResponseEntity<GenericServiceResponse<LeagueInfoVO>>(new GenericServiceResponse<LeagueInfoVO>(FAIL, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping({"/all"})
    public ResponseEntity<GenericServiceResponse<List<LeagueInfoVO>>> getAllLeagueInfo() {
        try {
            List<LeagueInfoVO> leagueInfoVOS = leagueInfoService.getAllLeagueDetails();
            if (!leagueInfoVOS.isEmpty()) {
                return new ResponseEntity<GenericServiceResponse<List<LeagueInfoVO>>>(
                        new GenericServiceResponse<List<LeagueInfoVO>>(SUCCESS, "leagueInfos", leagueInfoVOS), HttpStatus.OK);
            }
            return new ResponseEntity<GenericServiceResponse<List<LeagueInfoVO>>>(new GenericServiceResponse<List<LeagueInfoVO>>(FAIL, "No League Info Found"),
                    HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<GenericServiceResponse<List<LeagueInfoVO>>>(new GenericServiceResponse<List<LeagueInfoVO>>(FAIL, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping({"/{leagueInfoId}"})
    public ResponseEntity<GenericServiceResponse<LeagueInfoVO>> getLeagueInfoById(
            @PathVariable(name = "leagueInfoId")   @Valid @NotNull String leagueInfoId) {
        try {
            logger.info("getLeagueInfoById {leagueInfoId} ==>", leagueInfoId);

            LeagueInfoVO leagueInfoVO = leagueInfoService.getLeagueInfoById(leagueInfoId);

            logger.info("getLeagueInfoById {leagueInfoId} is Complete <==", leagueInfoId);
            return new ResponseEntity<GenericServiceResponse<LeagueInfoVO>>(new GenericServiceResponse<LeagueInfoVO>(SUCCESS, "leagueInfo", leagueInfoVO), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while getting scan requests", e);
            return new ResponseEntity<GenericServiceResponse<LeagueInfoVO>>(new GenericServiceResponse<LeagueInfoVO>(FAIL, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping({"/joinLeague"})
    public ResponseEntity<GenericServiceResponse<LeagueInfoVO>> joinLeague(
            @RequestHeader(name = "X-UserId") @Pattern(regexp="^[a-zA-Z0-9@./#&+-]+$", message = "User-Id cannot be empty and should be Alpha-Numeric") final String userId,
            @RequestHeader(name = "X-LeagueId") @Pattern(regexp="^[a-zA-Z0-9@./#&+-]+$", message = "League-Id cannot be empty and should be Alpha-Numeric") final String leagueId,
            @RequestBody LeagueUserVO leagueUserVO) {

        try {
            logger.info("addLeagueInfo started ==>");
            LeagueInfoVO leagueInfoVOResponse = leagueInfoService.joinLeague(leagueUserVO,leagueId,userId);
            logger.info("addLeagueInfo completed <==");
            return new ResponseEntity<GenericServiceResponse<LeagueInfoVO>>(new GenericServiceResponse<LeagueInfoVO>(SUCCESS, "leagueInfo", leagueInfoVOResponse), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while addLeagueInfo", e);
            return new ResponseEntity<GenericServiceResponse<LeagueInfoVO>>(new GenericServiceResponse<LeagueInfoVO>(FAIL, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping({"/getUserLeagues"})
    public ResponseEntity<GenericServiceResponse<List<LeagueInfoVO>>> getLeagueInfoByUserId(
            @RequestHeader(name = "X-UserId") @Pattern(regexp="^[a-zA-Z0-9@./#&+-]+$", message = "User-Id cannot be empty and should be Alpha-Numeric") final String userId) {
        try {
            logger.info("getLeagueInfoByUserId {leagueInfoId} ==>", userId);

            List<LeagueInfoVO> leagueInfoVOS = leagueInfoService.getLeagueInfoByUserId(userId);

            logger.info("getLeagueInfoByUserId {leagueInfoId} is Complete <==", userId);
            return new ResponseEntity<GenericServiceResponse< List<LeagueInfoVO> >>(new GenericServiceResponse< List<LeagueInfoVO> >(SUCCESS, "leagueInfos", leagueInfoVOS), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while getting scan requests", e);
            return new ResponseEntity<GenericServiceResponse< List<LeagueInfoVO> >>(new GenericServiceResponse< List<LeagueInfoVO> >(FAIL, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping({"/sellPlayerToUser/{playerId}/{soldPrice}"})
    public ResponseEntity<GenericServiceResponse<LeagueInfoVO>> sellPlayerToUser(
            @RequestHeader(name = "X-UserId") @Pattern(regexp="^[a-zA-Z0-9@./#&+-]+$", message = "User-Id cannot be empty and should be Alpha-Numeric") final String userId,
            @RequestHeader(name = "X-LeagueId") @Pattern(regexp="^[a-zA-Z0-9@./#&+-]+$", message = "League-Id cannot be empty and should be Alpha-Numeric") final String leagueId,
            @PathVariable(name = "playerId")   @Valid @NotNull String playerId,
            @PathVariable(name = "soldPrice")   @Valid @NotNull Long soldPrice) {
        try {
            logger.info("getLeagueInfoByUserId {leagueInfoId} ==>", userId);

            LeagueInfoVO leagueInfoVOS = leagueInfoService.sellPlayerToUser(leagueId,userId,playerId,soldPrice);

            logger.info("getLeagueInfoByUserId {leagueInfoId} is Complete <==", userId);
            return new ResponseEntity<GenericServiceResponse< LeagueInfoVO>>(new GenericServiceResponse< LeagueInfoVO >(SUCCESS, "leagueInfo", leagueInfoVOS), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while getting scan requests", e);
            return new ResponseEntity<GenericServiceResponse< LeagueInfoVO >>(new GenericServiceResponse<LeagueInfoVO>(FAIL, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping({"/getTeamSquad"})
    public ResponseEntity<GenericServiceResponse< List<PlayerInfoVO>>> getTeamSquad(
            @RequestHeader(name = "X-UserId") @Pattern(regexp="^[a-zA-Z0-9@./#&+-]+$", message = "User-Id cannot be empty and should be Alpha-Numeric") final String userId,
            @RequestHeader(name = "X-LeagueId") @Pattern(regexp="^[a-zA-Z0-9@./#&+-]+$", message = "League-Id cannot be empty and should be Alpha-Numeric") final String leagueId) {
        try {
            logger.info("getLeagueInfoByUserId {leagueInfoId} ==>", userId);

            List<PlayerInfoVO> playerInfoVOS = leagueInfoService.getTeamSquad(leagueId,userId);

            logger.info("getLeagueInfoByUserId {leagueInfoId} is Complete <==", userId);
            return new ResponseEntity<GenericServiceResponse<  List<PlayerInfoVO>>>(new GenericServiceResponse<  List<PlayerInfoVO> >(SUCCESS, "squadInfo", playerInfoVOS), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while getting scan requests", e);
            return new ResponseEntity<GenericServiceResponse<  List<PlayerInfoVO> >>(new GenericServiceResponse< List<PlayerInfoVO>>(FAIL, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping({"/updateTeamSquad"})
    public ResponseEntity<GenericServiceResponse< List<PlayerInfoVO>>> updateTeamSquad(
            @RequestHeader(name = "X-UserId") @Pattern(regexp="^[a-zA-Z0-9@./#&+-]+$", message = "User-Id cannot be empty and should be Alpha-Numeric") final String userId,
            @RequestHeader(name = "X-LeagueId") @Pattern(regexp="^[a-zA-Z0-9@./#&+-]+$", message = "League-Id cannot be empty and should be Alpha-Numeric") final String leagueId,
            @RequestBody List<PlayerInfoVO> playerInfoVOS) {
        try {
            logger.info("updateTeamSquad {leagueInfoId} ==>", userId);

            List<PlayerInfoVO> playerInfoVOS1 = leagueInfoService.updateTeamSquad(leagueId,userId,playerInfoVOS);

            logger.info("updateTeamSquad {leagueInfoId} is Complete <==", userId);
            return new ResponseEntity<GenericServiceResponse<  List<PlayerInfoVO>>>(new GenericServiceResponse<  List<PlayerInfoVO> >(SUCCESS, "squadInfo", playerInfoVOS1), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while getting scan requests", e);
            return new ResponseEntity<GenericServiceResponse<  List<PlayerInfoVO> >>(new GenericServiceResponse< List<PlayerInfoVO>>(FAIL, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
