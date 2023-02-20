package com.example.classManagerBackend.Controllers;

import com.example.classManagerBackend.Models.StudentModel;
import com.example.classManagerBackend.Services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class StudentController
{
    @Autowired
    StudentService studentService;

    @PostMapping("/student")
    ResponseEntity<List<StudentModel>> AddStudent(@RequestBody StudentModel studentModel){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.AddStudent(studentModel));
    }

    @PutMapping("/students/{id}")
    void UpdateStudent(@PathVariable int id, @RequestBody StudentModel newStudentModel){
        studentService.UpdateStudent(id, newStudentModel);
    }

    @DeleteMapping("/students/{id}")
    ResponseEntity<List<StudentModel>> DeleteStudent(@PathVariable int id ){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.DeleteStudent(id));
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
