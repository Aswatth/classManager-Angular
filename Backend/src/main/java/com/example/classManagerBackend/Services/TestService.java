package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Models.TestEntity;
import com.example.classManagerBackend.Repos.*;
import com.example.classManagerBackend.Utils.TestMapper;
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
                &&  (e.getStudentEntity()!=null && e.getStudentEntity().getId() == studentId ))
                .forEach(e->{
            TestDataModel dataModel = new TestDataModel();

            testDataModelList.add(TestMapper.EntityToData(e));
        });

        return testDataModelList;
    }

    public void AddTest(TestDataModel testDataModel, StudentEntity studentEntity)
    {
        TestEntity testEntity = new TestEntity();

        testEntity = TestMapper.DataToEntity(testDataModel, studentEntity);
        testRepo.save(testEntity);
    }

    public void DeleteTest(int testId)
    {
        testRepo.deleteById(testId);
    }
}
