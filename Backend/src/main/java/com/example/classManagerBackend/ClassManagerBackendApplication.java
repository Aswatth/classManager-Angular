package com.example.classManagerBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ClassManagerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClassManagerBackendApplication.class, args);
		System.out.println("Server started...");
	}

}
