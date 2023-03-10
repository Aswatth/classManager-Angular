package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.FeesDataModel;
import com.example.classManagerBackend.Models.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentRepo extends JpaRepository<StudentEntity, Integer>
{
}
