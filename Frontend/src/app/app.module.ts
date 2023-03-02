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
import { SessionData } from './Student/add-student/session-info/session-data/session-data.component';

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
import {SplitterModule} from 'primeng/splitter';
import {MultiSelectModule} from 'primeng/multiselect';
import {InplaceModule} from 'primeng/inplace';
import {ChartModule} from 'primeng/chart';
import { Date2Time } from './Pipes/date2time.pipe';

const popupRoute: Routes = [{
  path: 'student-popup', 
    component: AddStudentComponent,
    children:[
      {path: '', redirectTo: 'personal', pathMatch: 'full'},
      {path: 'personal', component: PersonalInfoComponent},
      {path: 'session', component: SessionInfoComponent},
      {path: 'review_submit', component: ReviewSubmitComponent}
    ]
}];

const routes: Routes = [
  {
    path: '', 
    component: StudentListComponent, 
    children: popupRoute
  },
  {
    path: 'student/:id', 
    component: StudentDetailComponent, 
    children: popupRoute
  },
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
    SessionData,
    Date2Time
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
    CalendarModule,
    SplitterModule,
    MultiSelectModule,
    InplaceModule,
    ChartModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
