package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;

import java.util.List;

public interface IFeesAuditService
{
    public void AddFeesAudit(List<FeesAuditEntity> feesAuditEntityList);
    public void UpdateFeesAudit(int studentId, double totalFees);
    public void DeleteAudits(List<FeesAuditEntity> feesAuditEntityList);
}
