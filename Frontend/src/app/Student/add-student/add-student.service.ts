import { Injectable } from '@angular/core';
import { StudentService } from '../student.service';
import { PersonalInfoModel } from './personal-info/personal-info.model';

@Injectable({providedIn: 'root'})
export class AddStudentService{


    personalInfo!: PersonalInfoModel;
    
    constructor(private studentService: StudentService){}

    AddStudent(){
        this.studentService.AddStudent(this.personalInfo);
    }
}