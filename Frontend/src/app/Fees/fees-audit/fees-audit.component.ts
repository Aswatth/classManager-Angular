import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeesAuditModel } from 'src/app/Models/fees-audit.model';
import { FeesAuditService } from 'src/app/Services/fees-audit.service';
import { finalize, map, Subscription } from 'rxjs';
import { StudentService } from 'src/app/Services/student.service';
import { StudentModel } from 'src/app/Models/student.model';
import { FeesDataModel } from 'src/app/Models/fees-data.model';

@Component({
  selector: 'app-fees-audit',
  templateUrl: './fees-audit.component.html',
  styleUrls: ['./fees-audit.component.css']
})
export class FeesAuditComponent implements OnInit, OnDestroy{
  
  feesDataList: FeesDataModel[] = [];
  
  studentList!: StudentModel[];
  studentSubscription!: Subscription;

  displayPopup: boolean = false;

  paymentConfirmationForm!: FormGroup;
  selectedIndex!: number;

  yearList: string[] = [];
  monthList: string[] = [];

  datePaid: Date = new Date();

  constructor(private router: Router, 
    private feesAuditService: FeesAuditService, 
    private studentService: StudentService){}

  ngOnInit(): void {
    //this.BaseData();

    // this.studentSubscription = this.studentService.S_StudentDataSource.subscribe(
    //   (data) => {
    //     this.studentList = data;
    //   }
    // )

    this.feesAuditService.GetFeesAudit().subscribe(
      (data) => {
        this.feesDataList = data;
        console.log(data);

        // let feeDates = Array.from(new Set(data.map(m=>m.feesAuditEntity.feesDate).map(date => date.toDateString()))).map(dateString => new Date(dateString));
    
        // this.yearList = Array.from(new Set(feeDates.map(e=>e.getFullYear().toString())));
        // this.monthList = Array.from(new Set(feeDates.map(e=>e.toLocaleDateString('default', {month: 'short'}))));
      }
    );

    // this.feesAuditService.GetFeesAudit()
    // .pipe(
    //   map((data) =>{
    //     data.forEach(f=>f.feesDate = new Date(f.feesDate));
    //     return data;
    //   }),
    // ).subscribe(
    //   (data) => {
    //     this.feesAuditList = data;
        
        
    //   }
    // );

    this.paymentConfirmationForm = new FormGroup(
      {
        'paidOn': new FormControl(null, Validators.required),
        'fees': new FormControl(null, Validators.required),
        'comments': new FormControl(null),
      });
  }

  BaseData(data: FeesAuditModel[]){
    // this.feesAuditList.push({
    //   feesDate: new Date("2023-01-01"),
    //   subject: "Science",
    //   studentId: 1,
    //   paidOn: new Date("2023-01-04"),
    //   comments: "",
    //   fees: 200,
    // });
    // this.feesAuditList.push({
    //   feesDate: new Date("2023-02-01"),
    //   subject: "Science",
    //   studentId: 2,
    //   paidOn: null,
    //   comments: "",
    //   fees: 200,
    // });
    // this.feesAuditList.push({
    //   feesDate: new Date("2023-01-01"),
    //   subject: "Science",
    //   studentId: 3,
    //   paidOn: null,
    //   comments: "",
    //   fees: 200,
    // });

    // let feeDates = Array.from(new Set(data.map(m=>m.feesDate).map(date => date.toDateString()))).map(dateString => new Date(dateString));
    
    // this.yearList = Array.from(new Set(feeDates.map(e=>e.getFullYear().toString())));
    // this.monthList = Array.from(new Set(feeDates.map(e=>e.toLocaleDateString('default', {month: 'short'}))));
    
    console.log(this.yearList);
    console.log(this.monthList);    
  }

  OnPendingPress(index: number){
    this.selectedIndex = index;
    console.log(index);
    
    this.displayPopup = true;
    console.log(this.feesDataList[index]!.feesAuditEntity.fees);
    
    this.paymentConfirmationForm.controls["fees"].setValue(this.feesDataList[index].feesAuditEntity.fees);
  }

  ConfirmPayment(){
    console.log("Payment confirmed");
    console.log(this.paymentConfirmationForm.getRawValue());
    this.displayPopup = false;
    
    let selectedValue = this.paymentConfirmationForm.controls['paidOn'].value;

    this.feesDataList[this.selectedIndex].feesAuditEntity.paidOn = selectedValue?selectedValue : new Date();
    this.feesDataList[this.selectedIndex].feesAuditEntity.comments = this.paymentConfirmationForm.controls['comments'].value;
    this.feesDataList[this.selectedIndex].feesAuditEntity.fees = this.paymentConfirmationForm.controls['fees'].value;

    console.log(this.feesDataList);
    
    this.feesAuditService.SaveChanges(this.feesDataList[this.selectedIndex]);
  }

  exportPdf() {
    
  }

  GoBack(){
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe();
  }
}
