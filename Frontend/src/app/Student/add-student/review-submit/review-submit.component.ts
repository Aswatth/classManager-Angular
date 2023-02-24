import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from '../../student.service';
import { AddStudentService } from '../add-student.service';
import { PersonalInfoModel } from '../personal-info/personal-info.model';
import { SessionModel } from '../session-info/session.model';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css']
})
export class ReviewSubmitComponent implements OnInit, OnDestroy{

  personalInfoModel: PersonalInfoModel = new PersonalInfoModel();
  personalInfoSubscription!: Subscription;

  sessionModelList: SessionModel[] = [];
  sessionListSubscription!: Subscription;

  constructor(private router:Router, private addStudentService: AddStudentService){}

  ngOnInit(){
    this.personalInfoSubscription = this.addStudentService.S_submittedPersonalInfo.subscribe(
      (personalInfo) => {
        this.personalInfoModel = personalInfo;
      }
    );

    this.sessionListSubscription = this.addStudentService.S_submittedSessionList.subscribe(
      (sessionList) => {
        this.sessionModelList = sessionList;
      }
    );
  }

  MovePrev(){
    this.router.navigate(['addStudent/session'])
  }

  OnSubmit(){
    this.addStudentService.AddStudent();
  }

  ngOnDestroy(){
    this.personalInfoSubscription.unsubscribe();
    this.sessionListSubscription.unsubscribe();
  }
}
