package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.TestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepo extends JpaRepository<TestEntity, Integer>
{
}
