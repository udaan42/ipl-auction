package com.iplauction.jcrud.repository;

import com.iplauction.jcrud.model.PlayerInfo;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;

import java.util.List;

@EnableScan
public interface PlayerInfoCustomRepository {

    public List<PlayerInfo> GetPlayersByBagNumber(String bagNumber);
}
