package com.iplauction.jcrud.model;

import java.util.Date;
import java.util.List;

public class MatchesList {

    private Integer matchId;
    private String matchName;
    private Date matchDate;
    private PlayerMatchStat playerMatchStat;
    private boolean isLatest;


    public Integer getMatchId() {
        return matchId;
    }

    public void setMatchId(Integer matchId) {
        this.matchId = matchId;
    }

    public String getMatchName() {
        return matchName;
    }

    public void setMatchName(String matchName) {
        this.matchName = matchName;
    }

    public Date getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(Date matchDate) {
        this.matchDate = matchDate;
    }

    public PlayerMatchStat getPlayerMatchStat() {
        return playerMatchStat;
    }

    public void setPlayerMatchStat(PlayerMatchStat playerMatchStat) {
        this.playerMatchStat = playerMatchStat;
    }

    public boolean getLatest() {
        return isLatest;
    }

    public void setLatest(boolean latest) {
        isLatest = latest;
    }
}
