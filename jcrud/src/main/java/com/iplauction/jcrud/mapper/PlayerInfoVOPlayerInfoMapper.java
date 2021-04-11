package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.PlayerInfo;
import com.iplauction.jcrud.model.PlayerInfoVO;
import org.springframework.stereotype.Component;

@Component
public class PlayerInfoVOPlayerInfoMapper implements Mapper<PlayerInfoVO, PlayerInfo> {
    @Override
    public PlayerInfo map(PlayerInfoVO source) throws Exception {

        PlayerInfo playerInfo = new PlayerInfo();
        playerInfo.setPlayerId(source.getPlayerId());
        playerInfo.setAverage(source.getBattingAverage());
        playerInfo.setBallsBowled(source.getBallsBowled());
        playerInfo.setBallsFaced(source.getBallsFaced());
        playerInfo.setBasePrice(source.getBasePrice());
        playerInfo.setBattingInningsPlayed(source.getBattingInningsPlayed());
        playerInfo.setBattingStrikeRate(source.getBattingStrikeRate());
        playerInfo.setBestBowlingFigures(source.getBestBowlingFigures());
        playerInfo.setBowlingEconomy(source.getBowlingEconomy());
        playerInfo.setBowlingInningsPlayed(source.getBowlingInningsPlayed());
        playerInfo.setCreatedDateTime(source.getCreatedDateTime());
        playerInfo.setHighestScore(source.getHighestScore());
        playerInfo.setMatchesPlayed(source.getMatchesPlayed());
        playerInfo.setLastModifiedDateTime(source.getLastModifiedDateTime());
        playerInfo.setNoOfCatches(source.getNoOfCatches());
        playerInfo.setNoOfFifties(source.getNoOfFifties());
        playerInfo.setNoOfFiveWickets(source.getNoOfFiveWickets());
        playerInfo.setNoOfFours(source.getNoOfFours());
        playerInfo.setNoOfHundreds(source.getNoOfHundreds());
        playerInfo.setNoOfFourWickets(source.getNoOfFourWickets());
        playerInfo.setPlayerName(source.getPlayerName());
        playerInfo.setPlayerRole(source.getPlayerRole());
        playerInfo.setRunsConceded(source.getRunsConceded());
        playerInfo.setStatType(source.getStatType());
        playerInfo.setNotOutCount(source.getNotOutCount());
        playerInfo.setRunsScored(source.getRunsScored());
        playerInfo.setNoOfSixes(source.getNoOfSixes());
        playerInfo.setNoOfStumpings(source.getNoOfStumpings());
        playerInfo.setNoOfWickets(source.getNoOfWickets());
        playerInfo.setBowlingStrikeRate(source.getBowlingStrikeRate());
        playerInfo.setTeamName(source.getTeamName());
        playerInfo.setBowlingAverage(source.getBowlingAverage());
        playerInfo.setPlayerRace(source.getPlayerRace());
        playerInfo.setSoldPrice(source.getSoldPrice());
        playerInfo.setBagNumber(source.getBagNumber().toString());
        playerInfo.setPlaying(source.getPlaying());
        playerInfo.setCaptain(source.getCaptain());
        playerInfo.setWicketKeeper(source.getWicketKeeper());
        playerInfo.setBagCode(source.getBagCode());
        playerInfo.setPlayerImageUrl(source.getPlayerImageUrl());
        playerInfo.setMatchesList(source.getMatchesList());
        playerInfo.setLatestMatchPoint(source.getLatestMatchPoint());
        playerInfo.setLatestStumpingPoint(source.getLatestStumpingPoint());
        playerInfo.setPlayedToday(source.getPlayedToday());
        return playerInfo;
    }
}
