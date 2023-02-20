import { Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { StudentModel } from '../student.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy{
  
  displayAddStudentForm: boolean = false;
  studentList: StudentModel[] = [];

  addingStudentSubscription!: Subscription;
  studentDataSubscription!: Subscription;

  constructor(private studentService: StudentService, 
    private router:Router, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService){}

  ngOnInit(): void {
    console.log("Student list init");
    this.studentService.S_stundentList.subscribe(
      data => {
        this.studentList = data;
      }
    )
    this.studentDataSubscription = this.addingStudentSubscription = this.studentService.S_isAddingStudent.subscribe(
      (value) => (this.displayAddStudentForm = value)
    );   
  }

  OnAddStudent(){
    this.studentService.S_isAddingStudent.next(true);
    this.router.navigate(['/addStudent']);
  }

  OnDialogClose(){
    this.router.navigate(['']);
  }

  OnDelete(student: StudentModel){
    console.log(student);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete <b>'+ student.studentName +'\'s</b> data?',
      accept: () => {
        this.studentService.DeleteStudent(student.id);
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

  ngOnDestroy(): void {
    this.studentDataSubscription.unsubscribe();
    this.addingStudentSubscription.unsubscribe();
  }
}
