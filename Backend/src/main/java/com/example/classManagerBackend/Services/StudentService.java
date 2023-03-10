package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.*;
import com.example.classManagerBackend.Repos.StudentRepo;
import com.example.classManagerBackend.Utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService implements IStudentService
{
    @Autowired
    StudentRepo studentRepo;

    @Autowired
    SessionService sessionService;

    @Autowired
    FeesAuditService feesAuditService;

    @Autowired
    DateUtils dateUtils;

    @Override
    public List<StudentEntity> AddStudent(StudentEntity studentEntity)
    {
        //Store session of current student in a temporary list
        List<SessionEntity> sessionEntityList = studentEntity.getSessionList();
        studentEntity.setSessionList(null);

        //Get student after successfully inserting student data
        int addedStudentId = studentRepo.save((studentEntity)).getId();
        //studentEntity.setSessionList(sessionEntityList);

        //Use the student id to insert corresponding session
        sessionService.AddSessions(sessionEntityList, addedStudentId);

        //Create audit once a new student is created
        feesAuditService.CreateAudit(addedStudentId, sessionEntityList.stream().mapToDouble(SessionEntity::getFees).sum());

        //Return list of all students
        return GetAllStudents();
    }

    @Override
    public void UpdateStudent(int id, StudentEntity newStudentEntity)
    {
        newStudentEntity.setSessionList(null);
        newStudentEntity.setFeesAuditEntityList(null);

        //Update existing student data
        studentRepo.save(newStudentEntity);
    }

    @Override
    public List<StudentEntity> DeleteStudent(int id)
    {
        //Delete all sessions before deleting student as session is associated with student data
        List<SessionEntity> sessionEntityList = studentRepo.findById(id).get().getSessionList();
        sessionService.DeleteSessions(sessionEntityList);

        //Delete all fees audit before deleting student
        List<FeesAuditEntity> feesAuditEntityList = studentRepo.findById(id).get().getFeesAuditEntityList();
        feesAuditService.DeleteAudits(feesAuditEntityList);

        //Delete student data after all sessions is deleted
        studentRepo.deleteById(id);

        //Return updated list of all students
        return GetAllStudents();
    }

    @Override
    public List<StudentEntity> GetAllStudents()
    {
        return studentRepo.findAll();
    }

    @Override
    public StudentEntity GetStudent(int id){
        Optional<StudentEntity> studentModel = studentRepo.findById(id);
        return studentModel.orElse(null);
    }

    public List<FeesDataModel> GetFeesAudit(Date date)
    {
        List<FeesDataModel> feesDataModelList = new ArrayList<>();

        List<StudentEntity> studentEntityList = GetAllStudents();

        studentEntityList.forEach(stu -> {
            FeesDataModel feesDataModel = new FeesDataModel();
            feesDataModel.setStudentId(stu.getId());
            feesDataModel.setStudentName(stu.getStudentName());
            feesDataModel.setClassName(stu.getClassName());
            feesDataModel.setBoardName(stu.getBoardName());

            List<String> subjectList = stu.getSessionList().stream().map(SessionEntity::getSubject).collect(Collectors.toList());
            String subjects = String.join(",",subjectList);

            feesDataModel.setSubjects(subjects);

            FeesAuditEntity feesAuditEntity = feesAuditService.GetFeesAudit(date, stu.getId());

            feesDataModel.setFeesAuditEntity(feesAuditEntity);

            feesDataModelList.add(feesDataModel);
        });

        return feesDataModelList;
    }

    public void SaveFeesAudit(FeesDataModel feesDataModel)
    {
        double actualFees = studentRepo.findById(feesDataModel.getStudentId()).get().getSessionList().stream().map(SessionEntity::getFees).mapToDouble(m->m).sum();
        feesAuditService.SaveChanges(feesDataModel.getFeesAuditEntity(), actualFees);
    }

}
