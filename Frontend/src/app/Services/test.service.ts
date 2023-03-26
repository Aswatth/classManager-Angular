import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StudentModel } from "../Models/student.model";
import { TestModel } from "../Models/test.model";

@Injectable({
    providedIn: 'root'
})
export class TestService{

    S_studentData = new BehaviorSubject<StudentModel>(new StudentModel()) ;
    S_testDataList = new BehaviorSubject<TestModel[]>([]);

    constructor(private http: HttpClient){}

    GetTests(id: number)
    {
        this.http.get<TestModel[]>('http://localhost:9999/tests/'+id).subscribe(
        data => {
            this.S_testDataList.next(data);
        }
        );
    }

    AddTests(testData: TestModel)
    {   
        this.http.put('http://localhost:9999/test', testData).subscribe(
        data => {
            complete: this.GetTests(testData.studentId);
        }
        );
    }

    DeleteTest(testData: TestModel)
    {
        this.http.delete('http://localhost:9999/test/'+ testData.id).subscribe(
        data => {
            complete: this.GetTests(testData.studentId);
        }
        );
    }
}