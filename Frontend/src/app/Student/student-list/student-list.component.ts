import { Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { StudentModel } from 'src/app/Models/student.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import { StudentService } from 'src/app/Services/student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy{
  
  displayPopup: boolean = false;
  studentList: StudentModel[] = [];
  totalFees = 0;

  popupSubscription!: Subscription;
  studentDataSubscription!: Subscription;

  constructor(private studentService: StudentService, 
    private router:Router, 
    private confirmationService: ConfirmationService
    ){}

  ngOnInit(): void {
    console.log("Student list init");
    this.studentDataSubscription = this.studentService.S_StudentDataSource.subscribe({
      next: (data) => {
        this.studentList = data;
        this.CalculateTotalFees();
      }
    });

    this.popupSubscription = this.studentService.S_IsPopupOpen.subscribe(
      (value) => (this.displayPopup = value)
    );   
  }

  CalculateTotalFees(){
    this.totalFees = 0;
    this.studentList.forEach(student => {
      student.sessionList!.forEach(session => {
        this.totalFees += session.fees;
      })
    })
  }

  OnAddStudent(){
    this.studentService.S_IsPopupOpen.next(true);
    this.router.navigate(['/student-popup']);
  }

  ShowsFees(){
    this.studentService.GetFees();
    this.router.navigate(['/fees']);
  }

  OnDialogClose(){
    this.studentService.S_IsPopupOpen.next(false);
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
    this.popupSubscription.unsubscribe();
  }
}
