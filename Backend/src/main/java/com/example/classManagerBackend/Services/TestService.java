package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Models.TestEntity;
import com.example.classManagerBackend.Repos.*;
import com.example.classManagerBackend.View.TestDataModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestService
{
    @Autowired
    TestRepo testRepo;
    @Autowired
    ClassRepo classRepo;
    @Autowired
    BoardRepo boardRepo;
    @Autowired
    StudentRepo studentRepo;

    public List<TestDataModel> GetTests(int studentId)
    {
        List<TestDataModel> testDataModelList = new ArrayList<>();

        StudentEntity studentEntity = studentRepo.findById(studentId).get();

        List<TestEntity> testEntities = testRepo.findAll();
        testEntities.stream().filter(
                e->(Objects.equals(e.getClassName(), studentEntity.getClassEntity().getClassName()))
                        && (Objects.equals(e.getBoardName(), studentEntity.getBoardEntity().getBoardName()))
                &&  e.getStudentEntity().getId() == studentId)
                .forEach(e->{
            TestDataModel dataModel = new TestDataModel();

            dataModel.setId(e.getId());
            dataModel.setTestName(e.getTestName());
            dataModel.setTotalMarks(e.getTotalMarks());
            dataModel.setMarksScored(e.getMarksScored());
            dataModel.setTestDate(e.getTestDate());
            dataModel.setClassName(e.getClassName());
            dataModel.setBoardName(e.getBoardName());
            dataModel.setSubject(e.getSubject());
            dataModel.setStudentId(e.getStudentEntity().getId());

            testDataModelList.add(dataModel);
        });

        return testDataModelList;
    }

    public void AddTest(TestDataModel testDataModel)
    {
        TestEntity testEntity = new TestEntity();

        Optional<StudentEntity> studentEntity = studentRepo.findById(testDataModel.getStudentId());

        if(studentEntity.isPresent())
        {

            testEntity.setTestName(testDataModel.getTestName());
            testEntity.setTotalMarks(testDataModel.getTotalMarks());
            testEntity.setMarksScored(testDataModel.getMarksScored());
            testEntity.setTestDate(testDataModel.getTestDate());
            testEntity.setClassName(testDataModel.getClassName());
            testEntity.setBoardName(testDataModel.getBoardName());
            testEntity.setSubject(
                    studentEntity.get().getSessionList().stream().filter(
                            e-> Objects.equals(e.getSubjectEntity().getSubject(), testDataModel.getSubject())).findFirst().get()
                            .getSubjectEntity().getSubject());
            testEntity.setStudentEntity(studentEntity.get());

            testRepo.save(testEntity);
        }
    }

    public void DeleteTest(int testId)
    {
        testRepo.deleteById(testId);
    }
}
