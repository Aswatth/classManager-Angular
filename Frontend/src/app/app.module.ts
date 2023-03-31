import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule, Route} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomepageHeaderComponent } from './homepage-header/homepage-header.component';
import { StudentListComponent } from './Student/student-list/student-list.component';
import { AddStudentComponent } from './Student/add-student/add-student.component';
import { PersonalInfoComponent } from './Student/personal-info/personal-info.component';
import { SessionInfoComponent } from './Student/session-info/session-info.component';
import { ReviewSubmitComponent } from './Student/review-submit/review-submit.component';
import { StudentDetailComponent } from './Student/student-detail/student-detail.component';
import { TestInfoComponent } from './Student/test-info/test-info.component';
import { SessionDataComponent } from './Student/session-info/session-data/session-data.component';
import { FeesAuditComponent } from './Fees/fees-audit/fees-audit.component';
import { CbsHandlerComponent } from './cbs-handler/cbs-handler.component';
import { Date2Time } from './Pipes/date2time.pipe';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ToolbarModule} from 'primeng/toolbar';
import {StepsModule} from 'primeng/steps';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SplitterModule} from 'primeng/splitter';
import {MultiSelectModule} from 'primeng/multiselect';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { ListboxModule } from 'primeng/listbox';
import { ScrollerModule } from 'primeng/scroller';

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
    //children: popupRoute
  },
  {
    path: 'fees',
    component: FeesAuditComponent
  }
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
    SessionDataComponent,
    FeesAuditComponent,
    Date2Time,
    TestInfoComponent,
    HomepageHeaderComponent,
    CbsHandlerComponent
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
    ChartModule,
    CardModule,
    RadioButtonModule,
    CheckboxModule,
    CascadeSelectModule,
    MenuModule,
    FileUploadModule,
    ListboxModule,
    ScrollerModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
