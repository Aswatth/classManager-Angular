import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FeesAuditModel } from "../Models/fees-audit.model";
import { FeesDataModel } from "../Models/fees-data.model";

@Injectable({providedIn: 'root'})
export class FeesAuditService{

    constructor(private http: HttpClient){}

    GetFeesAudit(){
        let date = new Date();
        let month  = date.getMonth() + 1;
        let year = date.getFullYear();
        
        return this.http.post<FeesDataModel[]>("http://localhost:9999/fees",year + "-"+month + "-"+"1");
    }

    SaveChanges(feesAuditList: FeesDataModel){
        console.log("Saving changes");

        this.http.put<FeesDataModel>("http://localhost:9999/fees", feesAuditList).subscribe();
    }
}