package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.StudentModel;

import java.util.List;

public interface IStudentService
{
    void AddStudent(StudentModel studentModel);
    void UpdateStudent(int id, StudentModel newStudentModel);
    void DeleteStudent(int id);
    List<StudentModel> GetAllStudents();
    StudentModel GetStudent(int id);
}
