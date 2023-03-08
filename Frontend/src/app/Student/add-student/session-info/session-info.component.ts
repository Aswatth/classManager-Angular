import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { StudentModel } from '../../student.model';
import { StudentService } from '../../student.service';
import { AddStudentService } from '../add-student.service';
import { SessionModel } from './session.model';

@Component({
  selector: 'app-session-info',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.css']
})
export class SessionInfoComponent implements OnInit, OnDestroy{
  
  constructor(
    private router: Router, 
    private addStudentService: AddStudentService,
    private studentService: StudentService,
    private messageService: MessageService){}

  subjectList: string[] = [];
  dayList: string[] = [];

  sessionForm!: FormGroup;
  sessionList: SessionModel[] = [];

  @Input() existingStudentData!: StudentModel;
  hasUpdates: boolean = false;

  ngOnInit(){
    this.subjectList = this.studentService.subjectList;
    this.dayList = this.studentService.dayList;

    this.sessionForm = new FormGroup<{
      subject: FormControl<string | null>,
      days: FormControl<string[] | null>,
      startTime: FormControl<Date | null>,
      endTime: FormControl<Date | null>,
      fees: FormControl<number | null>
    }>({
        subject: new FormControl(null,Validators.required),
        days: new FormControl(null,Validators.required),
        startTime: new FormControl(null,Validators.required),
        endTime: new FormControl(null,Validators.required),
        fees: new FormControl(null,Validators.required),
      });

    if(this.addStudentService.sessionList)
      if(this.addStudentService.sessionList.length > 0){
        this.sessionList = this.addStudentService.sessionList;
    }

    if(this.existingStudentData){
      this.sessionList = this.existingStudentData.sessionList;
    }
  }

  OnAdd(){
    let sessionModel:SessionModel = this.sessionForm.getRawValue();
    let subject = this.sessionForm.controls['subject'].value;

    if(!this.SessionExists(subject)){
      if(this.existingStudentData)
        sessionModel.studentId = this.existingStudentData.id!;
      this.sessionList.push(sessionModel);
      //this.sessionForm.reset();
      this.hasUpdates = true;
    }
    else{
      this.messageService.add({key:"session-add", severity: 'warn', detail: 'Updated existing '+ subject + ' info'});
      
      let existingSession!: SessionModel;
      
      this.sessionList.filter(function(e) {
        if(e.subject == subject){
          existingSession = e;
        }
      });

      let existingSessionIndex: number = this.sessionList.indexOf(existingSession);
      let sessionToStore: SessionModel = this.sessionForm.getRawValue();

      sessionToStore.id = existingSession.id;
      sessionToStore.studentId = existingSession.studentId;

      this.sessionList[existingSessionIndex] = sessionToStore;
      this.hasUpdates = true;
    }
  }
  
  SessionExists(subject: string) : boolean{
    let filteredData = this.sessionList.filter(function(e) {
      return e.subject == subject
    });
    return filteredData.length != 0;
  }

  DeleteSession(session: SessionModel){
    console.log("Deleted session:");
    console.log(session);
    let index = this.sessionList.indexOf(session);
    this.sessionList.splice(index, 1);
    this.hasUpdates = true;
  }

  SessionSelect(session: SessionModel){
    this.sessionForm.controls['subject'].setValue(session.subject);
    this.sessionForm.controls['days'].setValue(session.days);
    this.sessionForm.controls['startTime'].setValue(new Date(session.startTime));
    this.sessionForm.controls['endTime'].setValue(new Date(session.endTime));
    this.sessionForm.controls['fees'].setValue(session.fees);
  }

  MovePrev(){
    this.addStudentService.sessionList = this.sessionList;
    this.router.navigate(['student-popup/personal']);
  }

  MoveNext(){
    this.addStudentService.sessionList = this.sessionList;
    this.router.navigate(['student-popup/review_submit']);
  }

  OnSaveClick(){
    this.existingStudentData.sessionList = this.sessionList;
    console.log(this.sessionList);
    this.studentService.UpdateSession(this.existingStudentData.id! ,this.existingStudentData.sessionList);
  }

  ngOnDestroy(){
    
  }
}
