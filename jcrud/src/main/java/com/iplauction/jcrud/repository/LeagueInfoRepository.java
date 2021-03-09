package com.iplauction.jcrud.repository;

import com.iplauction.jcrud.model.LeagueInfo;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface LeagueInfoRepository extends CrudRepository<LeagueInfo,String>,LeagueInfoCustomRespository {
}
