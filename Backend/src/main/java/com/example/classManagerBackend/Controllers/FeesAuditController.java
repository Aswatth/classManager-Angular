package com.example.classManagerBackend.Controllers;

import com.example.classManagerBackend.Models.FeesDataModel;
import com.example.classManagerBackend.Services.FeesAuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class FeesAuditController
{
    @Autowired
    FeesAuditService feesAuditService;

//    @GetMapping("/fees")
//    public List<FeesAuditModel> GetFeesAuditList(){
//        return feesAuditService.GetAll();
//    }
//
}