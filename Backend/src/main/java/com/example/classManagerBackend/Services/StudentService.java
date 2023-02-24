package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionModel;
import com.example.classManagerBackend.Models.StudentModel;
import com.example.classManagerBackend.Repos.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements IStudentService
{
    @Autowired
    StudentRepo studentRepo;

    @Autowired
    SessionService sessionService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<StudentModel> AddStudent(StudentModel studentModel){
        /*jdbcTemplate.update("INSERT INTO Student(" +
                "student_name, school_name, class_name, board_name, location, student_ph_num, parent_ph_num1, parent_ph_num2) " +
                "VALUES(?,?,?,?,?,?,?,?)",
                studentModel.getStudentName(),
                studentModel.getSchoolName(),
                studentModel.getClassName(),
                studentModel.getBoardName(),
                studentModel.getLocation(),
                studentModel.getStudentPhNum(),
                studentModel.getParentPhNum1(),
                studentModel.getParentPhNum2()
                );*/
        List<SessionModel> sessionModelList = studentModel.getsessionList();
        studentModel.setsessionList(null);

        int addedStudentId = studentRepo.save((studentModel)).getId();

        sessionService.AddSessions(sessionModelList, addedStudentId);

        studentModel.setsessionList(sessionModelList);
        studentRepo.save(studentModel);

        return GetAllStudents();
    }

    @Override
    public void UpdateStudent(int id, StudentModel newStudentModel){
        studentRepo.save(newStudentModel);
    }

    @Override
    public List<StudentModel> DeleteStudent(int id)
    {
        List<SessionModel> sessionModelList = studentRepo.findById(id).get().getsessionList();

        for (int i=0; i < sessionModelList.stream().count(); ++i)
        {
            this.sessionService.DeleteSession(sessionModelList.get(i));
        }

        studentRepo.deleteById(id);
        return GetAllStudents();
    }

    @Override
    public List<StudentModel> GetAllStudents(){
        return studentRepo.findAll();
    }

    @Override
    public StudentModel GetStudent(int id){
        Optional<StudentModel> studentModel = studentRepo.findById(id);
        if(studentModel.isPresent())
            return studentModel.get();
        return null;
    }
}
