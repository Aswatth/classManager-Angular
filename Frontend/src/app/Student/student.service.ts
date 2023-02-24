import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { BehaviorSubject, map, Observable, of, Subject } from "rxjs";
import { PersonalInfoModel } from "./add-student/personal-info/personal-info.model";
import { SessionModel } from "./add-student/session-info/session.model";
import { StudentModel } from "./student.model";

@Injectable({providedIn: 'root'})
export class StudentService{

    boardList: string[] = ['CBSE', 'ICSE', 'STATE', 'IGCSE'];
    classList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'Other'];
    subjectList: string[] = ['Science', 'Maths', 'Social', 'English', 'Tamil', 'Economics', 'Accounts', 'Business Maths'];
    dayList: string[] = ['Weekday','Weekend','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    //Subjects
    //flag for popup open/close
    S_isAddingStudent = new BehaviorSubject<boolean>(false);

    //Student datasource
    S_stundentList = new BehaviorSubject<StudentModel[]>([]);

    //Fees data
    S_totalFees = new BehaviorSubject<number>(0);

    constructor(private http: HttpClient, private messageService: MessageService){
        console.log("Student service cons");
        this.GetAllStudent();
    }

    GetAllStudent(){
        this.http.get<StudentModel[]>('http://localhost:9999/students')
        .subscribe(
            data => {
                console.log("Fetched all student data");
                console.log(data);
                
                this.S_stundentList.next(data);
            }
        );
    }

    GetStudent(id: number){
        return this.http.get<StudentModel>('http://localhost:9999/students/'+id);
    }

    AddStudent(student: StudentModel){        
        this.http.post<StudentModel[]>('http://localhost:9999/student', student).subscribe(
            data => {
                this.messageService.add({severity: 'success', detail: 'Successfully added student'});
                this.S_isAddingStudent.next(false);
                this.S_stundentList.next(data)
            }
        );
    }

    UpdateStudent(id: number | undefined, newStudentModel: StudentModel){
        this.http.put<PersonalInfoModel>('http://localhost:9999/students/'+id, newStudentModel).subscribe();
    }

    DeleteStudent(id: number | undefined){
        this.http.delete<StudentModel[]>("http://localhost:9999/students/"+ id).subscribe(
            data => this.S_stundentList.next(data)
        );
    }
}