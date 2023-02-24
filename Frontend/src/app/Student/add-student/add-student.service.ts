import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StudentModel } from '../student.model';
import { StudentService } from '../student.service';
import { PersonalInfoModel } from './personal-info/personal-info.model';
import { SessionModel } from './session-info/session.model';

@Injectable({providedIn: 'root'})
export class AddStudentService implements OnInit, OnDestroy{

    personalInfo!: PersonalInfoModel;
    sessionList!: SessionModel[];
    
    //Personal info for Student addition
    S_submittedPersonalInfo = new BehaviorSubject<PersonalInfoModel>({} as PersonalInfoModel);
    personalInfoSubscription!: Subscription;

    S_submittedSessionList = new BehaviorSubject<SessionModel[]>([]);
    sessionListSubscription!: Subscription;

    constructor(private studentService: StudentService){
        console.log("Add student service init...");
        this.personalInfoSubscription = this.S_submittedPersonalInfo.subscribe(
            (personalInfo) => this.personalInfo = personalInfo
           );
        
        this.sessionListSubscription = this.S_submittedSessionList.subscribe(
            (sessionList) => this.sessionList = sessionList
           );
    }

    ngOnInit(): void {
        
    }

    AddStudent(){

        let newStudent: StudentModel = new StudentModel();

        console.log("New student data");
        newStudent.AssignStudentInfo(this.personalInfo, this.sessionList);

        console.log(newStudent);

        this.studentService.AddStudent(newStudent);

        this.S_submittedPersonalInfo.next(new PersonalInfoModel());
        this.S_submittedSessionList.next([]);
    }

    ngOnDestroy(): void {
        this.personalInfoSubscription.unsubscribe();
        this.sessionListSubscription.unsubscribe();
    }
}