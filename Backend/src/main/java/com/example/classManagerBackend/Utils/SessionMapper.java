package com.example.classManagerBackend.Utils;

import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Models.SubjectEntity;
import com.example.classManagerBackend.View.SessionDataModel;

public class SessionMapper
{
    private static SessionMapper INSTANCE;

    private SessionMapper() {
    }

    public static SessionMapper getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new SessionMapper();
        }

        return INSTANCE;
    }

    public static SessionDataModel EntityToData(SessionEntity sessionEntity, String subject)
    {
        SessionDataModel sessionDataModel = new SessionDataModel();

        sessionDataModel.setId(sessionEntity.getId());
        sessionDataModel.setStudentId(sessionEntity.getStudentEntity().getId());
        sessionDataModel.setSubject(subject);
        sessionDataModel.setDays(sessionEntity.getDays());
        sessionDataModel.setStartTime(sessionEntity.getStartTime());
        sessionDataModel.setEndTime(sessionEntity.getEndTime());
        sessionDataModel.setFees(sessionEntity.getFees());

        return sessionDataModel;
    }
    public static SessionEntity DataToEntity(SessionDataModel sessionDataModel, SubjectEntity subjectEntity, StudentEntity studentEntity)
    {
        SessionEntity sessionEntity = new SessionEntity();

        sessionEntity.setId(sessionDataModel.getId());
        sessionEntity.setSubjectEntity(subjectEntity);
        sessionEntity.setStudentEntity(studentEntity);
        sessionEntity.setDays(sessionDataModel.getDays());
        sessionEntity.setStartTime(sessionDataModel.getStartTime());
        sessionEntity.setEndTime(sessionDataModel.getEndTime());
        sessionEntity.setFees(sessionDataModel.getFees());

        return sessionEntity;
    }
}
