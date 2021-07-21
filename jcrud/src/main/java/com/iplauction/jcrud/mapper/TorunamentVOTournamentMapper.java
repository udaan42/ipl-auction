package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.TournamentInfo;
import com.iplauction.jcrud.model.TournamentInfoVO;
import org.springframework.stereotype.Component;

@Component
public class TorunamentVOTournamentMapper implements Mapper<TournamentInfoVO,TournamentInfo> {
    @Override
    public TournamentInfo map(TournamentInfoVO source) throws Exception {
        TournamentInfo tournamentInfo = new TournamentInfo();
        tournamentInfo.setTournamentId(source.getTournamentId());
        tournamentInfo.setTournamentName(source.getTournamentName());
        return tournamentInfo;
    }
}
