package com.iplauction.jcrud.repository;

import com.iplauction.jcrud.model.PlayerInfo;
import com.iplauction.jcrud.model.TournamentInfo;
import jdk.jfr.Enabled;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface TournamentInfoRepository extends CrudRepository<TournamentInfo,String>,PlayerInfoCustomRepository {
}
