import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule, Route} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentListComponent } from './Student/student-list/student-list.component';
import { AddStudentComponent } from './Student/add-student/add-student.component';
import { PersonalInfoComponent } from './Student/add-student/personal-info/personal-info.component';
import { SessionInfoComponent } from './Student/add-student/session-info/session-info.component';
import { ReviewSubmitComponent } from './Student/add-student/review-submit/review-submit.component';
import { StudentDetailComponent } from './Student/student-detail/student-detail.component';
import { StudentService } from './Student/student.service';
import { AddSessionComponent } from './Session/add-session/add-session.component';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ToolbarModule} from 'primeng/toolbar';
import {StepsModule} from 'primeng/steps';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';


const routes: Routes = [
  {
    path: '', 
    component: StudentListComponent, 
    children: [{
    path: 'addStudent', 
    component: AddStudentComponent,
    children:[
      {path: '', redirectTo: 'personal', pathMatch: 'full'},
      {path: 'personal', component: PersonalInfoComponent},
      {path: 'session', component: SessionInfoComponent},
      {path: 'review_submit', component: ReviewSubmitComponent}
    ]}
  ]},
  {path: 'student/:id', component: StudentDetailComponent},
  
];

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    AddStudentComponent,
    PersonalInfoComponent,
    SessionInfoComponent,
    ReviewSubmitComponent,
    StudentDetailComponent,
    AddSessionComponent
  ],
  imports: [
    //Angular Modules
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),

    //PrimeNG modules
    ToolbarModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DialogModule,
    StepsModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
