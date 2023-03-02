import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
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
  }

  OnAdd(){
    let sessionModel = this.sessionForm.getRawValue();
    let subject = this.sessionForm.controls['subject'].value;

    if(!this.SessionExists(subject)){
      this.sessionList.push(sessionModel);
      //this.sessionForm.reset();
    }else{
      this.messageService.add({key:"session-add", severity: 'warn', detail: subject + '\'s already exists'});
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
  }

  MovePrev(){
    this.router.navigate(['student-popup/personal']);
  }

  MoveNext(){
    this.addStudentService.sessionList = this.sessionList;
    this.router.navigate(['student-popup/review_submit']);
  }

  ngOnDestroy(){
    //this.sessionSubcription.unsubscribe();
  }
}
