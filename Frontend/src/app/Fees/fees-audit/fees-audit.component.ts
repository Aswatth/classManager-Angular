import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeesAuditService } from 'src/app/Services/fees-audit.service';
import { Subscription } from 'rxjs';
import { FeesModel } from 'src/app/Models/fees.model';

import jsPDF from 'jspdf'
import autoTable, { CellInput, RowInput } from 'jspdf-autotable'

@Component({
  selector: 'app-fees-audit',
  templateUrl: './fees-audit.component.html',
  styleUrls: ['./fees-audit.component.css']
})
export class FeesAuditComponent implements OnInit, OnDestroy {
  
  feesDataList: FeesModel[] = [];
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
  showCashOnly = false;
  showAccountOnly = false;

  datePaid: Date = new Date();

  //@ViewChild('dt') table!: Table;

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
        console.log("Current fees date");
        console.log(date);
        console.log("Selected month")
        console.log(this.selectedMonth);
        
        
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
    if(this.showPendingOnly)
    {
      this.showCashOnly = false;
      this.showAccountOnly = false;
    }
    if(this.showPaidOnly && this.showPendingOnly)
    {
      this.showPaidOnly = false;
    }
  }

  GetDataBasedOnFilters() : FeesModel[]
  {
    if(this.showAccountOnly && this.showCashOnly)
    {
      return this.feesDataList.filter(f=>f.paidOn!=null);
    }
    if(this.showPaidOnly)
    {
      if(this.showCashOnly)
      {
        return this.feesDataList.filter(f=>f.modeOfPayment=="Cash");
      }
      if(this.showAccountOnly)
      {
        return this.feesDataList.filter(f=>f.modeOfPayment=="Account");
      }
      return this.feesDataList.filter(f=>f.paidOn!=null);
    }
    if(this.showPendingOnly)
    {
      return this.feesDataList.filter(f=>f.paidOn==null);
    }
    
    return this.feesDataList;
  }

  OnPendingPress(index: number){
    this.selectedIndex = index;
    console.log(index);
    
    this.displayPopup = true;
    console.log(this.feesDataList[index]!.fees);
    
    this.paymentConfirmationForm.controls["fees"].setValue(this.feesDataList[index].fees);
  }

  ConfirmPayment(){
    console.log("Payment confirmed");
    console.log(this.paymentConfirmationForm.getRawValue());
    this.displayPopup = false;
    
    let selectedValue = this.paymentConfirmationForm.controls['paidOn'].value;

    this.feesDataList[this.selectedIndex].paidOn = selectedValue?selectedValue : new Date();
    this.feesDataList[this.selectedIndex].comments = this.paymentConfirmationForm.controls['comments'].value;
    this.feesDataList[this.selectedIndex].fees = this.paymentConfirmationForm.controls['fees'].value;
    this.feesDataList[this.selectedIndex].modeOfPayment = this.paymentConfirmationForm.controls['modeOfPayment'].value;

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
    // const doc = new jsPDF();

    let header = ['Student name', 'Class-Board', 'Subjects', "Fees", "Payment status", "Paid On", "Mode of payment", "Comments"];
    let content = [{}];

    this.feesDataList.forEach(e=>{
      let paymentStatus = "Pending";
      let paidDate = null;

      if(e.paidOn != null)
      {
        paymentStatus = "Paid";
        paidDate = new Date(e.paidOn).toLocaleDateString('default', {year: 'numeric', month: 'short', day: '2-digit'});
      }

      content.push([
        e.studentName, e.className+"-"+e.boardName, e.subjects.replace(/,/g,"\n"), 
        e.fees, paymentStatus, paidDate,
        e.modeOfPayment, e.comments]);
    });
    
    const doc = new jsPDF('p','pt');
    autoTable(doc, { 
    margin: 10,
    head: [header],
    body: content,
    didParseCell(data) {
      //console.log(data.cell.raw);
      if(data.cell.raw == "Pending")
      {
        data.cell.styles.textColor = [255,0,0];
      }
      else if(data.cell.raw == "Paid")
      {
        data.cell.styles.textColor = [0,255,0];
      }
    }
  });
    doc.save(this.selectedYear+"-"+ this.selectedMonth + ".pdf");
  }

  GoBack(){
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.feesDataSubcription.unsubscribe();
    console.log("Fees destroy");    
  }
}
