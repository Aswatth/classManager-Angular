import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddStudentService } from '../add-student.service';
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

  constructor(private router: Router, private http: HttpClient, private addStudentService: AddStudentService) { }

  ngOnInit(){
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
    this.boardList = this.addStudentService.boardList;
    this.classList = this.addStudentService.classList;
  }

  OnNextClick(){
    console.log(this.personalInfoForm);

    this.personalInfoModel = new PersonalInfoModel(
      this.personalInfoForm.get('studentName')?.value,
      this.personalInfoForm.get('schoolName')?.value,
      this.personalInfoForm.get('className')?.value,
      this.personalInfoForm.get('boardName')?.value,
      this.personalInfoForm.get('location')?.value,
      this.personalInfoForm.get('studentMobileNumber')?.value,
      this.personalInfoForm.get('parentMobileNumber1')?.value,
      this.personalInfoForm.get('parentMobileNumber2')?.value
    );

    console.log(this.personalInfoModel);
    this.addStudentService.personalInfo = this.personalInfoModel;

    this.router.navigate(['addStudent/session']);
  }

}
