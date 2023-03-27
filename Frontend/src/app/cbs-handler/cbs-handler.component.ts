import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CbsSerice } from '../Services/cbs.service';
import { StudentService } from '../Services/student.service';

@Component({
  selector: 'app-cbs-handler',
  templateUrl: './cbs-handler.component.html',
  styleUrls: ['./cbs-handler.component.css']
})
export class CbsHandlerComponent implements OnInit{

  @Input() dataList: string[] = [];
  @Input() type: string = "";

  selectedData!: string;

  inputData!: string;

  constructor(private cbsService: CbsSerice, private messageService: MessageService){}

  ngOnInit()
  {
  }

  OnClick(item: any)
  {
    this.selectedData = item;
    this.inputData = this.selectedData;
  }

  UpdateData()
  {
    console.log("Updating data");
    let existsAlready = false;
    this.dataList.forEach(e=>{
      if(e.toLocaleLowerCase() == this.inputData.toLocaleLowerCase())
      {
        this.messageService.add({key:"filter-add", severity: 'warn', detail: this.inputData + ' already exists'});
        existsAlready = true;
        return;
      }
    });
    if(!existsAlready)
    {
      let formattedData;
      if(this.type == "class" || this.type == "board")
      {
        formattedData = this.inputData.toUpperCase();
      }
      else
      {
        formattedData = this.inputData.charAt(0).toUpperCase() + this.inputData.slice(1);
      }
      this.dataList.push(formattedData);
      console.log(this.dataList); 
      this.cbsService.Update(this.dataList, this.type);
    }   
  }

  DeleteItem(item: string)
  {
    this.cbsService.SafeToDelete(item, this.type).subscribe({
      next: (data) => {
        if(data == true)
        {
          console.log("Safe to delete");
          let index = this.dataList.indexOf(item)
          this.dataList.splice(index, 1);
          this.cbsService.Update(this.dataList, this.type);
        }
        else{
          if(this.type == "class" || this.type == "board")
            this.messageService.add({key:"filter-add", severity: 'error', detail: "A student exists for " + item});
          else
            this.messageService.add({key:"filter-add", severity: 'error', detail: "A session exists for " + item});
        }
      }
    });
  }
}
