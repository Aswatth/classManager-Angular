import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit{
  
  stepItems: MenuItem[] = [];

  constructor(private router: Router){}

  ngOnInit() {
    this.stepItems = [
        {
          label: 'Personal Info',
          routerLink: 'personal',
        },
        {
          label: 'Session details',
          routerLink: 'session'
        },
        {
          label: 'Review and Submit',
          routerLink: 'review_submit'
        }
    ];
  }
}
