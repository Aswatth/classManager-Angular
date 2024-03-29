package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Models.StudentEntity;

import java.util.List;

public interface IFeesAuditService
{
    public void CreateAudit(StudentEntity studentEntity, String subjects, double totalFees);
    public void AddFeesAudit(List<FeesAuditEntity> feesAuditEntityList);
    public void UpdateFeesAudit(int studentId, String subjects, double totalFees);
    public void DeleteAudit(FeesAuditEntity feesAuditEntity);
    public void DeleteAudits(List<FeesAuditEntity> feesAuditEntityList);
}
