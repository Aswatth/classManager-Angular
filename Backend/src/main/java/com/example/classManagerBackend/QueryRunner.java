package com.example.classManagerBackend;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;

public class QueryRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public QueryRunner(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public void RunQueryFromFile(String fileName) throws IOException {
        ClassPathResource resource = new ClassPathResource(fileName);
        InputStream inputStream = resource.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

        String line;
        StringBuilder queryBuilder = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            queryBuilder.append(line).append("\n");
        }

        String query = queryBuilder.toString();

        jdbcTemplate.execute(query);
    }
}

