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
  sessionSubcription!: Subscription;

  ngOnInit(){
    this.subjectList = this.studentService.subjectList;
    this.dayList = this.studentService.dayList;

    this.sessionSubcription = this.addStudentService.S_submittedSessionList.subscribe(
      (sessionList) => this.sessionList = sessionList
    );

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
  }

  OnAdd(){
    let sessionModel = this.sessionForm.getRawValue();
    // sessionModel.startTime = this.sessionForm.controls['startTime'].value.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    // sessionModel.endTime = this.sessionForm.controls['endTime'].value.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    let subject = this.sessionForm.controls['subject'].value;
    console.log(subject);

    if(!this.SessionExists(subject)){
      this.sessionList.push(sessionModel);
      console.log(this.sessionList);
      this.sessionForm.reset();
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
    this.router.navigate(['addStudent/personal']);
  }

  MoveNext(){
    this.addStudentService.S_submittedSessionList.next(this.sessionList);
    this.router.navigate(['addStudent/review_submit']);
  }

  ngOnDestroy(){
    this.sessionSubcription.unsubscribe();
  }
}
