import { SessionModel } from "./session.model";

export class StudentModel{
    id?: number;
    studentName: string = "";
    dateOfBirth: Date = new Date();
    schoolName: string = "";
    className: string  = "";
    boardName: string  = "";
    location: string  = "";
    studentPhNum?: string  = "";
    parentPhNum1: string  = "";
    parentPhNum2?: string | null  = "";
    sessionList: SessionModel[] = [];

    constructor(){};
}