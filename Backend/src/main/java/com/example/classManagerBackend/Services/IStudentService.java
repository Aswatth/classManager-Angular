package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.StudentModel;

import java.util.List;

public interface IStudentService
{
    public List<StudentModel> AddStudent(StudentModel studentModel);
    public void UpdateStudent(int id, StudentModel newStudentModel);
    public List<StudentModel> DeleteStudent(int id);
    public List<StudentModel> GetAllStudents();
    public StudentModel GetStudent(int id);
}
