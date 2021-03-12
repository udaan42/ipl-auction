package com.iplauction.jcrud.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;

import java.util.Date;
import java.util.List;

public class LeagueInfoVO {
    private String leagueId;
    private String leagueName;
    private List<LeagueUserVO> leagueUser;
    private Date createdDateTime;
    private Date lastModifiedDateTime;
    private Boolean isActive = true;

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

    public List<LeagueUserVO> getLeagueUser() {
        return leagueUser;
    }

    public void setLeagueUser(List<LeagueUserVO> leagueUser) {
        this.leagueUser = leagueUser;
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
}
