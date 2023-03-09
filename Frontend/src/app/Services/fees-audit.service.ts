import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FeesAuditModel } from "../Models/fees-audit.model";

@Injectable({providedIn: 'root'})
export class FeesAuditService{

    constructor(private http: HttpClient){}

    GetFeesAudit(){
        return this.http.get<FeesAuditModel[]>("http://localhost:9999/fees")
    }

    SaveChanges(feesAuditList: FeesAuditModel[]){
        console.log("Saving changes");
        
        type DataToSend = {
            feesDate: string,
            subject: string,
            studentId: number,
            paidOn: string,
            fees: number,
            comments: string
        }

        const dataList: DataToSend[] = [];

        feesAuditList.forEach(e => {
            const tempData: DataToSend = {
                feesDate: e.feesDate.toISOString().split('T')[0].toString(),
                subject: e.subject,
                studentId: e.studentId,
                fees: e.fees,
                paidOn : e.paidOn.toISOString().split('T')[0].toString(),
                comments: e.comments
            };
            dataList.push(tempData);
        })

        console.log(dataList);       

        this.http.put<DataToSend[]>("http://localhost:9999/fees", dataList).subscribe();
    }
}