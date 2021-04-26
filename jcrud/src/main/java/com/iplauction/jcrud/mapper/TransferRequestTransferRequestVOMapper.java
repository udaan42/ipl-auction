package com.iplauction.jcrud.mapper;

import com.iplauction.jcrud.common.Mapper;
import com.iplauction.jcrud.model.TransferInList;
import com.iplauction.jcrud.model.TransferInListVO;
import com.iplauction.jcrud.model.TransferRequests;
import com.iplauction.jcrud.model.TransferRequestsVO;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Component
public class TransferRequestTransferRequestVOMapper implements Mapper<TransferRequests,TransferRequestsVO> {
    @Override
    public TransferRequestsVO map(TransferRequests source) throws Exception {
        TransferRequestsVO transferRequestsVO = new TransferRequestsVO();

        transferRequestsVO.setTimeSubmitted(source.getTimeSubmitted());
        transferRequestsVO.setTransferOutPlayerId(source.getTransferOutPlayerId());
        transferRequestsVO.setUserId(source.getUserId());
        transferRequestsVO.setBidAmount(source.getBidAmount());
        transferRequestsVO.setDuplicate(source.getDuplicate());

        List<TransferInListVO> transferInListVO = new ArrayList<>();

        if(!CollectionUtils.isEmpty(source.getTransferInList())){

            for(TransferInList transferInList : source.getTransferInList()){

                TransferInListVO transferInList1 = new TransferInListVO();
                transferInList1.setPlayerId(transferInList.getPlayerId());
                transferInList1.setPriority(transferInList.getPriority());

                transferInListVO.add(transferInList1);
            }

            transferRequestsVO.setTransferInList(transferInListVO);
        }

        return transferRequestsVO;
    }
}
