package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface FeesAuditRepo extends JpaRepository<FeesAuditEntity, Integer>
{
    FeesAuditEntity findByFeesDateAndStudentEntity(Date feesDate, StudentEntity studentEntity);
    FeesAuditEntity findByStudentEntityAndPaidOn(StudentEntity studentEntity, Date paidOn);
    @Query(value = "SELECT DISTINCT f.Fees_Date FROM fees_Audit f ORDER BY f.Fees_date ASC",nativeQuery = true)
    List<Date> findDistinctFeesDate();
}
