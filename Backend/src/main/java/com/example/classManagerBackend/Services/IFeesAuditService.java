package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;

import java.util.List;

public interface IFeesAuditService
{
    public void CreateAudit(int studentId, String subjects, double totalFees);
    public void AddFeesAudit(List<FeesAuditEntity> feesAuditEntityList);
    public void UpdateFeesAudit(int studentId, String subjects, double totalFees);
    public void DeleteAudits(List<FeesAuditEntity> feesAuditEntityList);
}
