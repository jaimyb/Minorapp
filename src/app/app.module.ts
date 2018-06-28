import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { AssignmentService } from './assignment.service';
import { CompanyService } from './company.service';
import { AssignmentComponent } from './assignment/assignment.component';
import { StudentService } from './student.service';
import { GlobalService } from './global.service';
import { SubscriptionService } from './subscription.service';
import { SubscriptiondetailsComponent } from './subscriptiondetails/subscriptiondetails.component';
import { EditassignmentComponent } from './editassignment/editassignment.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from "angular2-materialize";
import { SubscribeComponent } from './subscribe/subscribe.component';
import { DataService } from './data.service';
import { AddassignmentComponent } from './addassignment/addassignment.component';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptor';
import { AuthenticationService } from './authentication.service';
import { StudentsignupComponent } from './studentsignup/studentsignup.component';
import { SigninComponent } from './signin/signin.component';
import { RolegaurdService } from './rolegaurd.service';
import { StudentassignmentsComponent } from './studentcomponents/studentassignments/studentassignments.component';
import { StudentassignmentdetailsComponent } from './studentcomponents/studentassignmentdetails/studentassignmentdetails.component';
import { StudentsubscribeComponent } from './studentcomponents/studentsubscribe/studentsubscribe.component';
import { StudentsubscriptiondetailsComponent } from './studentcomponents/studentsubscriptiondetails/studentsubscriptiondetails.component';
import { CompanyassignmentsComponent } from './companycomponents/companyassignments/companyassignments.component';
import { CompanyassignmentdetailsComponent } from './companycomponents/companyassignmentdetails/companyassignmentdetails.component';
import { CompanysubscriptionsComponent } from './companycomponents/companysubscriptions/companysubscriptions.component';
import { CompanysubscriptiondetailsComponent } from './companycomponents/companysubscriptiondetails/companysubscriptiondetails.component';
import { CompanyaddassignmentComponent } from './companycomponents/companyaddassignment/companyaddassignment.component';
import { CompanyeditassignmentComponent } from './companycomponents/companyeditassignment/companyeditassignment.component';
import { CoordinatoraddassignmentComponent } from './coordinatorcomponents/coordinatoraddassignment/coordinatoraddassignment.component';
import { CoordinatorassignmentdetailsComponent } from './coordinatorcomponents/coordinatorassignmentdetails/coordinatorassignmentdetails.component';
import { CoordinatorassignmentsComponent } from './coordinatorcomponents/coordinatorassignments/coordinatorassignments.component';
import { CoordinatoreditassignmentComponent } from './coordinatorcomponents/coordinatoreditassignment/coordinatoreditassignment.component';
import { CoordinatorsubscriptiondetailsComponent } from './coordinatorcomponents/coordinatorsubscriptiondetails/coordinatorsubscriptiondetails.component';
import { CoordinatorsubscriptionsComponent } from './coordinatorcomponents/coordinatorsubscriptions/coordinatorsubscriptions.component';
import { StudentsubscriptionsComponent } from './studentcomponents/studentsubscriptions/studentsubscriptions.component';
import { CoordinatorassignmentsubscriptionsComponent } from './coordinatorcomponents/coordinatorassignmentsubscriptions/coordinatorassignmentsubscriptions.component';
import { OrderBy } from './orderBy';
import { SearchPipe } from './searchPipe';
import { StatusPipe } from './statusPipe';
import { SchoolYearPipe } from './schoolyearPipe';
import { SemesterPipe } from './semesterPipe';
import { ParseService } from './parse.service';
import { CompanysignupComponent } from './companysignup/companysignup.component';
import { CoordinatormanageComponent } from './coordinatorcomponents/coordinatormanage/coordinatormanage.component';
import { PasswordlostComponent } from './passwordlost/passwordlost.component';
import { RecoverpasswordComponent } from './recoverpassword/recoverpassword.component';


@NgModule({
  declarations: [
    SemesterPipe,
    SchoolYearPipe,
    StatusPipe,
    SearchPipe,
    OrderBy,
    AppComponent,
    HomeComponent,
    AssignmentsComponent,
    SubscriptionsComponent,
    AssignmentComponent,
    SubscriptiondetailsComponent,
    EditassignmentComponent,
    SubscribeComponent,
    AddassignmentComponent,
    StudentsignupComponent,
    SigninComponent,
    StudentassignmentsComponent,
    StudentassignmentdetailsComponent,
    StudentsubscribeComponent,
    StudentsubscriptiondetailsComponent,
    CompanyassignmentsComponent,
    CompanyassignmentdetailsComponent,
    CompanysubscriptionsComponent,
    CompanysubscriptiondetailsComponent,
    CompanyaddassignmentComponent,
    CompanyeditassignmentComponent,
    CoordinatoraddassignmentComponent,
    CoordinatorassignmentdetailsComponent,
    CoordinatorassignmentsComponent,
    CoordinatoreditassignmentComponent,
    CoordinatorsubscriptiondetailsComponent,
    CoordinatorsubscriptionsComponent,
    StudentsubscriptionsComponent,
    CoordinatorassignmentsubscriptionsComponent,
    CompanysignupComponent,
    CoordinatormanageComponent,
    PasswordlostComponent,
    RecoverpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [AssignmentService, CompanyService, StudentService, GlobalService, SubscriptionService, AuthenticationService, DataService,
    CookieService,
    RolegaurdService,
    ParseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
