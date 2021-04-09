package com.iplauction.jcrud.utils;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iplauction.jcrud.model.LeagueUser;
import com.iplauction.jcrud.model.MatchesList;

import java.io.IOException;
import java.util.List;

public class MatchListTypeConverter implements DynamoDBTypeConverter<String, List<MatchesList>> {
    @Override
    public String convert(List<MatchesList> objects) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String objectsString = objectMapper.writeValueAsString(objects);
            return objectsString;
        } catch (JsonProcessingException e) {
            //do something
        }
        return null;
    }

    @Override
    public List<MatchesList> unconvert(String objectsString) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<MatchesList> objects = objectMapper.readValue(objectsString, new TypeReference<List<MatchesList>>(){});
            return objects;
        } catch (JsonParseException e) {
            //do something
        } catch (JsonMappingException e) {
            //do something
        } catch (IOException e) {
            //do something
        }
        return null;
    }
}
