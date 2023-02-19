export class PersonalInfoModel{
    studentName!: string;
    schoolName!: string;
    className!: string;
    boardName!: string;
    location!: string;
    studentMobileNumber!: string;
    parentMobileNumber1!: string;
    parentMobileNumber2!: string;

    constructor(studentName: string, schoolName: string, className: string, boardName: string,
        location: string, studentMobileNumber: string, parentMobileNumber1: string, parentMobileNumber2: string){
            this.studentName = studentName;
            this.schoolName = schoolName;
            this.className = className;
            this.boardName = boardName;
            this.location = location;
            this.studentMobileNumber = studentMobileNumber;
            this.parentMobileNumber1 = parentMobileNumber1;
            this.parentMobileNumber2 = parentMobileNumber2;
    }
}