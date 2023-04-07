import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentModel } from 'src/app/Models/student.model';
import { StudentService } from 'src/app/Services/student.service';
import { AddStudentService } from 'src/app/Services/add-student.service';

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
  @Output() onStudentUpdate = new EventEmitter<StudentModel>();

  constructor(private router: Router,
    private addStudentService: AddStudentService,
    private studentService: StudentService) { }

  ngOnInit(){
    //console.log("Personal info init");
    
    this.personalInfoForm = new FormGroup(
      {
        'studentName': new FormControl(null, Validators.required),
        'dateOfBirth': new FormControl(null, Validators.required),
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
    if(this.addStudentService.studentInfo && this.addStudentService.studentInfo!.studentName){
      this.personalInfoForm.setValue(this.addStudentService.studentInfo);
    }

    if(this.existingStudentData){
      this.SetFormValue(this.existingStudentData);
    }    
  }


  SetFormValue(existingStudentData: StudentModel){
    this.personalInfoForm.controls['studentName'].setValue(existingStudentData.studentName);
    this.personalInfoForm.controls['dateOfBirth'].setValue(new Date(existingStudentData.dateOfBirth));
    this.personalInfoForm.controls['schoolName'].setValue(existingStudentData.schoolName);
    this.personalInfoForm.controls['className'].setValue(existingStudentData.className);
    this.personalInfoForm.controls['boardName'].setValue(existingStudentData.boardName);
    this.personalInfoForm.controls['location'].setValue(existingStudentData.location);
    this.personalInfoForm.controls['studentPhNum'].setValue(existingStudentData.studentPhNum);
    this.personalInfoForm.controls['parentPhNum1'].setValue(existingStudentData.parentPhNum1);
    this.personalInfoForm.controls['parentPhNum2'].setValue(existingStudentData.parentPhNum2);
    //console.log("form value");
    //console.log(existingStudentData);
    //console.log(this.personalInfoForm.getRawValue());
    
    
    
  }

  OnSaveClick(){
    let id = this.existingStudentData.id;
    let sessionList = this.existingStudentData.sessionList;

    this.existingStudentData = this.personalInfoForm.getRawValue();

    this.existingStudentData.id = id;
    this.existingStudentData.sessionList = sessionList;

    //console.log("Existing student data");    
    //console.log(this.existingStudentData);

    this.studentService.UpdateStudent(this.existingStudentData);
    this.onStudentUpdate.emit(this.existingStudentData);
  }

  OnNextClick(){
    this.addStudentService.studentInfo = this.personalInfoForm.getRawValue();
    this.router.navigate(['student-popup/session']);
  }

  ngOnDestroy(): void {
    //console.log("destroying popup");
  }
}
