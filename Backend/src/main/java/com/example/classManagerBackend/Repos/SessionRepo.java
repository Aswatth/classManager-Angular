package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Models.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SessionRepo extends JpaRepository<SessionEntity, Integer>
{
    public Optional<SessionEntity> findBySubjectEntityAndStudentEntity(SubjectEntity subjectEntity, StudentEntity studentEntity);
    public List<SessionEntity> findByStudentEntity(StudentEntity studentEntity);
}
