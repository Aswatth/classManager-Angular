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
  feesDataSubcription!: Subscription;
  
  displayPopup: boolean = false;

  paymentConfirmationForm!: FormGroup;
  selectedIndex!: number;

  yearList: number[] = [];
  selectedYear!: number;
  monthList: string[] = [];
  selectedMonth!: string;
  
  dateList: Date[] = [];

  datePaid: Date = new Date();

  constructor(private router: Router, 
    private feesAuditService: FeesAuditService){}

  ngOnInit(): void {

    this.feesDataSubcription = this.feesAuditService.S_FeesAuditData.subscribe(
      (data) => {
        this.feesDataList = data;
      }
    );

    this.feesAuditService.GetDates().subscribe(
      (data) => {
        data.forEach(e=>{
          let date = new Date(e);
          let year = date.getFullYear();
          let month = date.toLocaleString('default', { month: 'long' });

          if(!this.yearList.includes(year))
          {
            this.yearList.push(year);
          }
          if(!this.monthList.includes(month))
          {
            this.monthList.push(month);
          }
          this.dateList.push(date);
        });

        let date = new Date();
        this.selectedYear = date.getFullYear();
        this.selectedMonth = date.toLocaleString('default', { month: 'long' })
      }
    );

    this.paymentConfirmationForm = new FormGroup(
      {
        'paidOn': new FormControl(null, Validators.required),
        'fees': new FormControl(null, Validators.required),
        'comments': new FormControl(null),
      });
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

  OnYearChange()
  {
    let year = this.selectedYear;
    
    this.monthList = this.dateList.filter(m=>m.getFullYear() == year).map(m=>m.toLocaleDateString('default', {month: 'short'}));
    
    this.selectedMonth = this.monthList[0];

    let month = new Date(this.selectedMonth + " 1 2000").toLocaleDateString('default', {month: '2-digit'});
    this.feesAuditService.GetFeesAudit(year + "-" + month + "-" + "01");    
  }
  OnMonthChange()
  {
    let month = new Date(this.selectedMonth + " 1 2000").toLocaleDateString('default', {month: '2-digit'});
    this.feesAuditService.GetFeesAudit(this.selectedYear + "-" + month + "-" + "01");    
  }

  exportPdf() {
    
  }

  GoBack(){
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.feesDataSubcription.unsubscribe();
  }
}
