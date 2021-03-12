package com.iplauction.jcrud.controller;

import com.iplauction.jcrud.http.GenericServiceResponse;
import com.iplauction.jcrud.model.LeagueInfoVO;
import com.iplauction.jcrud.model.LeagueUserVO;
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
            @RequestBody LeagueInfoVO leagueInfoVO) {

        try {
            logger.info("addLeagueInfo started ==>");
            LeagueInfoVO leagueInfoVOResponse = leagueInfoService.addNewLeagueInfo(leagueInfoVO);
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
    public ResponseEntity<GenericServiceResponse<LeagueInfoVO>> getScanRequestById(
            @PathVariable(name = "leagueInfoId") String leagueInfoId) {
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

    @PostMapping({"/joinLeague/{leagueInfoId}"})
    public ResponseEntity<GenericServiceResponse<LeagueInfoVO>> joinLeague(
            @RequestBody LeagueUserVO leagueUserVO,@PathVariable(name = "leagueInfoId")  @Valid @NotNull String leagueInfoId) {

        try {
            logger.info("addLeagueInfo started ==>");
            LeagueInfoVO leagueInfoVOResponse = leagueInfoService.joinLeague(leagueUserVO,leagueInfoId);
            logger.info("addLeagueInfo completed <==");
            return new ResponseEntity<GenericServiceResponse<LeagueInfoVO>>(new GenericServiceResponse<LeagueInfoVO>(SUCCESS, "leagueInfo", leagueInfoVOResponse), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while addLeagueInfo", e);
            return new ResponseEntity<GenericServiceResponse<LeagueInfoVO>>(new GenericServiceResponse<LeagueInfoVO>(FAIL, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
