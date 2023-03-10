package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface FeesAuditRepo extends JpaRepository<FeesAuditEntity, Integer>
{
    FeesAuditEntity findByFeesDateAndStudentId(Date feesDate, int studentId);
    FeesAuditEntity findByStudentIdAndPaidOn(int studentId, Date paidOn);
    @Query(value = "SELECT DISTINCT f.Fees_Date FROM fees_Audit f",nativeQuery = true)
    List<Date> findDistinctFeesDate();
}
