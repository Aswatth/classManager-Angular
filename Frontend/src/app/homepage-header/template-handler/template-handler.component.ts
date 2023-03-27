import { Component } from '@angular/core';

@Component({
  selector: 'app-template-handler',
  templateUrl: './template-handler.component.html',
  styleUrls: ['./template-handler.component.css']
})
export class TemplateHandlerComponent {
  ChooseFile(event: any)
  {
    console.log("File uploading...");   
    // console.log(event.target.files[0]);
     
    // let file = event.target.files[0];

    // this.excelService.ImportStudentTemplate(file);
  }
}
