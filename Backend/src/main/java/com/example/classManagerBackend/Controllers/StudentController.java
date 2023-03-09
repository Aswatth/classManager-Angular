package com.example.classManagerBackend.Controllers;

import com.example.classManagerBackend.Models.SessionModel;
import com.example.classManagerBackend.Models.StudentModel;
import com.example.classManagerBackend.Services.SessionService;
import com.example.classManagerBackend.Services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class StudentController
{
    @Autowired
    StudentService studentService;

    @Autowired
    SessionService sessionService;

    @PostMapping("/student")
    void AddStudent(@RequestBody StudentModel studentModel){
        studentService.AddStudent(studentModel);
    }

    @PutMapping("/students/{id}")
    void UpdateStudent(@PathVariable int id, @RequestBody StudentModel newStudentModel){
        studentService.UpdateStudent(id, newStudentModel);
    }

    @PutMapping("/students/{id}/session")
    void UpdateSession(@PathVariable int id, @RequestBody List<SessionModel> sessionModelList){
        sessionService.UpdateSession(id, sessionModelList);
    }

    @DeleteMapping("/students/{id}")
    void DeleteStudent(@PathVariable int id ){
        studentService.DeleteStudent(id);
    }

    @GetMapping("/students")
    ResponseEntity<List<StudentModel>> GetAllStudent(){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.GetAllStudents());
    }

    @GetMapping("/students/{id}")
    StudentModel GetStudent(@PathVariable int id){
        return studentService.GetStudent(id);
    }
}
