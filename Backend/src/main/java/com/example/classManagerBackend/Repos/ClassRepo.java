package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepo extends JpaRepository<ClassEntity, Integer>
{
   public ClassEntity findByClassName(String className);
}
