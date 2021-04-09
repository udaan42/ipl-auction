package com.iplauction.jcrud.model;

public class PlayerMatchStat {

    private String playerId;
    private String playerName;
    private BattingStats battingStats;
    private BowlingStats bowlingStats;
    private FieldingStats fieldingStats;
    private boolean isMOM;
    private Double totalMatchPoint;


    public String getPlayerId() {
        return playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }


    public BattingStats getBattingStats() {
        return battingStats;
    }

    public void setBattingStats(BattingStats battingStats) {
        this.battingStats = battingStats;
    }

    public BowlingStats getBowlingStats() {
        return bowlingStats;
    }

    public void setBowlingStats(BowlingStats bowlingStats) {
        this.bowlingStats = bowlingStats;
    }

    public FieldingStats getFieldingStats() {
        return fieldingStats;
    }

    public void setFieldingStats(FieldingStats fieldingStats) {
        this.fieldingStats = fieldingStats;
    }

    public boolean getMOM() {
        return isMOM;
    }

    public void setMOM(boolean isMOM) {
        this.isMOM = isMOM;
    }

    public Double getTotalMatchPoint() {
        return totalMatchPoint;
    }

    public void setTotalMatchPoint(Double totalMatchPoint) {
        this.totalMatchPoint = totalMatchPoint;
    }
}
