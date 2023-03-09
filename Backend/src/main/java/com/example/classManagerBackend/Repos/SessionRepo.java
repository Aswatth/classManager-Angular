package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.SessionModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SessionRepo extends JpaRepository<SessionModel, Integer>
{
    public Optional<SessionModel> findBySubjectAndStudentId(String subject, int studentId);
    public List<SessionModel> findByStudentId(int studentId);
}
