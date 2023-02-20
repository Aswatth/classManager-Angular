package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.StudentModel;
import com.example.classManagerBackend.Repos.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements IStudentService
{
    @Autowired
    StudentRepo studentRepo;

    @Override
    public List<StudentModel> AddStudent(StudentModel studentModel){
        studentRepo.save((studentModel));
        return GetAllStudents();
    }

    @Override
    public void UpdateStudent(int id, StudentModel newStudentModel){
        studentRepo.save(newStudentModel);
    }

    @Override
    public List<StudentModel> DeleteStudent(int id)
    {
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
