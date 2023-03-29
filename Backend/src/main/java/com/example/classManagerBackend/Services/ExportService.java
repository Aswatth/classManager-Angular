package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Repos.StudentRepo;
import com.example.classManagerBackend.Utils.FeesAuditMapper;
import com.example.classManagerBackend.Utils.StudentMapper;
import com.example.classManagerBackend.Utils.TestMapper;
import com.example.classManagerBackend.View.ExportData;
import com.example.classManagerBackend.View.FeesAuditDataModel;
import com.example.classManagerBackend.View.StudentDataModel;
import com.example.classManagerBackend.View.TestDataModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExportService
{
    @Autowired
    StudentService studentService;

    @Autowired
    StudentRepo studentRepo;

    @Autowired
    FilterService filterService;

    public ExportData Export()
    {
        ExportData exportData = new ExportData();

        //Get student-session data
        exportData.setStudentModelList(studentService.GetAllStudents(true));

        //Get fees data
        List<StudentEntity> studentEntityList = studentRepo.findAll();
        studentEntityList = studentEntityList.stream().filter(StudentEntity::isActive).collect(Collectors.toList());

        List<FeesAuditDataModel> feesAuditDataModelList = new ArrayList<>();

        studentEntityList.forEach(e->{
            List<FeesAuditEntity> feesAuditEntityList = e.getFeesAuditEntityList();
            StudentDataModel studentDataModel = StudentMapper.EntityToData(e,e.getClassEntity().getClassName(), e.getBoardEntity().getBoardName());

            feesAuditEntityList.forEach(f->{
                FeesAuditDataModel feesAuditDataModel = new FeesAuditDataModel();
                feesAuditDataModel = FeesAuditMapper.EntityToData(f,studentDataModel);
                feesAuditDataModelList.add(feesAuditDataModel);
            });
        });

        exportData.setFeesModelList(feesAuditDataModelList);

        //Get tests
        List<TestDataModel> testDataModelList = new ArrayList<>();
        studentEntityList.forEach(e->{
            e.getTestEntityList().forEach(t->{
                testDataModelList.add(TestMapper.EntityToData(t));
            });
        });
        exportData.setTestModelList(testDataModelList);

        //Get Class-Board-Subject data
        exportData.setClassList(filterService.GetClassList());
        exportData.setBoardList(filterService.GetBoardList());
        exportData.setSubjectList(filterService.GetSubjectList());

        return exportData;
    }
}
