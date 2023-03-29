import { FeesModel } from "./fees.model";
import { SessionModel } from "./session.model";
import { StudentModel } from "./student.model";
import { TestModel } from "./test.model";

export class ExportModel{
    studentModelList: StudentModel[] = [];
    feesModelList: FeesModel[] = [];
    testModelList: TestModel[] = [];
    classList: string[] = [];
    boardList: string[] = [];
    subjectList: string[] = [];
}
export class StudentSheetData{
    studentName: string = "";
    schoolName: string = "";
    className: string  = "";
    boardName: string  = "";
    location: string  = "";
    studentPhNum?: string  = "";
    parentPhNum1: string  = "";
    parentPhNum2?: string | null  = "";
    subject!: string;
    days!: string;
    startTime!: string;
    endTime!: string;
    fees!: number;

    AddData(student: StudentModel, session: SessionModel)
    {
        this.studentName = student.studentName;
        this.schoolName = student.schoolName;
        this.className = student.className;
        this.boardName = student.boardName;
        this.location = student.location;
        this.studentPhNum = student.studentPhNum;
        this.parentPhNum1 = student.parentPhNum1;
        this.parentPhNum2 = student.parentPhNum2;
        this.subject = session.subject;
        this.days = session.days.join();
        this.startTime = new Date(session.startTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });        
        this.endTime = new Date(session.endTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        this.fees = session.fees;
    }
}
export class FeesSheetData{
    studentName!: string;
    className!: string;
    boardName!: string;
    feesDate!: string;
    subjects!: string;
    fees!: number;
    paidOn!: string|null;
    modeOfPayment!: string|null;
    comments!: string|null;

    AddData(feesModel: FeesModel)
    {
        this.studentName = feesModel.studentName;
        this.className = feesModel.className;
        this.boardName = feesModel.boardName;
        this.feesDate = new Date(feesModel.feesDate).toLocaleDateString('default', {month: 'short', year: 'numeric'});
        this.subjects = feesModel.subjects;
        this.fees = feesModel.fees;
        this.paidOn = feesModel.paidOn!=null?new Date(feesModel.paidOn).toLocaleDateString('default', {day: '2-digit',month: 'short', year: 'numeric'}):null;
        this.modeOfPayment = feesModel.modeOfPayment;
        this.comments = feesModel.comments;
    }
}
export class TestSheetData{
    studentName!: string;
    className!: string;
    boardName!: string;
    subject!: string;
    testName!: string;
    testDate!: string;
    marksScored!: number;
    totalMarks!: number;

    Add(studentName: string, testModel: TestModel)
    {
        this.studentName = studentName;
        this.className = testModel.className;
        this.boardName = testModel.boardName;
        this.subject = testModel.subject;
        this.testName = testModel.testName;
        this.testDate = new Date(testModel.testDate).toLocaleDateString('default', {day: '2-digit',month: 'short', year: 'numeric'});
        this.marksScored = testModel.marksScored;
        this.totalMarks = testModel.totalMarks;
    }
}
export class ClassSheetData{
    Classes!: string;

    Add(className: string)
    {
        this.Classes = className;
    }
}
export class BoardSheetData{
    Boards!: string;

    Add(board: string)
    {
        this.Boards = board;
    }
}
export class SubjectSheetData{
    Subjects!: string;

    Add(subject: string)
    {
        this.Subjects = subject;
    }
}