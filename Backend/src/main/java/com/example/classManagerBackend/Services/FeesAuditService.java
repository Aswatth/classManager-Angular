package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Repos.FeesAuditRepo;
import com.example.classManagerBackend.Repos.StudentRepo;
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
    StudentRepo studentRepo;

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
        feesAuditEntity.setStudentEntity(studentRepo.findById(studentId).get());
        feesAuditEntity.setFees(totalFees);
        feesAuditEntity.setPaidOn(null);
        feesAuditEntity.setComments(null);

        feesAuditRepo.save(feesAuditEntity);
    }

    @Override
    public void UpdateFeesAudit(int studentId, String subjects, double totalFees)
    {
        Date currentDate = dateUtils.GetCurrentDate();

        StudentEntity studentEntity = studentRepo.findById(studentId).get();

        FeesAuditEntity feesAuditEntity = feesAuditRepo.findByFeesDateAndStudentEntity(currentDate, studentEntity);
        if (feesAuditEntity.getPaidOn() != null)
        {
            feesAuditEntity = feesAuditRepo.findByStudentEntityAndPaidOn(studentEntity, null);
        }
        feesAuditEntity.setFees(totalFees);

        feesAuditEntity.setSubjects(subjects);
        feesAuditRepo.save(feesAuditEntity);
    }

    public void SaveChanges(boolean isStudentActive, FeesAuditEntity feesAuditEntity, String subjects, double actualFees)
    {
        //Save changes for current month
        feesAuditRepo.save(feesAuditEntity);

        if(isStudentActive)
        {
            //Insert record for next month
            Date nextDate = new DateUtils().IncrementDate(feesAuditEntity.getFeesDate());

            FeesAuditEntity nextFeesAuditEntity = new FeesAuditEntity();
            nextFeesAuditEntity.setFees(actualFees);
            nextFeesAuditEntity.setSubjects(subjects);
            nextFeesAuditEntity.setFeesDate(nextDate);
            nextFeesAuditEntity.setStudentEntity(feesAuditEntity.getStudentEntity());

            feesAuditRepo.save(nextFeesAuditEntity);
        }
    }

    public FeesAuditEntity GetFeesAudit(Date date, int studentId)
    {
        StudentEntity studentEntity = studentRepo.findById(studentId).get();
        return feesAuditRepo.findByFeesDateAndStudentEntity(date, studentEntity);
    }
    public List<FeesAuditEntity> GetFeesAudit()
    {
        return feesAuditRepo.findAll();
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

    @Override
    public void DeleteAudit(FeesAuditEntity feesAuditEntity)
    {
        feesAuditRepo.delete(feesAuditEntity);
    }

}
