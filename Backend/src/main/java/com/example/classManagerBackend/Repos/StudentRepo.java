package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.BoardEntity;
import com.example.classManagerBackend.Models.ClassEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<StudentEntity, Integer>
{
    public StudentEntity findByClassEntityAndBoardEntityOrParentPhNum1(ClassEntity classEntity, BoardEntity boardEntity, String parentPhNum1);
}
