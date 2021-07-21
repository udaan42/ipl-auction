package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.TournamentInfo;
import com.iplauction.jcrud.model.TournamentInfoVO;
import org.springframework.stereotype.Component;

@Component
public class TournamentTournamentVOMapper implements Mapper<TournamentInfo, TournamentInfoVO> {
    @Override
    public TournamentInfoVO map(TournamentInfo source) throws Exception {
        TournamentInfoVO tournamentInfoVO = new TournamentInfoVO();
        tournamentInfoVO.setTournamentId(source.getTournamentId());
        tournamentInfoVO.setTournamentName(source.getTournamentName());
        return tournamentInfoVO;
    }
}
