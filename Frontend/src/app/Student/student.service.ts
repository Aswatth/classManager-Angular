import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { PersonalInfoModel } from "./add-student/personal-info/personal-info.model";
import { StudentModel } from "./student.model";

@Injectable({providedIn: 'root'})
export class StudentService{

    boardList: string[] = ['CBSE', 'ICSE', 'STATE', 'IGCSE'];
    classList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'Other'];

    //Subjects
    //Personal info for Student addition
    S_submittedPersonalInfo = new BehaviorSubject<PersonalInfoModel>(new PersonalInfoModel());

    //flag for popup open/close
    S_isAddingStudent = new BehaviorSubject<boolean>(false);

    //Student datasource
    S_stundentList = new BehaviorSubject<StudentModel[]>([]);

    constructor(private http: HttpClient, private messageService: MessageService){
        console.log("Student service cons");
        this.GetAllStudent();
    }

    GetAllStudent(){
        this.http.get<StudentModel[]>('http://localhost:9999/students').subscribe(
            data => {
                console.log("Fetched all student data");
                console.log(data);
                this.S_stundentList.next(data);
            }
        );
    }

    GetStudent(id: number){
        return this.http.get<StudentModel>('http://localhost:9999/students/'+id);
    }

    AddStudent(personalInfo: PersonalInfoModel){
        this.http.post<StudentModel[]>('http://localhost:9999/student', personalInfo).subscribe(
            data => {
                this.messageService.add({severity: 'success', detail: 'Successfully added student'});
                this.S_isAddingStudent.next(false);
                this.S_stundentList.next(data)
            }
        );
    }

    UpdateStudent(id: number, newStudentModel: StudentModel){
        this.http.put<PersonalInfoModel>('http://localhost:9999/students/'+id, newStudentModel).subscribe();
    }

    DeleteStudent(id: number){
        this.http.delete<StudentModel[]>("http://localhost:9999/students/"+ id).subscribe(
            data => this.S_stundentList.next(data)
        );
    }
}