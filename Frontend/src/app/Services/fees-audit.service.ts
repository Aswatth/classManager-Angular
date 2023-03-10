import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { FeesAuditModel } from "../Models/fees-audit.model";
import { FeesDataModel } from "../Models/fees-data.model";

@Injectable({providedIn: 'root'})
export class FeesAuditService implements OnInit{

    S_FeesAuditData = new BehaviorSubject<FeesDataModel[]>([]);

    constructor(private http: HttpClient){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;

        this.GetFeesAudit(year + "-" + month + "-" + "1");
    }

    ngOnInit(): void {
        // let date = new Date();
        // let year = date.getFullYear();
        // let month = date.getMonth() + 1;

        // this.GetFeesAudit(year + "-" + month + "-" + "1");
    }

    GetFeesAudit(date: string){        
        this.http.post<FeesDataModel[]>("http://localhost:9999/fees",date).subscribe(
            data => {
                console.log(data);
                
                this.S_FeesAuditData.next(data);
            }
        );
    }

    GetDates()
    {
        return this.http.get<Date[]>("http://localhost:9999/dates");
    }

    SaveChanges(feesAuditList: FeesDataModel){
        console.log("Saving changes");

        this.http.put<FeesDataModel>("http://localhost:9999/fees", feesAuditList).subscribe();
    }
}