package com.iplauction.jcrud.http;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import java.util.HashMap;
import java.util.Map;

@JsonInclude(Include.NON_DEFAULT)
public class GenericServiceResponse<T> {
  public enum Status {
    SUCCESS, FAIL
  };

  private String status;

  private Integer errorCode;

  private String errorMessage;

  private Map<String, T> payload;

  public GenericServiceResponse() {

  }

  public GenericServiceResponse(Status status) {
    super();
    this.status = status.toString();
  }

  public GenericServiceResponse(Status status, String errorMessage) {
    super();
    this.status = status.toString();
    this.errorMessage = errorMessage;
  }

  public GenericServiceResponse(Status status, Integer errorCode, String errorMessage) {
    super();
    this.status = status.toString();
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
  
  public GenericServiceResponse(Status status, String responseKey, T response) {
    super();
    this.status = status.toString();
    Map<String, T> map = new HashMap<>();
    map.put(responseKey,response);
    this.payload = map;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getErrorMessage() {
    return errorMessage;
  }

  public void setErrorMessage(String errorMessage) {
    this.errorMessage = errorMessage;
  }

  public Integer getErrorCode() {
    return errorCode;
  }

  public void setErrorCode(Integer errorCode) {
    this.errorCode = errorCode;
  }

  public Map<String, T> getPayload() {
    return payload;
  }

  public void setPayload(Map<String, T> payload) {
    this.payload = payload;
  }
}
