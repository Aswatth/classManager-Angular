import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentModel } from 'src/app/Models/student.model';
import { TestModel } from 'src/app/Models/test.model';
import { TestService } from 'src/app/Services/test.service';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.css']
})
export class TestInfoComponent implements OnInit{
  
  studentData!: StudentModel;

  displayAddPopup = false;

  addTestFormGroup!: FormGroup;

  testTypeList = [{
    name: 'Midterm',
    subTypes: ['Midterm 1', 'Midterm 2', 'Midterm 3']
  }];

  testDataList: TestModel[] = [];

  constructor(private testService: TestService){
  }

  ngOnInit(): void {
    this.testService.S_studentData.subscribe(
      data => {
        this.studentData = data;
      }
    );

    this.testService.S_testDataList.subscribe(
      data => {
        this.testDataList = data;
      }
    );

    this.addTestFormGroup = new FormGroup(
      {
        'testName': new FormControl(null, Validators.required),
        'totalMarks': new FormControl(null, Validators.required),
        'marksScored': new FormControl(null, Validators.required),
        'testDate': new FormControl(null, Validators.required),
        'subject': new FormControl(null, Validators.required),
      }
    );
    this.testService.GetTests(this.studentData.id!);
  }

  GetSubjectList()
  {
    return this.studentData.sessionList.map(e=>e.subject)
  }

  AddTest()
  {
    let testData: TestModel = this.addTestFormGroup.getRawValue();
        
    testData.className = this.studentData.className;
    testData.boardName = this.studentData.boardName;
    testData.studentId = this.studentData.id!;

    this.testService.AddTests(testData);

    this.displayAddPopup = false;
  }

  DeleteTest(testData: TestModel)
  {
    this.testService.DeleteTest(testData);
  }

  OnSubmit()
  {
    console.log(this.addTestFormGroup.getRawValue());
    this.AddTest();
  }
}
