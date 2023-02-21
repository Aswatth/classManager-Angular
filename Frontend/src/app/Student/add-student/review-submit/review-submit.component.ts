import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from '../../student.service';
import { PersonalInfoModel } from '../personal-info/personal-info.model';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css']
})
export class ReviewSubmitComponent implements OnInit, OnDestroy{

  personalInfoModel: PersonalInfoModel = new PersonalInfoModel();
  personalInfoSubscription!: Subscription;

  constructor(private router:Router, private studentService: StudentService){}

  ngOnInit(){
    console.log("outside subscribe 1");
    this.personalInfoSubscription = this.studentService.S_submittedPersonalInfo.subscribe(
      (personalInfo) => {
        console.log("inside subs");
        this.personalInfoModel = personalInfo;
      }
    );
    console.log("outside subscribe 2");
  }

  MovePrev(){
    this.router.navigate(['addStudent/session'])
  }

  OnSubmit(){
    this.studentService.AddStudent(this.personalInfoModel);
  }

  ngOnDestroy(){
    console.log("Unsubscibing")
    this.personalInfoSubscription.unsubscribe();
  }
}
