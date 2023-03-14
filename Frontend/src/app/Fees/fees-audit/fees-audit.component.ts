import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeesAuditService } from 'src/app/Services/fees-audit.service';
import { Subscription } from 'rxjs';
import { FeesDataModel } from 'src/app/Models/fees-data.model';

import { Table } from 'primeng/table';

@Component({
  selector: 'app-fees-audit',
  templateUrl: './fees-audit.component.html',
  styleUrls: ['./fees-audit.component.css']
})
export class FeesAuditComponent implements OnInit, OnDestroy {
  
  feesDataList: FeesDataModel[] = [];
  feesDataSubcription!: Subscription;
  
  displayPopup: boolean = false;

  paymentConfirmationForm!: FormGroup;
  selectedIndex!: number;

  //Filters
  yearList: number[] = [];
  selectedYear!: number;
  monthList: string[] = [];
  selectedMonth!: string;
  dateList: Date[] = [];

  showPendingOnly = false;
  showPaidOnly = false;
  
  datePaid: Date = new Date();

  @ViewChild('dt') table!: Table;

  constructor(private router: Router, 
    private feesAuditService: FeesAuditService){}

  ngOnInit(): void {
    console.log("Fees init");
    
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
          
          if(!this.yearList.includes(year))
          {
            this.yearList.push(year);
          }
          this.dateList.push(date);
        });
        
        let date = new Date();
        this.selectedYear = date.getFullYear();
        this.monthList = this.dateList.filter(m=>m.getFullYear() == this.selectedYear).map(m=>m.toLocaleDateString('default', {month: 'short'}));
        this.selectedMonth = date.toLocaleString('default', { month: 'short' })
        console.log(date);
        
      }
    );

    this.paymentConfirmationForm = new FormGroup(
      {
        'paidOn': new FormControl(this.datePaid, Validators.required),
        'modeOfPayment': new FormControl("Cash", Validators.required),
        'fees': new FormControl(null, Validators.required),
        'comments': new FormControl(null),
      });
  }

  PaidCbChange()
  {
    if(this.showPendingOnly && this.showPaidOnly)
    {
      this.showPendingOnly = false;
    }
  }

  PendingCbChange()
  {
    if(this.showPaidOnly && this.showPendingOnly)
    {
      this.showPaidOnly = false;
    }
  }

  GetDataBasedOnFilters() : FeesDataModel[]
  {
    if(this.showPaidOnly)
      return this.feesDataList.filter(f=>f.feesAuditEntity.paidOn!=null);
    if(this.showPendingOnly)
      return this.feesDataList.filter(f=>f.feesAuditEntity.paidOn==null)  
    return this.feesDataList;
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
    this.feesDataList[this.selectedIndex].feesAuditEntity.modeOfPayment = this.paymentConfirmationForm.controls['modeOfPayment'].value;

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

  exportToPdf() {
    
  }

  GoBack(){
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.feesDataSubcription.unsubscribe();
    console.log("Fees destroy");    
  }
}
