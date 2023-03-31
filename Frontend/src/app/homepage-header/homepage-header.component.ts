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

  file!: File;

  constructor(private exportService: ExportService){}

  ngOnInit()
  {
  }

  ExportData()
  {
    this.exportService.ExportData();
  }
  ImportData()
  {
    this.showImportPopup = true;
  }
  ChooseFile(event: any)
  {     
    this.file = event.target.files[0];
  }

  ImportFile()
  {
    this.exportService.ImportData(this.file);
    this.showImportPopup = false;
  }
}
