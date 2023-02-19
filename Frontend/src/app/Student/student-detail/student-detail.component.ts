import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddStudentService } from '../add-student/add-student.service';
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

  boardList: string[] = [];
  classList: string[] = [];

  personalInfoForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private studentService: StudentService, 
    private addStudentService: AddStudentService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.personalInfoForm = new FormGroup(
      {
        'studentName': new FormControl({value: null, disabled: !this.isEditing}, Validators.required),
        'schoolName': new FormControl({value: null, disabled: !this.isEditing}, Validators.required),
        'className': new FormControl({value: null, disabled: !this.isEditing}, Validators.required),
        'boardName': new FormControl({value: null, disabled: !this.isEditing}, Validators.required),
        'location': new FormControl({value: null, disabled: !this.isEditing}, Validators.required),
        'studentMobileNumber': new FormControl({value: null, disabled: !this.isEditing}, Validators.required),
        'parentMobileNumber1': new FormControl({value: null, disabled: !this.isEditing}, Validators.required),
        'parentMobileNumber2': new FormControl({value: null, disabled: !this.isEditing}),
      }
    );

    this.GetData();
    this.boardList = this.addStudentService.boardList;
    this.classList = this.addStudentService.classList;
  }

  GetData(){
    this.studentService.GetStudent(this.id).subscribe(
      studentData => {
        this.oldStudentModel = studentData;
        console.log(this.oldStudentModel);
        this.SetDefault();
      }
    );
  }

  SetDefault(){
    this.personalInfoForm.setValue({
      'studentName': this.oldStudentModel.studentName,
      'schoolName': this.oldStudentModel.schoolName,
      'className': this.oldStudentModel.className,
      'boardName': this.oldStudentModel.boardName,
      'location': this.oldStudentModel.location,
      'studentMobileNumber': this.oldStudentModel.studentMobileNumber,
      'parentMobileNumber1': this.oldStudentModel.parentMobileNumber1,
      'parentMobileNumber2': this.oldStudentModel.parentMobileNumber2,
    });
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
    this.EnableForm();
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
    this.newStudentModel.studentMobileNumber =  this.personalInfoForm.get('studentMobileNumber')?.value;
    this.newStudentModel.parentMobileNumber1 =  this.personalInfoForm.get('parentMobileNumber1')?.value;
    this.newStudentModel.parentMobileNumber2 =  this.personalInfoForm.get('parentMobileNumber2')?.value;

    this.studentService.UpdateStudent(this.oldStudentModel.id, this.newStudentModel);

    this.DisableForm();
    this.isEditing = false;
  }
}
