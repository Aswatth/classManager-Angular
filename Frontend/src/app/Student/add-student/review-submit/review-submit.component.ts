import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AddStudentService } from '../add-student.service';
import { PersonalInfoModel } from '../personal-info/personal-info.model';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css']
})
export class ReviewSubmitComponent implements OnInit{

  personalInfoModel!: PersonalInfoModel;

  constructor(private addStudentService: AddStudentService, private http:HttpClient){}

  ngOnInit(){
    this.personalInfoModel = this.addStudentService.personalInfo;
  }

  OnSubmit(){
    this.addStudentService.AddStudent();
  }
}
