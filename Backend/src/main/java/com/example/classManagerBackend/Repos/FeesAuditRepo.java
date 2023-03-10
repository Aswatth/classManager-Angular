package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface FeesAuditRepo extends JpaRepository<FeesAuditEntity, Integer>
{
    FeesAuditEntity findByFeesDateAndStudentId(Date feesDate, int studentId);
    FeesAuditEntity findByStudentIdAndPaidOn(int studentId, Date paidOn);
}
