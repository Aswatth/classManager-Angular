package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.StudentModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<StudentModel, Integer>
{
}
