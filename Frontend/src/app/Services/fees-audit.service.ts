import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { FeesModel } from "../Models/fees.model";

@Injectable({providedIn: 'root'})
export class FeesAuditService implements OnInit{

    S_FeesAuditData = new BehaviorSubject<FeesModel[]>([]);

    constructor(private http: HttpClient){}

    ngOnInit(): void {
        // let date = new Date();
        // let year = date.getFullYear();
        // let month = date.getMonth() + 1;

        // this.GetFeesAudit(year + "-" + month + "-" + "1");
    }

    GetFeesAudit(date: string){        
        this.http.post<FeesModel[]>("http://localhost:9999/fees",date).subscribe(
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

    SaveChanges(feesAuditList: FeesModel){
        console.log("Saving changes");

        this.http.put<FeesModel>("http://localhost:9999/fees", feesAuditList).subscribe();
    }
}