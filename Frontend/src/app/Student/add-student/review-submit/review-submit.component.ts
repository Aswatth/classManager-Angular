import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentModel } from '../../student.model';
import { StudentService } from '../../student.service';
import { AddStudentService } from '../add-student.service';
import { SessionModel } from '../session-info/session.model';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css']
})
export class ReviewSubmitComponent{

  sessionList!: SessionModel[];
  studentInfo!: StudentModel;

  constructor(
    private router:Router, 
    private addStudentService: AddStudentService
    ){}

  ngOnInit(){
    this.studentInfo = this.addStudentService.studentInfo!;
    this.sessionList = this.addStudentService.sessionList!;
  }

  MovePrev(){
    this.router.navigate(['student-popup/session'])
  }

  OnSubmit(){
    this.addStudentService.AddStudent();
  }
}
