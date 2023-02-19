import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-info',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.css']
})
export class SessionInfoComponent implements OnInit{
  
  constructor(private router: Router){}

  ngOnInit(){

  }

  MoveNext(){
    this.router.navigate(['addStudent/review_submit']);
  }
}
