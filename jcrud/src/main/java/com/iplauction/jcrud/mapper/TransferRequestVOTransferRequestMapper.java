package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.*;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Component
public class TransferRequestVOTransferRequestMapper implements Mapper<TransferRequestsVO, TransferRequests> {

    @Override
    public TransferRequests map(TransferRequestsVO source) throws Exception {

        TransferRequests transferRequests = new TransferRequests();

        transferRequests.setTimeSubmitted(source.getTimeSubmitted());
        transferRequests.setTransferOutPlayerId(source.getTransferOutPlayerId());
        transferRequests.setUserId(source.getUserId());
        transferRequests.setBidAmount(source.getBidAmount());
        transferRequests.setDuplicate(source.getDuplicate());
        List<TransferInList> transferInList = new ArrayList<>();

        if(!CollectionUtils.isEmpty(source.getTransferInList())){

            for(TransferInListVO transferInListVO : source.getTransferInList()){

                TransferInList transferInList1 = new TransferInList();
                transferInList1.setPlayerId(transferInListVO.getPlayerId());
                transferInList1.setPriority(transferInListVO.getPriority());

                transferInList.add(transferInList1);
            }

            transferRequests.setTransferInList(transferInList);
        }

        return transferRequests;
    }
}
