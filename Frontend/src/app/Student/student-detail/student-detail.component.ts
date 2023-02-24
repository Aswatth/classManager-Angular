import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddStudentService } from '../add-student/add-student.service';
import { PersonalInfoModel } from '../add-student/personal-info/personal-info.model';
import { StudentModel } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit{
 
  oldStudentModel!: StudentModel;
  newStudentModel!: StudentModel;
  id!: number;
  isEditing: boolean = false;

  personalInfoForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private studentService: StudentService){}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.studentService.S_stundentList.subscribe(
      data => {
        this.oldStudentModel = data.filter(f=>f.id == id)[0];
        
        let personalInfo: PersonalInfoModel = this.oldStudentModel
        console.log(personalInfo);
      }
    );
  }

  GetData(){
    this.studentService.GetStudent(this.id).subscribe(
      studentData => {
        this.oldStudentModel = studentData;
        console.log(this.oldStudentModel);
        //this.SetDefault();
      }
    );
  }

  SetDefault(){
    this.personalInfoForm.setValue(this.oldStudentModel);
  }

  EnableForm(){
    Object.keys(this.personalInfoForm.controls).forEach(key =>{
      this.personalInfoForm.controls[key].enable();
    });
  }

  DisableForm(){
    Object.keys(this.personalInfoForm.controls).forEach(key =>{
      this.personalInfoForm.controls[key].disable();
    });
  }

  OnEdit(){
    console.log("Editing");
    this.isEditing = true;
    //this.EnableForm();
    this.router.navigate(['/addStudent/personalInfo']);
  }

  OnCancel(){
    console.log("Cancel changes");
    this.isEditing = false;
    this.DisableForm();
    this.SetDefault();
  }

  Submit(){
    this.newStudentModel = new StudentModel();
    this.newStudentModel.id = this.oldStudentModel.id;
    this.newStudentModel.studentName  = this.personalInfoForm.get('studentName')?.value;
    this.newStudentModel.schoolName = this.personalInfoForm.get('schoolName')?.value;
    this.newStudentModel.className =  this.personalInfoForm.get('className')?.value;
    this.newStudentModel.boardName =  this.personalInfoForm.get('boardName')?.value;
    this.newStudentModel.location =  this.personalInfoForm.get('location')?.value;
    this.newStudentModel.studentPhNum =  this.personalInfoForm.get('studentMobileNumber')?.value;
    this.newStudentModel.parentPhNum1 =  this.personalInfoForm.get('parentMobileNumber1')?.value;
    this.newStudentModel.parentPhNum2 =  this.personalInfoForm.get('parentMobileNumber2')?.value;

    this.studentService.UpdateStudent(this.oldStudentModel.id, this.newStudentModel);

    this.DisableForm();
    this.isEditing = false;
  }
}
