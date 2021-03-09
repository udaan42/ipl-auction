package com.iplauction.jcrud;

import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.iplauction"})
@EnableDynamoDBRepositories(basePackages = {"com.iplauction"})
public class JcrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(JcrudApplication.class, args);
	}


}
