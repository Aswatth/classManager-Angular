package com.example.classManagerBackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

import java.io.IOException;

@SpringBootApplication
public class ClassManagerBackendApplication {

	public static void main(String[] args) throws IOException
	{
		ApplicationContext context = SpringApplication.run(ClassManagerBackendApplication.class, args);

		System.out.println("Server started...");
	}
}
