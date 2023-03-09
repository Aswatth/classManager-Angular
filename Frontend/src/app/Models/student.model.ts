import { SessionModel } from "./session.model";

export class StudentModel{
    id?: number;
    studentName!: string;
    schoolName!: string;
    className!: string;
    boardName!: string;
    location!: string;
    studentPhNum!: string;
    parentPhNum1!: string;
    parentPhNum2!: string | null;
    sessionList!: SessionModel[];

    // AssignStudentInfo(personalInfo: PersonalInfoModel, sessionList: SessionModel[]){
    //     this.studentName = personalInfo.studentName;
    //     this.schoolName = personalInfo.schoolName;
    //     this.className = personalInfo.className;
    //     this.boardName = personalInfo.boardName;
    //     this.location = personalInfo.location;
    //     this.studentPhNum = personalInfo.studentPhNum;
    //     this.parentPhNum1 = personalInfo.parentPhNum1;
    //     this.parentPhNum2 = personalInfo.parentPhNum2;
    //     this.sessionList = sessionList;
    // }

    // GetPersonalInfo(){
    //     let personalInfo: PersonalInfoModel = new PersonalInfoModel();
        
    //     personalInfo.studentName = this.studentName;
    //     personalInfo.schoolName = this.schoolName;
    //     personalInfo.className = this.className;
    //     personalInfo.boardName = this.boardName;
    //     personalInfo.location = this.location;
    //     personalInfo.studentPhNum = this.studentPhNum;
    //     personalInfo.parentPhNum1 = this.parentPhNum1;
    //     personalInfo.parentPhNum2 = this.parentPhNum2;

    //     return personalInfo;
    // }
}