package com.iplauction.jcrud.model;

import org.joda.time.DateTime;

import java.util.Date;
import java.util.List;

public class TransferRequests implements Comparable<TransferRequests> {


    public String transferOutPlayerId;
    public List<TransferInList> transferInList;
    public Integer bidAmount;
    public Date timeSubmitted;
    public String userId;
    private boolean duplicate;

    public String getTransferOutPlayerId() {
        return transferOutPlayerId;
    }

    public void setTransferOutPlayerId(String transferOutPlayerId) {
        this.transferOutPlayerId = transferOutPlayerId;
    }

    public List<TransferInList> getTransferInList() {
        return transferInList;
    }

    public void setTransferInList(List<TransferInList> transferInList) {
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

    @Override
    public int compareTo(TransferRequests transferRequests) {
        return transferRequests.getBidAmount().compareTo(getBidAmount());
    }
}
