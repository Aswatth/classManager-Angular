import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { StudentModel } from '../student.model';
import { StudentService } from '../student.service';
import { SessionModel } from './session-info/session.model';

@Injectable({providedIn: 'root'})
export class AddStudentService{
    
    studentInfo = new StudentModel();
    sessionList!: SessionModel[];

    constructor(private studentService: StudentService){
    }

    AddStudent(){
        this.studentInfo.sessionList = this.sessionList;
        this.studentService.AddStudent(this.studentInfo);
    }
}