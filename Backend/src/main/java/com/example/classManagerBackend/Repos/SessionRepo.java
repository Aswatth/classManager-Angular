package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.SessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SessionRepo extends JpaRepository<SessionEntity, Integer>
{
    public Optional<SessionEntity> findBySubjectAndStudentId(String subject, int studentId);
    public List<SessionEntity> findByStudentId(int studentId);
}
