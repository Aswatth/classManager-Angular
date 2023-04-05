package com.example.classManagerBackend.Controllers;

import com.example.classManagerBackend.Services.ExportImportService;
import com.example.classManagerBackend.View.ExportData.ExportData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ExportController
{
    @Autowired
    ExportImportService exportService;

    @GetMapping("/export")
    public ExportData ExportStudents()
    {
        return exportService.Export();
    }

    @PostMapping("/import")
    public void ImportData(@RequestBody ExportData exportData)
    {
        exportService.ImportData(exportData);
    }


}
