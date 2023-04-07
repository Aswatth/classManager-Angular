package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.BoardEntity;
import com.example.classManagerBackend.Models.ClassEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface StudentRepo extends JpaRepository<StudentEntity, Integer>
{
    public StudentEntity findByStudentNameAndClassEntityAndBoardEntityAndDateOfBirth(String studentName, ClassEntity classEntity, BoardEntity boardEntity, Date dateOfBirth);
}
