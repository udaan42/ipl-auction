package com.iplauction.jcrud.common;

public interface Mapper<SRC, DEST> {

    DEST map(SRC source) throws Exception;
}