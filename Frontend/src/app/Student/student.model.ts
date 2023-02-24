import { PersonalInfoModel } from "./add-student/personal-info/personal-info.model";
import { SessionModel } from "./add-student/session-info/session.model";

export class StudentModel extends PersonalInfoModel{
    id?: number;
    sessionList!: SessionModel[];

    AssignStudentInfo(personalInfo: PersonalInfoModel, sessionList: SessionModel[]){
        this.studentName = personalInfo.studentName;
        this.schoolName = personalInfo.schoolName;
        this.className = personalInfo.className;
        this.boardName = personalInfo.boardName;
        this.location = personalInfo.location;
        this.studentPhNum = personalInfo.studentPhNum;
        this.parentPhNum1 = personalInfo.parentPhNum1;
        this.parentPhNum2 = personalInfo.parentPhNum2;
        this.sessionList = sessionList;
    }
}