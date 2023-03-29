package com.example.classManagerBackend.Utils;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.View.FeesAuditDataModel;
import com.example.classManagerBackend.View.StudentDataModel;

public class FeesAuditMapper
{
    private static FeesAuditMapper INSTANCE;

    private FeesAuditMapper() {
    }

    public static FeesAuditMapper getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new FeesAuditMapper();
        }

        return INSTANCE;
    }

    public static FeesAuditDataModel EntityToData(FeesAuditEntity feesAuditEntity, StudentDataModel studentDataModel)
    {
        FeesAuditDataModel feesAuditDataModel = new FeesAuditDataModel();

        feesAuditDataModel.setId(feesAuditEntity.getId());
        feesAuditDataModel.setStudentId(studentDataModel.getId());
        feesAuditDataModel.setStudentName(studentDataModel.getStudentName());
        feesAuditDataModel.setClassName(studentDataModel.getClassName());
        feesAuditDataModel.setBoardName(studentDataModel.getBoardName());

        feesAuditDataModel.setFeesDate(feesAuditEntity.getFeesDate());
        feesAuditDataModel.setSubjects(feesAuditEntity.getSubjects());
        feesAuditDataModel.setFees(feesAuditEntity.getFees());
        feesAuditDataModel.setPaidOn(feesAuditEntity.getPaidOn());
        feesAuditDataModel.setModeOfPayment(feesAuditEntity.getModeOfPayment());
        feesAuditDataModel.setComments(feesAuditEntity.getComments());


        return feesAuditDataModel;
    }
    public static  FeesAuditEntity DataToEntity(FeesAuditDataModel feesAuditDataModel, StudentEntity studentEntity)
    {
        FeesAuditEntity feesAuditEntity = new FeesAuditEntity();

        feesAuditEntity.setId(feesAuditDataModel.getId());
        feesAuditEntity.setFeesDate(feesAuditDataModel.getFeesDate());
        feesAuditEntity.setSubjects(feesAuditDataModel.getSubjects());
        feesAuditEntity.setStudentEntity(studentEntity);
        feesAuditEntity.setFees(feesAuditDataModel.getFees());
        feesAuditEntity.setPaidOn(feesAuditDataModel.getPaidOn());
        feesAuditEntity.setModeOfPayment(feesAuditDataModel.getModeOfPayment());
        feesAuditEntity.setComments(feesAuditDataModel.getComments());

        return feesAuditEntity;
    }
}
