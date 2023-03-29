import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StudentModel } from '../Models/student.model';
import { ExportService } from '../Services/export.service';
import { StudentService } from '../Services/student.service';

@Component({
  selector: 'app-homepage-header',
  templateUrl: './homepage-header.component.html',
  styleUrls: ['./homepage-header.component.css']
})
export class HomepageHeaderComponent implements OnInit{

  @Input() totalFees = 0;
  @Input() totalStudents = 0;
  showImportPopup = false;

  menuItems: MenuItem[] = [];

  constructor(private exportService: ExportService, private studentService: StudentService){}

  ngOnInit()
  {
    
    // this.menuItems = [{
    //   items: [
    //     {
    //       label: 'Student template', 
    //       icon: 'pi pi-download', 
    //       command: () => {this.excelService.DownloadStudentTemplate();}
    //     },
    //     {
    //       label: 'Fees template', 
    //       icon: 'pi pi-download',
    //       command: () => {this.excelService.DownloadFeesTemplate();}
    //     },
    //     {
    //       label: 'Test template', 
    //       icon: 'pi pi-download',
    //       command: () => {this.excelService.DownloadTestTemplate();}
    //     },
    //   ]
    // }];
  }

  ExportData()
  {
    this.exportService.ExportData();
  }
  ImportData()
  {

  }
}
