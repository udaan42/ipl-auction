package com.iplauction.jcrud.model;

import java.util.Date;
import java.util.List;

public class TransferRequestsVO {

    public String userId;
    public String transferOutPlayerId;
    public List<TransferInListVO> transferInList;
    public Date timeSubmitted;
    public Integer bidAmount;
    public Integer transferOutAmount;
    private boolean duplicate;


    public String getTransferOutPlayerId() {
        return transferOutPlayerId;
    }

    public void setTransferOutPlayerId(String transferOutPlayerId) {
        this.transferOutPlayerId = transferOutPlayerId;
    }

    public List<TransferInListVO> getTransferInList() {
        return transferInList;
    }

    public void setTransferInList(List<TransferInListVO> transferInList) {
        this.transferInList = transferInList;
    }

    public Date getTimeSubmitted() {
        return timeSubmitted;
    }

    public void setTimeSubmitted(Date timeSubmitted) {
        this.timeSubmitted = timeSubmitted;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(Integer bidAmount) {
        this.bidAmount = bidAmount;
    }

    public boolean getDuplicate() {
        return duplicate;
    }

    public void setDuplicate(boolean duplicate) {
        this.duplicate = duplicate;
    }

    public Integer getTransferOutAmount() {
        return transferOutAmount;
    }

    public void setTransferOutAmount(Integer transferOutAmount) {
        this.transferOutAmount = transferOutAmount;
    }
}
