import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../student.service';
import { PersonalInfoModel } from './personal-info.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  personalInfoForm!: FormGroup;

  boardList: string[] = [];
  classList: string[] = [];
  
  personalInfoModel!: PersonalInfoModel;

  constructor(private router: Router,private studentService: StudentService) { }

  ngOnInit(){
  console.log("Personal info init...");
  this.personalInfoModel = new PersonalInfoModel();
    this.personalInfoForm = new FormGroup(
      {
        'studentName': new FormControl(null, Validators.required),
        'schoolName': new FormControl(null, Validators.required),
        'className': new FormControl(null, Validators.required),
        'boardName': new FormControl(null, Validators.required),
        'location': new FormControl(null, Validators.required),
        'studentMobileNumber': new FormControl(null, Validators.required),
        'parentMobileNumber1': new FormControl(null, Validators.required),
        'parentMobileNumber2': new FormControl(null),
      }
    );

    this.personalInfoModel.studentName = 'Ash';
    this.personalInfoModel.location = 'Chennai';
    this.personalInfoModel.schoolName = 'SVVV';
    this.personalInfoModel.className = 'X';
    this.personalInfoModel.boardName = 'CBSE';
    this.personalInfoModel.studentMobileNumber = '123';
    this.personalInfoModel.parentMobileNumber1 = '456';
    this.personalInfoModel.parentMobileNumber2 = null;

    this.personalInfoForm.setValue(this.personalInfoModel);

    this.boardList = this.studentService.boardList;
    this.classList = this.studentService.classList;
  }

  OnNextClick(){
    console.log("Personal info");
    console.log(this.personalInfoForm.getRawValue());

    this.studentService.S_submittedPersonalInfo.next(this.personalInfoForm.getRawValue());

    this.router.navigate(['addStudent/session']);
  }
}
