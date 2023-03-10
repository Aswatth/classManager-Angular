import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StudentModel } from 'src/app/Models/student.model';
import { StudentService } from 'src/app/Services/student.service';
import { AddStudentService } from 'src/app/Services/add-student.service';
import { SessionModel } from 'src/app/Models/session.model';

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
    console.log("session list");
    console.log(this.sessionList);    
    
    let sessionModel:SessionModel = this.sessionForm.getRawValue();

    if(!this.SessionExists(sessionModel.subject)){
      if(this.existingStudentData)
        sessionModel.studentId = this.existingStudentData.id!;
      this.sessionList.push(sessionModel);
      //this.sessionForm.reset();
      this.hasUpdates = true;
    }
    else{
      this.messageService.add({key:"session-add", severity: 'warn', detail: 'Updated existing '+ sessionModel.subject + ' info'});
      
      this.sessionList.filter((e) => {
        if(e.subject == sessionModel.subject){
          let existingSessionIndex: number = this.sessionList.indexOf(e);
          sessionModel.id = this.sessionList[existingSessionIndex].id;
          sessionModel.studentId = this.sessionList[existingSessionIndex].studentId;

          this.sessionList[existingSessionIndex] = sessionModel;
          this.hasUpdates = true;
        }
      });
    }
  }
  
  SessionExists(subject: string) : boolean{
    if(this.sessionList.some(e => Object.values(e).includes(subject)))
      return true;
    return false;
    //return filteredData.length != 0;
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
    this.studentService.UpdateSession(this.existingStudentData.id! ,this.existingStudentData.sessionList).subscribe(
      data => {
        this.sessionList = data;
      }
    );
  }

  ngOnDestroy(){
    
  }
}
