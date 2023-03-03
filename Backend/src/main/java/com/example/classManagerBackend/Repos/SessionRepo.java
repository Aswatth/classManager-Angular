package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.SessionId;
import com.example.classManagerBackend.Models.SessionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SessionRepo extends JpaRepository<SessionModel, SessionId>
{
    @Query(value = "SELECT sum(fees) FROM Session s", nativeQuery = true)
    public double totalFees();

    public SessionModel findBySubjectAndStudentId(String subject, int studentId);
}
