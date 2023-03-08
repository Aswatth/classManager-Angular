package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionModel;
import com.example.classManagerBackend.Models.StudentModel;
import com.example.classManagerBackend.Repos.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

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
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<StudentModel> AddStudent(StudentModel studentModel){

        List<SessionModel> sessionModelList = studentModel.getsessionList();
        studentModel.setsessionList(null);

        int addedStudentId = studentRepo.save((studentModel)).getId();

        sessionService.AddSessions(sessionModelList, addedStudentId);

        return GetAllStudents();
    }

    @Override
    public void UpdateStudent(int id, StudentModel newStudentModel){

        studentRepo.save(newStudentModel);

        //Delete session info
       /* List<String> existingSubjectList = studentRepo.findById(id).get().getsessionList().stream().map(SessionModel::getSubject).collect(Collectors.toList());

        List<SessionModel> sessionModelList = newStudentModel.getsessionList();
        List<String>  sessionSubjectList = sessionModelList.stream().map(SessionModel::getSubject).collect(Collectors.toList());

        if(existingSubjectList.size() > sessionSubjectList.size())
        {
            for (String s : existingSubjectList)
            {
                if (!sessionSubjectList.contains(s))
                {
                    sessionService.DeleteSessionBySubject(s, id);
                }
            }
        }
        else
        {
            //Update student and session info
            sessionService.AddSessions(sessionModelList, id);
        }*/
    }

    @Override
    public List<StudentModel> DeleteStudent(int id)
    {
        List<SessionModel> sessionModelList = studentRepo.findById(id).get().getsessionList();


        for (int i = 0; i < (long) sessionModelList.size(); ++i)
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
