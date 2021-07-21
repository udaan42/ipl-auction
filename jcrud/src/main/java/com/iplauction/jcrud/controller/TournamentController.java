package com.iplauction.jcrud.controller;


import com.iplauction.jcrud.http.GenericServiceResponse;
import com.iplauction.jcrud.mapper.TorunamentVOTournamentMapper;
import com.iplauction.jcrud.model.PlayerInfoVO;
import com.iplauction.jcrud.model.TournamentInfo;
import com.iplauction.jcrud.model.TournamentInfoVO;
import com.iplauction.jcrud.repository.TournamentInfoRepository;
import com.iplauction.jcrud.service.TournamentInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.iplauction.jcrud.http.GenericServiceResponse.Status.SUCCESS;

@Controller
@RequestMapping("/tournament")
public class TournamentController {


    @Autowired
    TournamentInfoService tournamentInfoService;

    @PostMapping()
    public ResponseEntity<String> addNewTournamnt(@RequestBody TournamentInfoVO tournamentInfoVO) throws Exception {


            tournamentInfoService.addNewTournament(tournamentInfoVO);
        return new ResponseEntity<String>("Success", HttpStatus.OK);

        }


}
