package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Repos.FeesAuditRepo;
import com.example.classManagerBackend.Repos.SessionRepo;
import com.example.classManagerBackend.Utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FeesAuditService implements IFeesAuditService
{
    @Autowired
    FeesAuditRepo feesAuditRepo;

    @Autowired
    DateUtils dateUtils;

    @Override
    public void AddFeesAudit(List<FeesAuditEntity> feesAuditEntityList)
    {
        feesAuditRepo.saveAll(feesAuditEntityList);
    }

    @Override
    public void CreateAudit(int studentId, String subjects, double totalFees)
    {
        FeesAuditEntity feesAuditEntity = new FeesAuditEntity();

        feesAuditEntity.setFeesDate(dateUtils.GetCurrentDate());
        feesAuditEntity.setSubjects(subjects);
        feesAuditEntity.setStudentId(studentId);
        feesAuditEntity.setFees(totalFees);
        feesAuditEntity.setPaidOn(null);
        feesAuditEntity.setComments(null);

        feesAuditRepo.save(feesAuditEntity);
    }

    @Override
    public void UpdateFeesAudit(int studentId, String subjects, double totalFees)
    {
        Date currentDate = dateUtils.GetCurrentDate();

        FeesAuditEntity feesAuditEntity = feesAuditRepo.findByFeesDateAndStudentId(currentDate, studentId);
        if(feesAuditEntity.getPaidOn() == null)
        {
            feesAuditEntity.setFees(totalFees);
        }
        else
        {
            feesAuditEntity = feesAuditRepo.findByStudentIdAndPaidOn(studentId, null);
            feesAuditEntity.setFees(totalFees);
        }

        feesAuditEntity.setSubjects(subjects);
        feesAuditRepo.save(feesAuditEntity);
    }

    public void SaveChanges(FeesAuditEntity feesAuditEntity, String subjects, double actualFees)
    {
        //Save changes for current month
        feesAuditRepo.save(feesAuditEntity);

        //Insert record for next month
        Date nextDate = new DateUtils().IncrementDate(feesAuditEntity.getFeesDate());

        FeesAuditEntity nextFeesAuditEntity = new FeesAuditEntity();
        nextFeesAuditEntity.setFees(actualFees);
        nextFeesAuditEntity.setSubjects(subjects);
        nextFeesAuditEntity.setFeesDate(nextDate);
        nextFeesAuditEntity.setStudentId(feesAuditEntity.getStudentId());

        feesAuditRepo.save(nextFeesAuditEntity);
    }

    public FeesAuditEntity GetFeesAudit(Date date, int studentId)
    {

        return feesAuditRepo.findByFeesDateAndStudentId(date, studentId);
    }

    public List<Date> GetDateList()
    {
        return feesAuditRepo.findDistinctFeesDate();
    }


    @Override
    public void DeleteAudits(List<FeesAuditEntity> feesAuditEntityList)
    {
        feesAuditRepo.deleteAll(feesAuditEntityList);
    }

}
