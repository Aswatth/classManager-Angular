package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Models.FeesDataModel;
import com.example.classManagerBackend.Repos.FeesAuditRepo;
import com.example.classManagerBackend.Repos.SessionRepo;
import com.example.classManagerBackend.Utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class FeesAuditService implements IFeesAuditService
{
    @Autowired
    FeesAuditRepo feesAuditRepo;

    @Autowired
    SessionRepo sessionRepo;

    @Autowired
    DateUtils dateUtils;

    @Override
    public void AddFeesAudit(List<FeesAuditEntity> feesAuditEntityList)
    {
        feesAuditRepo.saveAll(feesAuditEntityList);
    }



    public void CreateAudit(int studentId, double totalFees)
    {
        FeesAuditEntity feesAuditEntity = new FeesAuditEntity();

        feesAuditEntity.setFeesDate(dateUtils.GetCurrentDate());
        feesAuditEntity.setStudentId(studentId);
        feesAuditEntity.setFees(totalFees);
        feesAuditEntity.setPaidOn(null);
        feesAuditEntity.setComments(null);

        feesAuditRepo.save(feesAuditEntity);
    }

    public void UpdateFeesAudit(int studentId, double totalFees)
    {
        Date currentDate = dateUtils.GetCurrentDate();

        FeesAuditEntity feesAuditEntity = feesAuditRepo.findByFeesDateAndStudentId(currentDate, studentId);
        if(feesAuditEntity.getPaidOn() == null)
            feesAuditEntity.setFees(totalFees);
        else
        {
            FeesAuditEntity entity = feesAuditRepo.findByStudentIdAndPaidOn(studentId, null);
            entity.setFees(totalFees);
            feesAuditRepo.save(entity);
        }

        feesAuditRepo.save(feesAuditEntity);
    }

    public void SaveChanges(FeesAuditEntity feesAuditEntity, double actualFees)
    {
        //Save changes for current month
        feesAuditRepo.save(feesAuditEntity);

        //Insert record for next month
        Date nextDate = new DateUtils().IncrementDate(feesAuditEntity.getFeesDate());

        FeesAuditEntity nextFeesAuditEntity = new FeesAuditEntity();
        nextFeesAuditEntity.setFees(actualFees);
        nextFeesAuditEntity.setFeesDate(nextDate);
        nextFeesAuditEntity.setStudentId(feesAuditEntity.getStudentId());

        feesAuditRepo.save(nextFeesAuditEntity);
    }

    public FeesAuditEntity GetFeesAudit(Date date, int studentId)
    {
        FeesAuditEntity feesAuditEntity =feesAuditRepo.findByFeesDateAndStudentId(date, studentId);

        return feesAuditEntity;
    }


    @Override
    public void DeleteAudits(List<FeesAuditEntity> feesAuditEntityList)
    {
        feesAuditRepo.deleteAll(feesAuditEntityList);
    }

}
