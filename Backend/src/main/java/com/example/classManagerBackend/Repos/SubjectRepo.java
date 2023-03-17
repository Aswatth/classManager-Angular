package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubjectRepo extends JpaRepository<SubjectEntity, Integer>
{
    public SubjectEntity findBySubject(String subject);
}
