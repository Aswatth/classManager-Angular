export class FeesModel{
    id!: number;
    studentId!: number;
    studentName!: string;
    className!: string;
    boardName!: string;
    feesDate!: Date;
    subjects!: string;
    fees!: number;
    paidOn!: Date;
    modeOfPayment!: string;
    comments!: string;
}