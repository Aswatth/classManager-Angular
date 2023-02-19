import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { PersonalInfoModel } from "./add-student/personal-info/personal-info.model";
import { StudentModel } from "./student.model";

@Injectable({providedIn: 'root'})
export class StudentService{

    hasUpdates = false;

    constructor(private http: HttpClient){}

    GetStudent(id: number){
        return this.http.get<StudentModel>('http://localhost:9999/students/'+id);
    }

    GetAll(){
        this.hasUpdates = false;
        return this.http.get<StudentModel[]>('http://localhost:9999/students');
    }

    AddStudent(personalInfo: PersonalInfoModel){
        this.http.post<PersonalInfoModel>('http://localhost:9999/student', personalInfo).subscribe();
        this.hasUpdates = true;
    }

    UpdateStudent(id: number, newStudentModel: StudentModel){
        this.http.put<PersonalInfoModel>('http://localhost:9999/students/'+id, newStudentModel).subscribe();
    }

    DeleteStudent(id: number){
        this.http.delete("http://localhost:9999/students/"+ id).subscribe();
        this.hasUpdates = true;
    }
}