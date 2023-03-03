import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddStudentService } from '../add-student/add-student.service';
import { StudentModel } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit, OnDestroy{
 
  oldStudentModel!: StudentModel;
  newStudentModel!: StudentModel;
  studentDataSubscription!: Subscription;

  displayPopup: boolean = false;
  popupSubscription!: Subscription;

  personalInfoForm!: FormGroup;
  
  popupType!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private studentService: StudentService){}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.studentDataSubscription = this.studentService.S_StudentDataSource.subscribe({
      next: (data) => {
          this.oldStudentModel = data.filter(f=>f.id == id)[0] as StudentModel;  
          this.newStudentModel = this.oldStudentModel;
        }
      }
    );

    this.popupSubscription = this.studentService.S_IsPopupOpen.subscribe((data) => this.displayPopup = data);
  }

  GoBack(){
    this.router.navigate(['/']);
  }

  OnPersonalInfoEdit(){
    this.studentService.S_IsPopupOpen.next(true);
    this.popupType = "personal info";
    //this.router.navigate(['/student-popup/personal'],);
  }

  OnSessionInfoEdit(){
    this.studentService.S_IsPopupOpen.next(true);
    this.popupType = "session info";
  }

  OnDialogClose(){
    this.studentService.S_IsPopupOpen.next(false);
  }

  ngOnDestroy(): void {
    this.studentDataSubscription.unsubscribe();
    this.popupSubscription.unsubscribe();
  }
}
