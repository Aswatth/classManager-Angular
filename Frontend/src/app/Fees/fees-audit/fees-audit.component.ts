import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeesAuditModel } from 'src/app/Models/fees-audit.model';
import { DatePipe } from '@angular/common';
import { FeesAuditService } from 'src/app/Services/fees-audit.service';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-fees-audit',
  templateUrl: './fees-audit.component.html',
  styleUrls: ['./fees-audit.component.css']
})
export class FeesAuditComponent implements OnInit{
  
  feesAuditList: FeesAuditModel[] = [];

  displayPopup: boolean = false;

  paymentConfirmationForm!: FormGroup;
  selectedIndex!: number;

  yearList: string[] = [];
  monthList: string[] = [];

  datePaid: Date = new Date();

  constructor(private router: Router, private feesAuditService: FeesAuditService){}

  ngOnInit(): void {
    //this.BaseData();

    this.feesAuditService.GetFeesAudit()
    .pipe(
      map((data) =>{
        data.forEach(f=>f.feesDate = new Date(f.feesDate));
        return data;
      }),
    ).subscribe(
      (data) => {
        this.feesAuditList = data;
        
        let feeDates = Array.from(new Set(data.map(m=>m.feesDate).map(date => date.toDateString()))).map(dateString => new Date(dateString));
    
        this.yearList = Array.from(new Set(feeDates.map(e=>e.getFullYear().toString())));
        this.monthList = Array.from(new Set(feeDates.map(e=>e.toLocaleDateString('default', {month: 'short'}))));
      }
    );

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
    this.displayPopup = true;
    this.paymentConfirmationForm.controls["fees"].setValue(this.feesAuditList[index].fees);
  }

  ConfirmPayment(){
    console.log("Payment confirmed");
    console.log(this.paymentConfirmationForm.getRawValue());
    this.displayPopup = false;
    
    let selectedValue = this.paymentConfirmationForm.controls['paidOn'].value;

    this.feesAuditList[this.selectedIndex].paidOn = selectedValue?selectedValue : new Date();
    this.feesAuditList[this.selectedIndex].comments = this.paymentConfirmationForm.controls['comments'].value;
    this.feesAuditList[this.selectedIndex].fees = this.paymentConfirmationForm.controls['fees'].value;

    console.log(this.feesAuditList);
    
    this.feesAuditService.SaveChanges(this.feesAuditList);
  }

  exportPdf() {
    
  }

  GoBack(){
    this.router.navigate(['/']);
  }
}
