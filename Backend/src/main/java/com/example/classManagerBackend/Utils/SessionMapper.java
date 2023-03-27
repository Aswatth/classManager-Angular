package com.example.classManagerBackend.Utils;

import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Models.SubjectEntity;
import com.example.classManagerBackend.Repos.ClassRepo;
import com.example.classManagerBackend.Repos.SubjectRepo;
import com.example.classManagerBackend.View.SessionDataModel;
import com.example.classManagerBackend.View.StudentDataModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import javax.swing.text.html.parser.Entity;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

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
        sessionDataModel.setStudentId(sessionEntity.getStudentId());
        sessionDataModel.setSubject(subject);
        sessionDataModel.setDays(sessionEntity.getDays());
        sessionDataModel.setStartTime(sessionEntity.getStartTime());
        sessionDataModel.setEndTime(sessionEntity.getEndTime());
        sessionDataModel.setFees(sessionEntity.getFees());

        return sessionDataModel;
    }
    public static SessionEntity DataToEntity(SessionDataModel sessionDataModel, SubjectEntity subjectEntity)
    {
        SessionEntity sessionEntity = new SessionEntity();

        sessionEntity.setId(sessionDataModel.getId());
        sessionEntity.setSubjectEntity(subjectEntity);
        sessionEntity.setStudentId(sessionDataModel.getStudentId());
        sessionEntity.setDays(sessionDataModel.getDays());
        sessionEntity.setStartTime(sessionDataModel.getStartTime());
        sessionEntity.setEndTime(sessionDataModel.getEndTime());
        sessionEntity.setFees(sessionDataModel.getFees());

        return sessionEntity;
    }
}
