import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { StudentService } from "./student.service";

@Injectable({
    providedIn: 'root'
})
export class CbsSerice{

    constructor(
        private http: HttpClient,
        private studentService: StudentService,
        private messageService: MessageService
        ){}

    Update(dataList: string[], cbsType: string)
    {
        this.http.post<string[]>("http://localhost:9999/"+cbsType,dataList).subscribe({
            next: data => {dataList = data;},
            complete: () => {
              if(cbsType == "class"){
                this.studentService.classList = dataList;
              }
              else if(cbsType == "board"){
                this.studentService.boardList = dataList;
              }
              else if(cbsType == "subject"){
                this.studentService.subjectList = dataList;
              }
            }
          });
    }

    SafeToDelete(itemToDelete: string, cbsType: string){
        return this.http.post<boolean>("http://localhost:9999/safe/"+cbsType, itemToDelete);
    }
}