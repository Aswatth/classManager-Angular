package com.example.classManagerBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

@SpringBootApplication
public class ClassManagerBackendApplication {

	public static void main(String[] args) {

		/*SingleConnectionDataSource ds = new SingleConnectionDataSource();

		//ds.setDriverClassName("org.hsqldb.jdbcDriver");
		ds.setUrl("jdbc:h2:file:O:/MyProjects/SQL-Queries/DB/testDB");
		ds.setUsername("sa");
		ds.setPassword("password");

		JdbcTemplate jt = new JdbcTemplate(ds);
		jt.execute("create table if not exists student (" +
				"id int NOT NULL PRIMARY KEY AUTO_INCREMENT, " +
				"name varchar, " +
				"schoolName varchar, " +
				"className varchar, " +
				"boardName varchar, " +
				"location varchar," +
				"studentMobileNumber varchar, " +
				"parentMobileNumber1 varchar, " +
				"parentMobileNumber2 varchar," +
				"PRIMARY KEY (ID)" +
				")"
		);*/

		SpringApplication.run(ClassManagerBackendApplication.class, args);
		System.out.println("Server started...");
	}

}
