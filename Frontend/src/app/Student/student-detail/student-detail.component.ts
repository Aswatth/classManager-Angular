import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionModel } from 'src/app/Models/session.model';
import { StudentModel } from 'src/app/Models/student.model';
import { StudentService } from 'src/app/Services/student.service';
import { TestService } from 'src/app/Services/test.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit, OnDestroy{
 
  studentModel!: StudentModel;
  studentDataSubscription!: Subscription;

  displayPopup: boolean = false;
  popupSubscription!: Subscription;

  personalInfoForm!: FormGroup;
  
  popupType!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private studentService: StudentService,
    private testService: TestService){}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.studentDataSubscription = this.studentService.S_StudentDataSource.subscribe({
      next: (data) => {
          this.studentModel = data.filter(f=>f.id == id)[0] as StudentModel;
          
          this.testService.S_studentData.next(this.studentModel);
        }
      }
    );

    this.popupSubscription = this.studentService.S_IsPopupOpen.subscribe((data) => this.displayPopup = data);
  }

  GoBack(){
    this.router.navigate(['/']);
  }

  OnPersonalInfoEdit(){    
    //this.newStudentModel = this.studentModel;
    this.studentService.S_IsPopupOpen.next(true);
    this.popupType = "personal info";
    //this.router.navigate(['/student-popup/personal'],);
  }

  UpdatePersonalInfo(event: StudentModel)
  {
    //console.log("Event:");
    //console.log(event);
    
    this.studentModel = event;
  }

  UpdateSession(event: SessionModel[])
  {
    this.studentModel.sessionList = event;
  }

  OnSessionInfoEdit(){
    this.studentService.S_IsPopupOpen.next(true);
    this.popupType = "session info";
  }

  OnDialogClose(){
    this.studentService.S_IsPopupOpen.next(false);
    this.testService.S_studentData.next(this.studentModel);    
  }

  ngOnDestroy(): void {
    this.studentDataSubscription.unsubscribe();
    this.popupSubscription.unsubscribe();
  }
}
