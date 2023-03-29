import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";

import * as XLSX from 'xlsx';
import { BoardSheetData, ClassSheetData, ExportModel, FeesSheetData, StudentSheetData, SubjectSheetData, TestSheetData } from "../Models/export.model";
import { FeesModel } from "../Models/fees.model";
import { StudentModel } from "../Models/student.model";
import { TestModel } from "../Models/test.model";

@Injectable({
    providedIn: 'root'
})
export class ExportService implements OnInit, OnDestroy{

    constructor(private http: HttpClient){}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    ExportData()
    {
        let fileName = 'ClassManager-Export.xlsx';

        this.http.get<ExportModel>("http://localhost:9999/export").subscribe({
            next: (data) => {
                let exportData: ExportModel = data;

                console.log("Export data");
                console.log(exportData);

                //Student sheet -> student and session info
                let studentModelList: StudentModel[] = exportData.studentModelList;
                let studentSheetDataList: StudentSheetData[] = [];
                studentModelList.forEach(s=>{
                    s.sessionList.forEach(ses=>{
                        let sheetData = new StudentSheetData();
                        sheetData.AddData(s, ses);
                        studentSheetDataList.push(sheetData);
                    });
                });

                //Fees sheet
                let feesModelList: FeesModel[] = exportData.feesModelList;
                let feesSheetDataList: FeesSheetData[] = [];
                feesModelList.forEach(f=>{
                    let feesSheetData = new FeesSheetData()
                    feesSheetData.AddData(f);
                    feesSheetDataList.push(feesSheetData);
                });

                //Test sheet
                let testDataList: TestModel[] = exportData.testModelList;
                let testSheetDataList: TestSheetData[] = [];
                testDataList.forEach(t=>{
                    let testSheetData = new TestSheetData();
                    testSheetData.Add(studentModelList.filter(f=>f.id == t.studentId).map(m=>m.studentName)[0],t);
                    testSheetDataList.push(testSheetData);
                });

                //Class sheet
                let classSheetDataList: ClassSheetData[] = [];
                exportData.classList.forEach(c=>{
                    let classSheetData = new ClassSheetData();
                    classSheetData.Add(c);
                    classSheetDataList.push(classSheetData);
                });

                //Board sheet
                let boardSheetDataList: BoardSheetData[] = [];
                exportData.boardList.forEach(b=>{
                    let boardSheetData = new BoardSheetData();
                    boardSheetData.Add(b);
                    boardSheetDataList.push(boardSheetData);
                });

                //Subject sheet
                let subjectSheetDataList: SubjectSheetData[] = [];
                exportData.subjectList.forEach(s=>{
                    let subjectSheetData = new SubjectSheetData();
                    subjectSheetData.Add(s);
                    subjectSheetDataList.push(subjectSheetData);
                });

                //Export
                const studentWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(studentSheetDataList);
                const feesWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(feesSheetDataList);
                const testWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(testSheetDataList);
                const classWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(classSheetDataList);
                const boardWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(boardSheetDataList);
                const subjectWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(subjectSheetDataList);

                const workbook: XLSX.WorkBook = { 
                    Sheets: { 
                        'StudentData': studentWorksheet,
                        'FeesData': feesWorksheet,
                        'TestData': testWorksheet,
                        'ClassData': classWorksheet,
                        'BoardData': boardWorksheet,
                        'SubjectData': subjectWorksheet
                    }, 
                    SheetNames: ['StudentData','FeesData','TestData','ClassData','BoardData','SubjectData'] 
                };

                XLSX.writeFile(workbook,fileName);
            }
        });
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