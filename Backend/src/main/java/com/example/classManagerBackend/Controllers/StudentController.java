package com.example.classManagerBackend.Controllers;

import com.example.classManagerBackend.Models.FeesDataModel;
import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Services.SessionService;
import com.example.classManagerBackend.Services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.logging.SimpleFormatter;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class StudentController
{
    @Autowired
    StudentService studentService;

    @Autowired
    SessionService sessionService;

    @PostMapping("/student")
    void AddStudent(@RequestBody StudentEntity studentEntity){
        studentService.AddStudent(studentEntity);
    }

    @PutMapping("/students/{id}")
    void UpdateStudent(@PathVariable int id, @RequestBody StudentEntity newStudentEntity){
        studentService.UpdateStudent(id, newStudentEntity);
    }

    @PutMapping("/students/{id}/session")
    void UpdateSession(@PathVariable int id, @RequestBody List<SessionEntity> sessionEntityList){
        sessionService.UpdateSession(id, sessionEntityList);
    }

    @DeleteMapping("/students/{id}")
    void DeleteStudent(@PathVariable int id ){
        studentService.DeleteStudent(id);
    }

    @GetMapping("/students")
    ResponseEntity<List<StudentEntity>> GetAllStudent(){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.GetAllStudents());
    }

    @PostMapping("/fees")
    ResponseEntity<List<FeesDataModel>> GetAllFeesAudits(@RequestBody String date){

        Date d = new Date();

        try
        {
            d = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        }
        catch (ParseException e)
        {
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.OK).body(studentService.GetFeesAudit(d));
    }

    @PutMapping("/fees")
    public void GetFeesAuditList(@RequestBody FeesDataModel feesAuditModel){
        studentService.SaveFeesAudit(feesAuditModel);
    }

    @GetMapping("/students/{id}")
    StudentEntity GetStudent(@PathVariable int id){
        return studentService.GetStudent(id);
    }
}
