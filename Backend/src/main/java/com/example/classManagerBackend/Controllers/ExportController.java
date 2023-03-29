package com.example.classManagerBackend.Controllers;

import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Services.ExportService;
import com.example.classManagerBackend.Services.StudentService;
import com.example.classManagerBackend.View.ExportData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ExportController
{
    @Autowired
    ExportService exportService;

    @GetMapping("/export")
    public ExportData ExportStudents()
    {
        return exportService.Export();
    }

}
