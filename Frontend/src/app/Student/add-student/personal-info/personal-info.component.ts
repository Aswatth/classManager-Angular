import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from '../../student.service';
import { AddStudentService } from '../add-student.service';
import { PersonalInfoModel } from './personal-info.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit, OnDestroy{

  @Input() displayNextButton = true;
  @Input() canEdit = true;
  @Input() personalInfoModel!: PersonalInfoModel;

  personalInfoForm!: FormGroup;

  boardList: string[] = [];
  classList: string[] = [];
  
  personalInfoSubcription!: Subscription;

  constructor(private router: Router,
    private addStudentService: AddStudentService,
    private studentService: StudentService) { }

  ngOnInit(){
    console.log(this.personalInfoModel);
  this.personalInfoSubcription = this.addStudentService.S_submittedPersonalInfo.subscribe(
    (personalInfo) => {
      if(!this.personalInfoModel.studentName)
        this.personalInfoModel = personalInfo
    }
  );

    this.personalInfoForm = new FormGroup(
      {
        'studentName': new FormControl(null, Validators.required),
        'schoolName': new FormControl(null, Validators.required),
        'className': new FormControl(null, Validators.required),
        'boardName': new FormControl(null, Validators.required),
        'location': new FormControl(null, Validators.required),
        'studentPhNum': new FormControl(null),
        'parentPhNum1': new FormControl(null, Validators.required),
        'parentPhNum2': new FormControl(null),
      }
    );

    // this.personalInfoModel.studentName = 'Ash';
    // this.personalInfoModel.location = 'Chennai';
    // this.personalInfoModel.schoolName = 'SVVV';
    // this.personalInfoModel.className = 'X';
    // this.personalInfoModel.boardName = 'CBSE';
    // this.personalInfoModel.studentPhNum = '123';
    // this.personalInfoModel.parentPhNum1 = '456';
    // this.personalInfoModel.parentPhNum2 = null;

    this.boardList = this.studentService.boardList;
    this.classList = this.studentService.classList;

    if(this.personalInfoModel.studentName)
      this.personalInfoForm.setValue(this.personalInfoModel);
  }

  OnNextClick(){
    this.addStudentService.S_submittedPersonalInfo.next(this.personalInfoForm.getRawValue());

    this.router.navigate(['addStudent/session']);
  }

  ngOnDestroy(){
    this.personalInfoSubcription.unsubscribe();
  }
}
