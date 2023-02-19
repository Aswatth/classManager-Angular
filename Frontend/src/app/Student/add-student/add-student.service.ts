import { Injectable } from '@angular/core';
import { StudentService } from '../student.service';
import { PersonalInfoModel } from './personal-info/personal-info.model';

@Injectable({providedIn: 'root'})
export class AddStudentService{

    boardList: string[] = ['CBSE', 'ICSE', 'STATE', 'IGCSE'];
    classList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'Other'];  

    personalInfo!: PersonalInfoModel;
    
    constructor(private studentService: StudentService){}

    AddStudent(){
        this.studentService.AddStudent(this.personalInfo);
    }
}