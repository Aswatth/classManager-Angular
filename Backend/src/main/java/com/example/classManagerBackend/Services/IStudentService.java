package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.View.StudentDataModel;

import java.util.List;

public interface IStudentService
{
    public List<StudentDataModel> AddStudent(StudentDataModel studentDataModel);
    public StudentDataModel UpdateStudent(int id, StudentDataModel studentDataModel);
    public List<StudentDataModel> DeleteStudent(int id);
    public List<StudentDataModel> GetAllStudents(boolean fetchActive);
    public StudentEntity GetStudent(int id);
}
