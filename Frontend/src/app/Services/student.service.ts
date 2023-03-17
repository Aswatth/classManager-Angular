import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { BehaviorSubject, map, Observable, of, Subject } from "rxjs";
import { SessionModel } from "../Models/session.model";
import { StudentModel } from "../Models/student.model";
import { FeesAuditService } from "./fees-audit.service";

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

    constructor(private http: HttpClient, private messageService: MessageService, private feesAuditService: FeesAuditService){
        console.log("Student service cons");
        //Getting all student data
        this.GetAllStudent();

        //Get list of classes
        this.http.get<string[]>('http://localhost:9999/class').subscribe({
            next: (data) => {
                console.log("Class list");
                console.log(data);
                
                this.classList = data;
            }
        });

        //Get list of boards
        this.http.get<string[]>('http://localhost:9999/board').subscribe({
            next: (data) => {
                console.log("Board list");
                console.log(data);

                this.boardList = data;
            }
        });

        //Get list of subjects
        this.http.get<string[]>('http://localhost:9999/subject').subscribe({
            next: (data) => {
                console.log("Subject list");
                console.log(data);

                this.subjectList = data;
            }
        });
    }

    //Fetch all student data from DB
    GetAllStudent(){
        this.http.get<StudentModel[]>('http://localhost:9999/students').subscribe({
            next: (data) => {
                console.log("STUDENT LIST");   
                this.S_StudentDataSource.next(data);
            }
        });
    }

    GetStudent(id: number){
        return this.http.get<StudentModel>('http://localhost:9999/students/'+id);
    }

    AddStudent(student: StudentModel){        
        console.log(student);
        
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

    UpdateSession(id: number, sessionList: SessionModel[]){
        return this.http.post<SessionModel[]>('http://localhost:9999/students/'+id+'/session', sessionList);
    }

    DeleteStudent(id: number | undefined){
        this.http.delete("http://localhost:9999/students/"+ id).subscribe(
            {
                complete: () => this.GetAllStudent()
            }
        );
    }

    GetFees()
    {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;

        this.feesAuditService.GetFeesAudit(year + "-" + month + "-" + "1");
    }
}