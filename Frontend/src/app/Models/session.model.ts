export class SessionModel{
    id?: number;
    studentId?: number;
    subject!: string;
    days!: string[];
    startTime!: Date;
    endTime!: Date;
    fees!: number;
}