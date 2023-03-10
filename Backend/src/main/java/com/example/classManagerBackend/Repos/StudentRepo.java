package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<StudentEntity, Integer>
{
}
