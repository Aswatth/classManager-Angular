package com.example.classManagerBackend.Utils;

import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Models.TestEntity;
import com.example.classManagerBackend.View.TestDataModel;

import java.util.List;
import java.util.Objects;

public class TestMapper
{
    private static TestMapper INSTANCE;

    private TestMapper() {
    }

    public static TestMapper getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new TestMapper();
        }

        return INSTANCE;
    }

    public static TestDataModel EntityToData(TestEntity testEntity)
    {
        TestDataModel testDataModel = new TestDataModel();

        testDataModel.setId(testEntity.getId());
        testDataModel.setTestName(testEntity.getTestName());
        testDataModel.setTotalMarks(testEntity.getTotalMarks());
        testDataModel.setMarksScored(testEntity.getMarksScored());
        testDataModel.setTestDate(testEntity.getTestDate());
        testDataModel.setClassName(testEntity.getClassName());
        testDataModel.setBoardName(testEntity.getBoardName());
        testDataModel.setSubject(testEntity.getSubject());
        testDataModel.setStudentId(testEntity.getStudentEntity().getId());

        return testDataModel;
    }

    public static TestEntity DataToEntity(TestDataModel testDataModel, StudentEntity studentEntity)
    {
        TestEntity testEntity = new TestEntity();

        testEntity.setTestName(testDataModel.getTestName());
        testEntity.setTotalMarks(testDataModel.getTotalMarks());
        testEntity.setMarksScored(testDataModel.getMarksScored());
        testEntity.setTestDate(testDataModel.getTestDate());
        testEntity.setClassName(testDataModel.getClassName());
        testEntity.setBoardName(testDataModel.getBoardName());
        testEntity.setSubject(
                studentEntity.getSessionList().stream().filter(
                                e-> Objects.equals(e.getSubjectEntity().getSubject(), testDataModel.getSubject())).findFirst().get()
                        .getSubjectEntity().getSubject());
        testEntity.setStudentEntity(studentEntity);

        return testEntity;
    }
}
