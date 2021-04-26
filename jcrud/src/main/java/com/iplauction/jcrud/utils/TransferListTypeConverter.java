package com.iplauction.jcrud.utils;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iplauction.jcrud.model.MatchesList;
import com.iplauction.jcrud.model.TransferRequests;

import java.io.IOException;
import java.util.List;

public class TransferListTypeConverter implements DynamoDBTypeConverter<String, List<TransferRequests>> {
    @Override
    public String convert(List<TransferRequests> object) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String objectsString = objectMapper.writeValueAsString(object);
            return objectsString;
        } catch (JsonProcessingException e) {
            //do something
        }
        return null;
    }

    @Override
    public List<TransferRequests> unconvert(String object) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<TransferRequests> objects = objectMapper.readValue(object, new TypeReference<List<TransferRequests>>(){});
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
