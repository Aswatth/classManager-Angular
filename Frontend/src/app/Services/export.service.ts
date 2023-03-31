import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";

import * as XLSX from 'xlsx';
import { BoardSheetData, ClassSheetData, ExportModel, FeesSheetData, SessionSheetData, StudentSheetData, SubjectSheetData, TestSheetData } from "../Models/export.model";
import { FeesModel } from "../Models/fees.model";
import { StudentModel } from "../Models/student.model";
import { TestModel } from "../Models/test.model";
import { StudentService } from "./student.service";

@Injectable({
    providedIn: 'root'
})
export class ExportService implements OnInit, OnDestroy{

    constructor(private http: HttpClient, private studentService: StudentService){}

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

                //Update session info's time format
                exportData.sessionExportDataList.forEach(ses=>{
                    ses.startTime = new Date(ses.startTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });                    
                    ses.endTime = new Date(ses.endTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                });

                //Update fees's date format
                exportData.feesExportDataList.forEach(f=>{
                    f.feesDate = new Date(f.feesDate).toLocaleString('default', {month: 'short', year: 'numeric'});
                    f.paidOn = f.paidOn != null?new Date(f.paidOn).toLocaleString('default', {day: '2-digit', month: 'short', year: 'numeric'}):"";
                });

                //Update test data format
                exportData.testExportDataList.forEach(t=>{
                    t.testDate = new Date(t.testDate).toLocaleString('default', {day: '2-digit', month: 'short', year: 'numeric'})
                });

                //Class sheet data
                let classList: ClassSheetData[] = [];
                exportData.classList.forEach(c=>{
                    let classData: ClassSheetData = new ClassSheetData();
                    classData.Classes = c;
                    classList.push(classData);
                });

                //Board sheet data
                let boardList: BoardSheetData[] = [];
                exportData.boardList.forEach(b=>{
                    let boardData: BoardSheetData = new BoardSheetData();
                    boardData.Boards = b;
                    boardList.push(boardData);
                });

                //Class sheet data
                let subjectList: SubjectSheetData[] = [];
                exportData.subjectList.forEach(s=>{
                    let subject: SubjectSheetData = new SubjectSheetData();
                    subject.Subjects = s;
                    subjectList.push(subject);
                });

                //Export
                const studentWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData.studentExportDataList);
                const sessionWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData.sessionExportDataList);
                const feesWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData.feesExportDataList);
                const testWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData.testExportDataList);
                const classWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(classList);
                const boardWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(boardList);
                const subjectWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(subjectList);

                const workbook: XLSX.WorkBook = { 
                    Sheets: { 
                        'StudentData': studentWorksheet,
                        'SessionData': sessionWorksheet,
                        'FeesData': feesWorksheet,
                        'TestData': testWorksheet,
                        'ClassData': classWorksheet,
                        'BoardData': boardWorksheet,
                        'SubjectData': subjectWorksheet
                    }, 
                    SheetNames: ['StudentData','SessionData','FeesData','TestData','ClassData','BoardData','SubjectData'] 
                };

                XLSX.writeFile(workbook,fileName);
            }
        });
    }

    ConvertTimeToDate(time: string) : Date
    {
        console.log("TIME: "+time);
        
        let date: Date = new Date();
        let hours = +time.split(" ")[0].split(":")[0];
        let minutes = +time.split(" ")[0].split(":")[1];

        if(time.split(" ")[1] == "PM")
            hours += 12;

        date.setHours(hours)
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);
        
        return date;
    }

    ImportData(file: any)
    {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.onload = (e)=>{
            let workbook = XLSX.read(fileReader.result,{type: 'binary'});
            let sheetNames = workbook.SheetNames.values;
            let studentSheetDataList: StudentSheetData[] = XLSX.utils.sheet_to_json(workbook.Sheets['StudentData']) as StudentSheetData[];
            let sessionSheetDataList: SessionSheetData[] = XLSX.utils.sheet_to_json(workbook.Sheets['SessionData']) as SessionSheetData[];
            let feesSheetDataList: FeesSheetData[] = XLSX.utils.sheet_to_json(workbook.Sheets['FeesData']) as FeesSheetData[];
            let testSheetDataList: TestSheetData[] = XLSX.utils.sheet_to_json(workbook.Sheets['TestData']) as TestSheetData[];
            let classSheetDataList: ClassSheetData[] = XLSX.utils.sheet_to_json(workbook.Sheets['ClassData']) as ClassSheetData[];
            let boardSheetDataList: BoardSheetData[] = XLSX.utils.sheet_to_json(workbook.Sheets['BoardData']) as BoardSheetData[];
            let subjectSheetDataList: SubjectSheetData[] = XLSX.utils.sheet_to_json(workbook.Sheets['SubjectData']) as SubjectSheetData[];

            console.log(studentSheetDataList);            

            let exportData = new ExportModel();
            exportData.studentExportDataList = studentSheetDataList;
            
            exportData.sessionExportDataList = sessionSheetDataList;
            exportData.sessionExportDataList.forEach(f=>{
                f.startTime = this.ConvertTimeToDate(f.startTime as string);
                f.endTime = this.ConvertTimeToDate(f.endTime as string);
            });

            exportData.feesExportDataList = feesSheetDataList;
            exportData.feesExportDataList.forEach(f=>{
                let month = (f.feesDate as string).split(" ")[0];
                let year = (f.feesDate as string).split(" ")[1];
                let monthIndex = new Date(`2000 ${month} 01`).getMonth();
                
                f.feesDate = new Date(+year, monthIndex);
                
                f.paidOn = f.paidOn != null? new Date(f.paidOn) : null;
            });

            exportData.testExportDataList = testSheetDataList;
            exportData.testExportDataList.forEach(f=>{
                f.testDate = new Date(f.testDate);
            });

            exportData.classList = classSheetDataList.map(m=>m.Classes);
            for (let i = 0; i < exportData.classList.length; i++) {
                exportData.classList[i] = exportData.classList[i].toUpperCase();                
            }

            exportData.boardList = boardSheetDataList.map(m=>m.Boards);
            for (let i = 0; i < exportData.boardList.length; i++) {
                exportData.boardList[i] = exportData.boardList[i].toUpperCase();                
            }

            exportData.subjectList = subjectSheetDataList.map(m=>m.Subjects);
            for (let i = 0; i < exportData.subjectList.length; i++) {
                exportData.subjectList[i] = exportData.subjectList[i].charAt(0).toUpperCase() + exportData.subjectList[i].slice(1);
            }

            this.http.post("http://localhost:9999/import",exportData).subscribe({
                next: () => {
                    this.studentService.GetCbsData();
                    this.studentService.GetAllStudent();
                }
            });
        };
    }
}