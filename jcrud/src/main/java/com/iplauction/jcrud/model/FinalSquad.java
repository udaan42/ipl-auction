package com.iplauction.jcrud.model;

public class FinalSquad {
    private String playerId;
    private String playerName;
    private boolean isCaptain;
    private boolean isWicketKeeper;
    private Double points;
    private String teamName;

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

    public boolean getCaptain() {
        return isCaptain;
    }

    public void setCaptain(boolean captain) {
        isCaptain = captain;
    }

    public boolean isCaptain() {
        return isCaptain;
    }

    public boolean getWicketKeeper() {
        return isWicketKeeper;
    }

    public void setWicketKeeper(boolean wicketKeeper) {
        isWicketKeeper = wicketKeeper;
    }

    public Double getPoints() {
        return points;
    }

    public void setPoints(Double points) {
        this.points = points;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
