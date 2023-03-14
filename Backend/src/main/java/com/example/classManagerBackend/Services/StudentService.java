package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Models.FeesDataModel;
import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Repos.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public List<StudentEntity> AddStudent(StudentEntity studentEntity)
    {
        //Store session of current student in a temporary list
        List<SessionEntity> sessionEntityList = studentEntity.getSessionList();
        studentEntity.setSessionList(null);

        //Get student after successfully inserting student data
        studentEntity.setActive(true);
        int addedStudentId = studentRepo.save((studentEntity)).getId();
        //studentEntity.setSessionList(sessionEntityList);

        //Use the student id to insert corresponding session
        sessionService.AddSessions(sessionEntityList, addedStudentId);

        List<String> subjectList = new ArrayList<>();

        sessionEntityList.forEach(e -> subjectList.add(e.getSubject()));

        //Create audit once a new student is created
        feesAuditService.CreateAudit(addedStudentId, String.join(",", subjectList) ,sessionEntityList.stream().mapToDouble(SessionEntity::getFees).sum());

        //Return list of all students
        return GetAllStudents(true);
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
        //Delete student data after all sessions is deleted
        Optional<StudentEntity> studentEntity = studentRepo.findById(id);
        if(studentEntity.isPresent())
        {
            studentEntity.get().setActive(false);
            studentRepo.save(studentEntity.get());
        }
        //studentRepo.deleteById(id);

        //Return updated list of all students
        return GetAllStudents(true);
    }

    @Override
    public List<StudentEntity> GetAllStudents(boolean fetchActive)
    {
        if(!fetchActive)
        {
            return studentRepo.findAll();
        }
        return studentRepo.findAll().stream().filter(StudentEntity::isActive).collect(Collectors.toList());
    }

    @Override
    public StudentEntity GetStudent(int id){
        Optional<StudentEntity> studentModel = studentRepo.findById(id);
        return studentModel.orElse(null);
    }

    public List<FeesDataModel> GetFeesAudit(Date date)
    {
        List<FeesDataModel> feesDataModelList = new ArrayList<>();

        List<StudentEntity> studentEntityList = GetAllStudents(false);

        studentEntityList.forEach(stu -> {
            FeesDataModel feesDataModel = new FeesDataModel();
            feesDataModel.setStudentId(stu.getId());
            feesDataModel.setStudentName(stu.getStudentName());
            feesDataModel.setClassName(stu.getClassName());
            feesDataModel.setBoardName(stu.getBoardName());

            FeesAuditEntity feesAuditEntity = feesAuditService.GetFeesAudit(date, stu.getId());

            feesDataModel.setFeesAuditEntity(feesAuditEntity);

            feesDataModelList.add(feesDataModel);
        });

        return feesDataModelList;
    }

    public void SaveFeesAudit(FeesDataModel feesDataModel)
    {
        Optional<StudentEntity> studentEntity = studentRepo.findById(feesDataModel.getStudentId());

        if(studentEntity.isPresent())
        {
            List<SessionEntity> sessionList = studentEntity.get().getSessionList();
            double actualFees = sessionList.stream().map(SessionEntity::getFees).mapToDouble(m->m).sum();
            List<String> subjectList = new ArrayList<>();
            sessionList.forEach(e->subjectList.add(e.getSubject()));
            feesAuditService.SaveChanges(studentEntity.get().isActive(), feesDataModel.getFeesAuditEntity(), String.join(",",subjectList),actualFees);
        }
    }
}
