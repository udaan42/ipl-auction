package com.iplauction.jcrud.model;

import java.util.Date;
import java.util.List;

public class LeagueInfoVO {
    private String leagueId;
    private String leagueName;
    private List<LeagueUserVO> leagueUsers;
    private Date createdDateTime;
    private Date lastModifiedDateTime;
    private Boolean isActive = true;
    private String leagueStatus;

    public String getLeagueId() {
        return leagueId;
    }

    public void setLeagueId(String leagueId) {
        this.leagueId = leagueId;
    }

    public String getLeagueName() {
        return leagueName;
    }

    public void setLeagueName(String leagueName) {
        this.leagueName = leagueName;
    }

    public List<LeagueUserVO> getLeagueUsers() {
        return leagueUsers;
    }

    public void setLeagueUsers(List<LeagueUserVO> leagueUsers) {
        this.leagueUsers = leagueUsers;
    }

    public Date getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(Date createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public Date getLastModifiedDateTime() {
        return lastModifiedDateTime;
    }

    public void setLastModifiedDateTime(Date lastModifiedDateTime) {
        this.lastModifiedDateTime = lastModifiedDateTime;
    }

    public Boolean getIsActive() {
        return isActive;
    }
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getLeagueStatus() {
        return leagueStatus;
    }

    public void setLeagueStatus(String leagueStatus) {
        this.leagueStatus = leagueStatus;
    }
}
