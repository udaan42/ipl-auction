package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.PlayerInfo;
import com.iplauction.jcrud.model.PlayerInfoVO;
import org.springframework.stereotype.Component;

@Component
public class PlayerInfoPlayerInfoVOMapper implements Mapper<PlayerInfo,PlayerInfoVO> {
    @Override
    public PlayerInfoVO map(PlayerInfo source) throws Exception {
        PlayerInfoVO playerInfoVO = new PlayerInfoVO();
        playerInfoVO.setPlayerId(source.getPlayerId());
        playerInfoVO.setBattingAverage(source.getAverage());
        playerInfoVO.setBallsBowled(source.getBallsBowled());
        playerInfoVO.setBallsFaced(source.getBallsFaced());
        playerInfoVO.setBasePrice(source.getBasePrice());
        playerInfoVO.setBattingInningsPlayed(source.getBattingInningsPlayed());
        playerInfoVO.setBattingStrikeRate(source.getBattingStrikeRate());
        playerInfoVO.setBestBowlingFigures(source.getBestBowlingFigures());
        playerInfoVO.setBowlingEconomy(source.getBowlingEconomy());
        playerInfoVO.setBowlingInningsPlayed(source.getBowlingInningsPlayed());
        playerInfoVO.setCreatedDateTime(source.getCreatedDateTime());
        playerInfoVO.setHighestScore(source.getHighestScore());
        playerInfoVO.setMatchesPlayed(source.getMatchesPlayed());
        playerInfoVO.setLastModifiedDateTime(source.getLastModifiedDateTime());
        playerInfoVO.setNoOfCatches(source.getNoOfCatches());
        playerInfoVO.setNoOfFifties(source.getNoOfFifties());
        playerInfoVO.setNoOfFiveWickets(source.getNoOfFiveWickets());
        playerInfoVO.setNoOfFours(source.getNoOfFours());
        playerInfoVO.setNoOfHundreds(source.getNoOfHundreds());
        playerInfoVO.setNoOfFourWickets(source.getNoOfFourWickets());
        playerInfoVO.setPlayerName(source.getPlayerName());
        playerInfoVO.setPlayerRole(source.getPlayerRole());
        playerInfoVO.setRunsConceded(source.getRunsConceded());
        playerInfoVO.setStatType(source.getStatType());
        playerInfoVO.setNotOutCount(source.getNotOutCount());
        playerInfoVO.setRunsScored(source.getRunsScored());
        playerInfoVO.setNoOfSixes(source.getNoOfSixes());
        playerInfoVO.setNoOfStumpings(source.getNoOfStumpings());
        playerInfoVO.setNoOfWickets(source.getNoOfWickets());
        playerInfoVO.setBowlingStrikeRate(source.getBowlingStrikeRate());
        playerInfoVO.setTeamName(source.getTeamName());
        playerInfoVO.setBowlingAverage(source.getBowlingAverage());
        playerInfoVO.setPlayerRace(source.getPlayerRace());
        playerInfoVO.setSoldPrice(source.getSoldPrice());
        playerInfoVO.setBagNumber(Integer.parseInt(source.getBagNumber()));
        playerInfoVO.setPlaying(source.getPlaying());
        playerInfoVO.setCaptain(source.getCaptain());
        playerInfoVO.setWicketKeeper(source.getWicketKeeper());
        playerInfoVO.setBagCode(source.getBagCode());
        playerInfoVO.setPlayerImageUrl(source.getPlayerImageUrl());
        return playerInfoVO;
    }
}
