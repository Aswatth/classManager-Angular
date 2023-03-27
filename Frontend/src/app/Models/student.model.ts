import { SessionModel } from "./session.model";

export class StudentModel{
    id?: number;
    studentName: string = "";
    schoolName: string = "";
    className: string  = "";
    boardName: string  = "";
    location: string  = "";
    studentPhNum?: string  = "";
    parentPhNum1: string  = "";
    parentPhNum2?: string | null  = "";
    sessionList: SessionModel[] = [];

    constructor(){};

    AddStudent(studentName:string, schoolName: string, boardName: string, className: string, 
        location: string, parentPhNum1: string, studentPhNum?: string, parentPhNum2?: string){
            this.studentName = studentName;
            this.schoolName = schoolName;
            this.boardName = boardName;
            this.className = className;
            this.location = location;
            this.studentPhNum = studentPhNum;
            this.parentPhNum1 = parentPhNum1;
            this.parentPhNum2 = parentPhNum2;
        }
}