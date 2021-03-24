package com.iplauction.jcrud.repository;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.iplauction.jcrud.model.PlayerInfo;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;

import java.util.List;

@EnableScan
public class PlayerInfoCustomRepositoryImpl implements PlayerInfoCustomRepository {

    static AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();
    static DynamoDBMapper mapper = new DynamoDBMapper(client);

    @Override
    public List<PlayerInfo> GetPlayersByBagNumber(String bagNumber) {
        return null;
    }
}
