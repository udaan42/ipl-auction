package com.iplauction.jcrud.repository;

import com.iplauction.jcrud.model.LeagueInfo;
import com.iplauction.jcrud.model.UserInfo;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface UserInfoRepository extends CrudRepository<UserInfo,String>,UserInfoCustomRepository  {
}
