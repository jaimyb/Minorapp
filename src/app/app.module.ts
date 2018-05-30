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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssignmentsComponent,
    SubscriptionsComponent,
    AssignmentComponent,
    SubscriptiondetailsComponent,
    EditassignmentComponent,
    SubscribeComponent,
    AddassignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [AssignmentService, CompanyService, StudentService, GlobalService, SubscriptionService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
