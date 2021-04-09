package com.iplauction.jcrud.model;

import java.util.Date;
import java.util.List;

public class MatchStats {

    private Integer matchId;
    private String matchName;
    private Date matchDate;
    private List<PlayerMatchStat> playerMatchStatList;

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

    public List<PlayerMatchStat> getPlayerMatchStatList() {
        return playerMatchStatList;
    }

    public void setPlayerMatchStatList(List<PlayerMatchStat> playerMatchStatList) {
        this.playerMatchStatList = playerMatchStatList;
    }
}
