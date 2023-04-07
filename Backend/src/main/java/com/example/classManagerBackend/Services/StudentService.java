package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Models.TestEntity;
import com.example.classManagerBackend.Repos.*;
import com.example.classManagerBackend.Utils.FeesAuditMapper;
import com.example.classManagerBackend.Utils.StudentMapper;
import com.example.classManagerBackend.Utils.TestMapper;
import com.example.classManagerBackend.View.FeesAuditDataModel;
import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.View.StudentDataModel;
import com.example.classManagerBackend.View.TestDataModel;
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
    FeesAuditRepo feesAuditRepo;

    @Autowired
    FeesAuditService feesAuditService;

    @Autowired
    TestService testService;

    @Autowired
    ClassRepo classRepo;
    @Autowired
    BoardRepo boardRepo;
    @Autowired
    SubjectRepo subjectRepo;

    @Override
    public List<StudentDataModel> AddStudent(StudentDataModel studentDataModel)
    {
        StudentEntity studentEntity = StudentMapper.DataToEntity(
                studentDataModel,
                classRepo.findByClassName(studentDataModel.getClassName()),
                boardRepo.findByBoardName(studentDataModel.getBoardName()),
                subjectRepo
        );

        if(!StudentExists(studentEntity))
        {
            //Store session of current student in a temporary list
            List<SessionEntity> sessionEntityList = studentEntity.getSessionList();
            studentEntity.setSessionList(null);

            //Get student after successfully inserting student data
            studentEntity.setActive(true);
            int addedStudentId = studentRepo.save((studentEntity)).getId();

            //Use the student id to insert corresponding session
            studentEntity.setSessionList(sessionService.AddSessions(sessionEntityList, addedStudentId));

            List<String> subjectList = new ArrayList<>();

            sessionEntityList.forEach(e -> {
                if(e.getSubjectEntity() != null)
                {
                    subjectList.add(e.getSubjectEntity().getSubject());
                }
            });

            //Create audit once a new student is created
            feesAuditService.CreateAudit(studentRepo.findById(addedStudentId).get(), String.join(",", subjectList) ,sessionEntityList.stream().mapToDouble(SessionEntity::getFees).sum());
        }

        //Return list of all students
        return GetAllStudents(true);
    }

    public void ImportStudent(StudentDataModel studentDataModel, List<FeesAuditDataModel> feesAuditDataModelList, List<TestDataModel> testDataModelList)
    {
        StudentEntity studentEntity = StudentMapper.DataToEntity(
                studentDataModel,
                classRepo.findByClassNameIgnoreCase(studentDataModel.getClassName()),
                boardRepo.findByBoardNameIgnoreCase(studentDataModel.getBoardName()),
                subjectRepo
        );

        //Store session of current student in a temporary list
        List<SessionEntity> sessionEntityList = studentEntity.getSessionList();
        studentEntity.setSessionList(null);

        //Get student after successfully inserting student data
        studentEntity.setActive(true);

        if(!StudentExists(studentEntity))
        {
            StudentEntity addedStudentEntity = studentRepo.save(studentEntity);
            int addedStudentId = addedStudentEntity.getId();
            //studentEntity.setSessionList(sessionEntityList);

            //Use the student id to insert corresponding session
            studentEntity.setSessionList(sessionService.AddSessions(sessionEntityList, addedStudentId));

            List<String> subjectList = new ArrayList<>();

            sessionEntityList.forEach(e -> {
                if(e.getSubjectEntity() != null)
                {
                    subjectList.add(e.getSubjectEntity().getSubject());
                }
            });

            //Import fees
            feesAuditDataModelList.forEach(f->{
                FeesAuditEntity feesAuditEntity = FeesAuditMapper.DataToEntity(f, addedStudentEntity);
                feesAuditEntity.setStudentEntity(addedStudentEntity);
                feesAuditRepo.save(feesAuditEntity);
            });

            //Import tests
            testDataModelList.forEach(t->{
                testService.AddTest(t, addedStudentEntity);
            });
        }
    }

    boolean StudentExists(StudentEntity studentEntity)
    {
        StudentEntity student = studentRepo.findByStudentNameAndClassEntityAndBoardEntityAndDateOfBirth(studentEntity.getStudentName(), studentEntity.getClassEntity(), studentEntity.getBoardEntity(), studentEntity.getDateOfBirth());
        if(student == null)
            return false;
        return true;
    }

    @Override
    public StudentDataModel UpdateStudent(int id, StudentDataModel studentDataModel)
    {
        //System.out.println("Updating: "+newStudentEntity.toString());
        Optional<StudentEntity> studentEntity = studentRepo.findById(id);

        StudentEntity newStudentEntity = StudentMapper.DataToEntity(
                studentDataModel,
                classRepo.findByClassName(studentDataModel.getClassName()),
                boardRepo.findByBoardName(studentDataModel.getBoardName()),
                subjectRepo
        );

        studentEntity.ifPresent(entity -> newStudentEntity.setFeesAuditEntityList(entity.getFeesAuditEntityList()));

        //Update existing student data
        newStudentEntity.setActive(true);

        studentRepo.save(newStudentEntity);

        feesAuditService.UpdateFeesAudit(newStudentEntity);

        return StudentMapper.EntityToData(newStudentEntity, newStudentEntity.getClassEntity().getClassName(), newStudentEntity.getBoardEntity().getBoardName());
    }

    @Override
    public List<StudentDataModel> DeleteStudent(int id)
    {
        //Set active to false for student to delete
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
    public List<StudentDataModel> GetAllStudents(boolean fetchActive)
    {
        List<StudentEntity> studentEntityList = studentRepo.findAll();
        if(fetchActive)
        {
            studentEntityList = studentEntityList.stream().filter(StudentEntity::isActive).collect(Collectors.toList());;
        }

        return StudentMapper.EntityListDataList(studentEntityList);
    }

    @Override
    public StudentEntity GetStudent(int id){
        Optional<StudentEntity> studentModel = studentRepo.findById(id);
        return studentModel.orElse(null);
    }

    public List<FeesAuditDataModel> GetFeesAudit(Date date)
    {
        List<FeesAuditDataModel> feesDataModelList = new ArrayList<>();

        List<StudentDataModel> studentEntityList = GetAllStudents(false);

        studentEntityList.forEach(stu -> {
            FeesAuditEntity feesAuditEntity = feesAuditService.GetFeesAudit(date, stu.getId());

            if(feesAuditEntity != null)
                feesDataModelList.add(FeesAuditMapper.EntityToData(feesAuditEntity, stu));
        });

        return feesDataModelList;
    }

    public void SaveFeesAudit(FeesAuditDataModel feesDataModel)
    {
        Optional<StudentEntity> studentEntity = studentRepo.findById(feesDataModel.getStudentId());

        if(studentEntity.isPresent())
        {
            List<SessionEntity> sessionList = studentEntity.get().getSessionList();
            double actualFees = sessionList.stream().map(SessionEntity::getFees).mapToDouble(m->m).sum();
            List<String> subjectList = new ArrayList<>();
            sessionList.forEach(e->subjectList.add(e.getSubjectEntity().getSubject()));
            feesAuditService.SaveChanges(studentEntity.get().isActive(), FeesAuditMapper.DataToEntity(feesDataModel, studentEntity.get()), String.join(",",subjectList),actualFees);
        }
    }

    public void AddTest(TestDataModel testDataModel)
    {
        testService.AddTest(testDataModel, studentRepo.findById(testDataModel.getStudentId()).get());
    }
}
