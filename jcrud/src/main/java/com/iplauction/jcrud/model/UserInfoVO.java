package com.iplauction.jcrud.model;

import java.util.Date;
import java.util.List;

public class UserInfoVO {

    private String userId;
    private String userName;
    private String pwd;
    private String userRole;
    private List<String> userLeagues;
    private Date createdDateTime;
    private Date lastModifiedDateTime;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public List<String> getUserLeagues() {
        return userLeagues;
    }

    public void setUserLeagues(List<String> userLeagues) {
        this.userLeagues = userLeagues;
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
}
