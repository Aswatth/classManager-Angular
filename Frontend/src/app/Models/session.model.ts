export class SessionModel{
    id?: number;
    studentId?: number;
    subject!: string;
    days!: string[];
    startTime!: Date | string;
    endTime!: Date | string;
    fees!: number;
}