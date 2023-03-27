package com.example.classManagerBackend.Controllers;

import com.example.classManagerBackend.Services.*;
import com.example.classManagerBackend.View.FeesDataModel;
import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.View.SessionDataModel;
import com.example.classManagerBackend.View.StudentDataModel;
import com.example.classManagerBackend.View.TestDataModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MainController
{
    @Autowired
    StudentService studentService;

    @Autowired
    SessionService sessionService;

    @Autowired
    FeesAuditService feesAuditService;

    @Autowired
    TestService testService;

    @PostMapping("/student")
    void AddStudent(@RequestBody StudentDataModel studentDataModel){
        studentService.AddStudent(studentDataModel);
    }

    @PutMapping("/students/{id}")
    StudentDataModel UpdateStudent(@PathVariable int id, @RequestBody StudentDataModel studentDataModel){
        return studentService.UpdateStudent(id, studentDataModel);
    }

    @PostMapping("/students/{id}/session")
    List<SessionDataModel> UpdateSession(@PathVariable int id, @RequestBody List<SessionDataModel> sessionDataModelList){
        return sessionService.UpdateSession(id, sessionDataModelList);
    }

    @DeleteMapping("/students/{id}")
    void DeleteStudent(@PathVariable int id ){
        studentService.DeleteStudent(id);
    }

    @GetMapping("/students")
    ResponseEntity<List<StudentDataModel>> GetAllStudent(){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.GetAllStudents(true));
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

    @GetMapping("/dates")
    public List<Date> GetDateList()
    {
        return feesAuditService.GetDateList();
    }

    @GetMapping("/students/{id}")
    StudentEntity GetStudent(@PathVariable int id){
        return studentService.GetStudent(id);
    }

    @GetMapping("/tests/{studentId}")
    List<TestDataModel> GetTests(@PathVariable int studentId)
    {
        return testService.GetTests(studentId);
    }

    @PutMapping("/test")
    void AddTest(@RequestBody TestDataModel testDataModel)
    {
        testService.AddTest(testDataModel);
    }

    @DeleteMapping("/test/{testId}")
    void DeleteTest(@PathVariable int testId)
    {
        testService.DeleteTest(testId);
    }
}
