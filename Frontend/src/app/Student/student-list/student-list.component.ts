import { Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { StudentModel } from '../student.model';
import {ConfirmationService} from 'primeng/api';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{
  
  displayAddStudentForm: boolean = false;
  studentList: StudentModel[] = [];

  constructor(private studentService: StudentService, 
    private router:Router, 
    private confirmationService: ConfirmationService){}

  ngOnInit(): void {
    this.GetAllStudents();    
  }

  GetAllStudents(){
    this.studentService.GetAll().subscribe(
      studentData => {
        this.studentList = studentData;
    });
  }

  OnAddStudent(){
    this.displayAddStudentForm = true;
    this.router.navigate(['/addStudent']);
  }

  OnDialogClose(){
    this.router.navigate(['']);
    if(this.studentService.hasUpdates)
      this.GetAllStudents();
  }

  OnDelete(student: StudentModel){
    console.log(student);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete <b>'+ student.studentName +'\'s</b> data?',
      accept: () => {
          //console.log("Accepted");
          this.studentService.DeleteStudent(student.id);
          if(this.studentService.hasUpdates)
            this.GetAllStudents();          
      },
      reject: () =>{
        console.log("Rejected");
      }
  });
  }

  onRowSelect(event: {data: StudentModel}){
    console.log(event.data);
    this.router.navigate(['/student/'+event.data.id]);
  }
}
