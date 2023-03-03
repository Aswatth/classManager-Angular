import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { BehaviorSubject, map, Observable, of, Subject } from "rxjs";
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
    S_IsPopupOpen = new BehaviorSubject<boolean>(false);

    S_StudentDataSource = new BehaviorSubject<StudentModel[]>([]);

    //Fees data
    //S_totalFees = new BehaviorSubject<number>(0);

    constructor(private http: HttpClient, private messageService: MessageService){
        console.log("Student service cons");
        this.GetAllStudent();
    }

    //Fetch all student data from DB
    GetAllStudent(){
        this.http.get<StudentModel[]>('http://localhost:9999/students').subscribe({
            next: (data) => this.S_StudentDataSource.next(data)
        });
    }

    GetStudent(id: number){
        return this.http.get<StudentModel>('http://localhost:9999/students/'+id);
    }

    AddStudent(student: StudentModel){        
        this.http.post('http://localhost:9999/student', student).subscribe(
            {
                complete: () => {
                    this.messageService.add({severity: 'success', detail: 'Successfully added student'});
                    this.S_IsPopupOpen.next(false);
                    this.GetAllStudent();
                }
            }
        );
    }

    UpdateStudent(newStudentModel: StudentModel){
        this.http.put<StudentModel>('http://localhost:9999/students/'+newStudentModel.id!, newStudentModel).subscribe({
            complete: () => {
                this.GetAllStudent(); 
                this.S_IsPopupOpen.next(false);
            }
        });
    }

    DeleteStudent(id: number | undefined){
        this.http.delete("http://localhost:9999/students/"+ id).subscribe(
            {
                complete: () => this.GetAllStudent()
            }
        );
    }
}