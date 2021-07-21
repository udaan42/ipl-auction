package com.iplauction.jcrud.service;

import com.iplauction.jcrud.mapper.TorunamentVOTournamentMapper;
import com.iplauction.jcrud.model.TournamentInfo;
import com.iplauction.jcrud.model.TournamentInfoVO;
import com.iplauction.jcrud.repository.TournamentInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TournamentInfoService {

    @Autowired
    TournamentInfoRepository tournamentInfoRepository;

    @Autowired
    TorunamentVOTournamentMapper torunamentVOTournamentMapper;

    public void addNewTournament(TournamentInfoVO tournamentInfoVO) throws Exception {

        TournamentInfo tournamentInfo = torunamentVOTournamentMapper.map(tournamentInfoVO);
        tournamentInfoRepository.save(tournamentInfo);

    }
}
