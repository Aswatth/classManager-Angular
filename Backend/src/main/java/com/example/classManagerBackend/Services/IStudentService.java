package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.StudentEntity;

import java.util.List;

public interface IStudentService
{
    public List<StudentEntity> AddStudent(StudentEntity studentEntity);
    public void UpdateStudent(int id, StudentEntity newStudentEntity);
    public List<StudentEntity> DeleteStudent(int id);
    public List<StudentEntity> GetAllStudents();
    public StudentEntity GetStudent(int id);
}
