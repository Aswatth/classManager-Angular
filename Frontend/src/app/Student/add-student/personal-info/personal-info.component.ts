import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentModel } from '../../student.model';
import { StudentService } from '../../student.service';
import { AddStudentService } from '../add-student.service';
//import { PersonalInfoModel } from './personal-info.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit, OnDestroy{

  personalInfoForm!: FormGroup;

  boardList: string[] = [];
  classList: string[] = [];

  @Input() existingStudentData!: StudentModel;

  constructor(private router: Router,
    private addStudentService: AddStudentService,
    private studentService: StudentService) { }

  ngOnInit(){
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

    this.boardList = this.studentService.boardList;
    this.classList = this.studentService.classList;

    //If already exists display the previous data
    if(this.addStudentService.studentInfo.studentName){
      this.personalInfoForm.setValue(this.addStudentService.studentInfo);
    }

    if(this.existingStudentData){
      this.SetFormValue();
    }    
  }

  SetFormValue(){
    this.personalInfoForm.controls['studentName'].setValue(this.existingStudentData.studentName);
    this.personalInfoForm.controls['schoolName'].setValue(this.existingStudentData.schoolName);
    this.personalInfoForm.controls['className'].setValue(this.existingStudentData.className);
    this.personalInfoForm.controls['boardName'].setValue(this.existingStudentData.boardName);
    this.personalInfoForm.controls['location'].setValue(this.existingStudentData.location);
    this.personalInfoForm.controls['studentPhNum'].setValue(this.existingStudentData.studentPhNum);
    this.personalInfoForm.controls['parentPhNum1'].setValue(this.existingStudentData.parentPhNum1);
    this.personalInfoForm.controls['parentPhNum2'].setValue(this.existingStudentData.parentPhNum2);
  }

  OnSaveClick(){
    let id = this.existingStudentData.id;
    let sessionList = this.existingStudentData.sessionList;

    this.existingStudentData = this.personalInfoForm.getRawValue();

    this.existingStudentData.id = id;
    this.existingStudentData.sessionList = sessionList;

    console.log(this.existingStudentData);
    this.studentService.UpdateStudent(this.existingStudentData)

    this.existingStudentData = undefined as unknown as StudentModel;
  }

  OnNextClick(){
    this.addStudentService.studentInfo = this.personalInfoForm.getRawValue();
    this.router.navigate(['student-popup/session']);
  }

  ngOnDestroy(): void {
    console.log("destroying popup");
  }
}
