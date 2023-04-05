import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../Services/student.service';
import {StudentModel} from '../Models/student.model';

@Component({
  
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  @Input() studentList: StudentModel[] = [];

  searchForm!: FormGroup;

  classList: string[] = [];
  boardList: string[] = [];
  subjectList: string[] = [];
  dayList:string[] = [];

  @Output() filteredData = new EventEmitter<StudentModel[]>();

  constructor(private studentService: StudentService){}

  ngOnInit()
  {
    this.classList = this.studentService.classList;
    this.boardList = this.studentService.boardList;
    this.subjectList = this.studentService.subjectList;
    this.dayList = this.studentService.dayList;

    this.searchForm = new FormGroup({
      'class': new FormControl([]),
      'board': new FormControl([]),
      'days': new FormControl([]),
      'subject': new FormControl([]),
      'startTime': new FormControl(null),
      'endTime': new FormControl(null)
    });
  }

  GetTime(time: string)
  {
    let hours = +time.split(' ')[0].split(':')[0];
    let minutes = +time.split(' ')[0].split(':')[1];
    if(time.split(' ')[1] == "PM")
      hours += 12;

    return [hours, minutes];
  }

  CheckTime(currentStartTime: string, currentEndTime: string,startTime: string, endTime: string)
  {
    //console.log(this.GetTime(currentStartTime));
    //console.log(this.GetTime(currentEndTime));
    //console.log(this.GetTime(startTime));
    //console.log(this.GetTime(endTime));
    
    let isTimeInRange = false;

    if(startTime != "" && endTime == "")
      {
        if((this.GetTime(startTime)[0] < this.GetTime(currentStartTime)[0]) 
        ||((this.GetTime(startTime)[0] == this.GetTime(currentStartTime)[0]) && (this.GetTime(startTime)[1] <= this.GetTime(currentStartTime)[1])))
          {
            isTimeInRange = true;
          }
      }
      else if(startTime == "" && endTime != "")
      {
        if((this.GetTime(endTime)[0] > this.GetTime(currentEndTime)[0]) 
        ||(((this.GetTime(endTime)[0] == this.GetTime(currentEndTime)[0])) && (this.GetTime(endTime)[1] >= this.GetTime(currentEndTime)[1])))
          {
            isTimeInRange = true;
          }
      }
      else
      {
        if(
          ((this.GetTime(startTime)[0] < this.GetTime(currentStartTime)[0]) 
        ||(
          (this.GetTime(startTime)[0] == this.GetTime(currentStartTime)[0]) && (this.GetTime(startTime)[1] <= this.GetTime(currentStartTime)[1])
          ))
        && (
          (this.GetTime(endTime)[0] > this.GetTime(currentEndTime)[0]) 
        ||(
          (this.GetTime(endTime)[0] == this.GetTime(currentEndTime)[0]) && (this.GetTime(endTime)[1] >= this.GetTime(currentEndTime)[1])
          ))
          )
          {
            isTimeInRange = true;
          }
      }

    return isTimeInRange;
  }

  OnFilterApply()
  { 
    let searchFilter: Search = this.searchForm.getRawValue();

    let filteredStudentData: StudentModel[] = [];

    //console.log(searchFilter);    

    //1. Filter by class
    filteredStudentData = this.studentList.filter(s=>searchFilter.class.includes(s.className));
    //console.log(filteredStudentData);

    //2. Filter by board
    filteredStudentData = filteredStudentData.filter(s=>searchFilter.board.length != 0?searchFilter.board.includes(s.boardName):true);
    //console.log(filteredStudentData);

    //Filter by subject
    filteredStudentData = filteredStudentData.filter(f=>{
      return f.sessionList.filter(s=>{
        return searchFilter.subject.length!=0?searchFilter.subject.includes(s.subject):true;
      }).length != 0;
    });
    //console.log(filteredStudentData);

    //Filter by days
    filteredStudentData = filteredStudentData.filter(f=>{
      return f.sessionList.filter(s=>{
        return s.days.filter(d => searchFilter.days.length!=0?searchFilter.days.includes(d):true).length != 0
      }).length != 0;
    });
    //console.log(filteredStudentData);

    //Filter by time
    filteredStudentData = filteredStudentData.filter(f=>{
      return f.sessionList.filter(s=>{
        if(searchFilter.startTime == null && searchFilter.endTime == null)
          return true;
        let startTime = ""
        let endTime = "";
        if(searchFilter.startTime != null)
        {
          startTime = this.searchForm.controls['startTime'].value.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });          
        }
        if(searchFilter.endTime != null)
        {
          endTime = this.searchForm.controls['endTime'].value.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        }
        let currentStartTime = new Date(s.startTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        let currentEndTime = new Date(s.endTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        if(this.CheckTime(currentStartTime, currentEndTime, startTime, endTime))
        {
          return true;
        }
        return false;
      }).length != 0;
    });
    //console.log(filteredStudentData);

    this.filteredData.emit(filteredStudentData);
  }

  ClearFilters()
  {
    this.searchForm.reset();
    this.filteredData.emit(this.studentList);
  }
}
export interface Search{
  class: string[];
  board: string[];
  subject: string[];
  days: string[];
  startTime: Date;
  endTime: Date;
}
