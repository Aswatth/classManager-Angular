import { Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { StudentModel } from 'src/app/Models/student.model';
import {ConfirmationService, MenuItem} from 'primeng/api';
import { StudentService } from 'src/app/Services/student.service';
import { Subscription } from 'rxjs';
import { AddStudentService } from 'src/app/Services/add-student.service';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy{
  
  displayPopup: boolean = false;
  studentList: StudentModel[] = [];
  filteredData: StudentModel[] = [];

  popupSubscription!: Subscription;
  studentDataSubscription!: Subscription;

  menuItems: MenuItem[] = [];
  
  showCbsHandler: boolean = false;
  cbsType: string = "";
  cbsDataList: any[] = [];

  constructor(private studentService: StudentService, 
    private addStudentService: AddStudentService,
    private router:Router, 
    private confirmationService: ConfirmationService
    ){}

  ngOnInit(): void {
    console.log("Student list init");
    this.studentDataSubscription = this.studentService.S_StudentDataSource.subscribe({
      next: (data) => {
        this.studentList = data;
        this.filteredData = this.studentList;
        this.CalculateTotalFees();
      }
    });
    this.popupSubscription = this.studentService.S_IsPopupOpen.subscribe(
      (value) => (this.displayPopup = value)
    );   

    this.menuItems = [
      {
        label: "Class",
        icon: "pi pi-list", 
        command: () => 
        {
          this.showCbsHandler = true;
          this.cbsType = "class";
          this.cbsDataList = this.studentService.classList
        }
      },
      {
        label: "Board",
        icon: "pi pi-list", 
        command: () => 
        {
          this.showCbsHandler = true;
          this.cbsType = "board";
          this.cbsDataList = this.studentService.boardList
        }
      },
      {
        label: "Subject",
        icon: "pi pi-list", 
        command: () => 
        {
          this.showCbsHandler = true;
          this.cbsType = "subject";
          this.cbsDataList = this.studentService.subjectList
        }
      },
    ];
  }

  GetLoadStatus()
  {
    return this.studentService.loadingInidcation;
  }

  CalculateTotalFees():number{
    let fees = 0;
    this.studentList.forEach(student => {
      student.sessionList!.forEach(session => {
        fees += session.fees;
      })
    })
    return fees;
  }

  OnAddStudent(){
    this.studentService.S_IsPopupOpen.next(true);
    
    this.addStudentService.studentInfo = new StudentModel();
    this.addStudentService.sessionList = []
    
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

  GetFilteredData(data: StudentModel[])
  {
    this.filteredData = data;
  }

  ngOnDestroy(): void {
    this.studentDataSubscription.unsubscribe();
    this.popupSubscription.unsubscribe();
  }
}
