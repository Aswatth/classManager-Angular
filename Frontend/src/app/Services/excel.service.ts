import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import * as XLSX from 'xlsx';
import { StudentModel } from "../Models/student.model";
import { StudentService } from "./student.service";

@Injectable({
    providedIn: 'root'
})
export class ExcelService implements OnInit, OnDestroy{

    constructor(private http: HttpClient){}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    GetStudentData()
    {
        return this.http.get<any[]>("http://localhost:9999/export/students");
    }

    ExportData()
    {
        let fileName = 'StudentTemplate.xlsx';
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
        const workbook: XLSX.WorkBook = { Sheets: { 'StudentData': worksheet }, SheetNames: ['StudentData'] };
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        //this.saveAsExcelFile(excelBuffer, 'data');
        XLSX.writeFile(workbook,fileName);
    }

    DownloadStudentTemplate()
    {
        let student = new StudentModel();
        student.AddStudent("Aswatth", "SVVV", "CBSE", "I", "Chennai", "12345", undefined, undefined);

        // let json = {
        //     "Student Name": student.studentName,
        //     "School Name": student.schoolName,
        //     "Board Name": student.boardName,
        //     "Class Name": student.className,
        //     "Location": student.location,
        //     "Parent Ph Num 1": student.parentPhNum1,
        //     "Parent Ph Num 2": student.parentPhNum2,
        //     "Student Ph Num": student.studentPhNum
        // };

        let fileName = 'StudentTemplate.xlsx';
        console.log("Downloading student template");
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([student]);
        const workbook: XLSX.WorkBook = { Sheets: { 'StudentData': worksheet }, SheetNames: ['StudentData'] };
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        //this.saveAsExcelFile(excelBuffer, 'data');
        XLSX.writeFile(workbook,fileName);
    }

    ImportStudentTemplate(file: any)
    {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.onload = (e)=>{
            let workbook = XLSX.read(fileReader.result,{type: 'binary'});
            let sheetNames = workbook.SheetNames;
            let importedJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]) as StudentModel[];
            // this.studentService.AddStudent(importedJson[0]);
        };
    }

    DownloadTestTemplate()
    {
        console.log("Downloading Test template");
    }

    DownloadFeesTemplate()
    {
        console.log("Downloading fees template");
    }


}