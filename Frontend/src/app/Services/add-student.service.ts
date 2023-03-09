import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { StudentModel } from '../Models/student.model';
import { StudentService } from './student.service';
import { SessionModel } from '../Models/session.model';

@Injectable({providedIn: 'root'})
export class AddStudentService{
    
    studentInfo?: StudentModel = new StudentModel();
    sessionList!: SessionModel[];

    constructor(private studentService: StudentService){
    }

    AddStudent(){
        this.studentInfo!.sessionList = this.sessionList;
        this.studentService.AddStudent(this.studentInfo!);
        this.studentInfo = undefined;
    }
}