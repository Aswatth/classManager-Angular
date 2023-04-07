package com.example.classManagerBackend.Utils;

import com.example.classManagerBackend.Models.BoardEntity;
import com.example.classManagerBackend.Models.ClassEntity;
import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Repos.SubjectRepo;
import com.example.classManagerBackend.View.SessionDataModel;
import com.example.classManagerBackend.View.StudentDataModel;

import java.util.ArrayList;
import java.util.List;

public final class StudentMapper
{
    private static StudentMapper INSTANCE;

    private StudentMapper() {
    }

    public static StudentMapper getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new StudentMapper();
        }

        return INSTANCE;
    }

    public static StudentDataModel EntityToData(StudentEntity studentEntity, String className, String boardName)
    {
        StudentDataModel studentDataModel = new StudentDataModel();

        studentDataModel.setId(studentEntity.getId());
        studentDataModel.setStudentName(studentEntity.getStudentName());
        studentDataModel.setDateOfBirth(studentEntity.getDateOfBirth());
        studentDataModel.setSchoolName(studentEntity.getSchoolName());
        studentDataModel.setClassName(className);
        studentDataModel.setBoardName(boardName);
        studentDataModel.setLocation(studentEntity.getLocation());
        studentDataModel.setStudentPhNum(studentEntity.getStudentPhNum());
        studentDataModel.setParentPhNum1(studentEntity.getParentPhNum1());
        studentDataModel.setParentPhNum2(studentEntity.getParentPhNum2());

        List<SessionDataModel> sessionDataModelList = new ArrayList<>();
        studentEntity.getSessionList().forEach(e->sessionDataModelList.add(SessionMapper.EntityToData(e, e.getSubjectEntity().getSubject())));

        studentDataModel.setSessionList(sessionDataModelList);

        return studentDataModel;
    }
    public static  StudentEntity DataToEntity(StudentDataModel studentDataModel, ClassEntity classEntity, BoardEntity boardEntity, SubjectRepo subjectRepo)
    {
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setId(studentDataModel.getId());
        studentEntity.setStudentName(studentDataModel.getStudentName());
        studentEntity.setDateOfBirth(studentDataModel.getDateOfBirth());
        studentEntity.setSchoolName(studentDataModel.getSchoolName());
        studentEntity.setClassEntity(classEntity);
        studentEntity.setBoardEntity(boardEntity);
        studentEntity.setLocation(studentDataModel.getLocation());
        studentEntity.setStudentPhNum(studentDataModel.getStudentPhNum());
        studentEntity.setParentPhNum1(studentDataModel.getParentPhNum1());
        studentEntity.setParentPhNum2(studentDataModel.getParentPhNum2());

        List<SessionEntity> sessionEntityList = new ArrayList<>();
        if(studentDataModel.getSessionList() != null)
            studentDataModel.getSessionList().forEach(e-> sessionEntityList.add(SessionMapper.DataToEntity(e, subjectRepo.findBySubject(e.getSubject()), studentEntity)));
        studentEntity.setSessionList(sessionEntityList);

        return studentEntity;
    }
    public static List<StudentDataModel> EntityListDataList(List<StudentEntity> studentEntityList)
    {
        List<StudentDataModel> studentDataModelList = new ArrayList<>();
        studentEntityList.forEach(e->studentDataModelList.add(EntityToData(e, e.getClassEntity().getClassName(), e.getBoardEntity().getBoardName())));
        return  studentDataModelList;
    }
}
