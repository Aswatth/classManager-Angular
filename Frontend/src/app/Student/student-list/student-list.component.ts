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
  totalFees = 0;

  addingStudentSubscription!: Subscription;
  studentDataSubscription!: Subscription;

  constructor(private studentService: StudentService, 
    private router:Router, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService){}

  ngOnInit(): void {
    console.log("Student list init");
    this.studentDataSubscription = this.studentService.S_stundentList.subscribe(
      data => {
        this.studentList = data;
        this.CalculateTotalFees();
        // let startTime:Date = Date.parse(this.studentList[0].sessionList[0].startTime.toString());
        // console.log(startTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
      }
    );
    
    // this.studentService.GetTotalFees().subscribe(
    //   value => {
    //     this.totalFees = value;
    //     console.log(this.totalFees);
    //   }
    // );

    this.addingStudentSubscription = this.studentService.S_isAddingStudent.subscribe(
      (value) => (this.displayAddStudentForm = value)
    );   
  }

  CalculateTotalFees(){
    this.totalFees = 0;
    this.studentList.forEach(student => {
      student.sessionList.forEach(session => {
        this.totalFees += session.fees;
      })
    })
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
        this.CalculateTotalFees();
      },
      reject: () =>{
        console.log("Rejected");
      }
  });
  }

  onRowSelect(event: {data: StudentModel}){
    this.router.navigate(['/student/'+event.data.id]);
  }

  ngOnDestroy(): void {
    this.studentDataSubscription.unsubscribe();
    this.addingStudentSubscription.unsubscribe();
  }
}
