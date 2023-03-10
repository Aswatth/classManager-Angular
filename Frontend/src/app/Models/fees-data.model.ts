import { FeesAuditModel } from "./fees-audit.model";

export class FeesDataModel{
    studentId!: number;
    studentName!: string;
    className!: string;
    boardName!: string;
    subjects!: string;
    feesAuditEntity!: FeesAuditModel;
}