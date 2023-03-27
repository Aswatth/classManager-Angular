import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StudentModel } from '../Models/student.model';
import { ExcelService } from '../Services/excel.service';
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

  constructor(private excelService: ExcelService, private studentService: StudentService){}

  ngOnInit()
  {
    
    this.menuItems = [{
      items: [
        {
          label: 'Student template', 
          icon: 'pi pi-download', 
          command: () => {this.excelService.DownloadStudentTemplate();}
        },
        {
          label: 'Fees template', 
          icon: 'pi pi-download',
          command: () => {this.excelService.DownloadFeesTemplate();}
        },
        {
          label: 'Test template', 
          icon: 'pi pi-download',
          command: () => {this.excelService.DownloadTestTemplate();}
        },
      ]
    }];
  }

  ExportData()
  {
    this.excelService.ExportData();
  }
  ImportData()
  {

  }
}
