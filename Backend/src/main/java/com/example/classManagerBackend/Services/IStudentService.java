package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.StudentModel;

import java.util.List;

public interface IStudentService
{
    List<StudentModel> AddStudent(StudentModel studentModel);
    void UpdateStudent(int id, StudentModel newStudentModel);
    List<StudentModel> DeleteStudent(int id);
    List<StudentModel> GetAllStudents();
    StudentModel GetStudent(int id);
}
