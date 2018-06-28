import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { SubscriptionService } from '../../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from '../../subscription';
import { AuthenticationService } from '../../authentication.service';
import { AssignmentStatus } from '../../assignmentstatus';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { AssignmentService } from '../../assignment.service';

@Component({
  selector: 'app-studentsubscriptions',
  templateUrl: './studentsubscriptions.component.html',
  styleUrls: ['./studentsubscriptions.component.css']
})
export class StudentsubscriptionsComponent implements OnInit {

  ParamSub: Array<any>;
  Subscriptions: Array<Subscription>
  Loaded: boolean;
  Search: string;
  OrderByProp: string;
  StatusFilter: string;
  Statuses: Array<AssignmentStatus>;
  SchoolYearFilter: string;
  SchoolYears: Array<string>;
  SemesterFilter: string;
  Semesters: Array<any>; 

  constructor(private assignmentService: AssignmentService, private authenticationService: AuthenticationService,private globalService: GlobalService, private subscriptionService: SubscriptionService,private route: ActivatedRoute) { 
    this.ParamSub = new Array<any>();
    this.Loaded = false;
    this.SchoolYearFilter = this.GetSchoolyear();
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionService.GetAllSubscriptionsByStudentId(this.authenticationService.CurrentUser.StudentId,this.SchoolYearFilter).subscribe(subscriptions =>{
        this.Subscriptions = subscriptions;
        this.subscriptionService.GetAllSubscriptionStatuses().subscribe(statuses => {
          this.Statuses = statuses;
          this.assignmentService.GetAllAssignmentSchoolYears().subscribe(years => {
            this.SchoolYears = years;
            this.assignmentService.GetAllAssignmentSemesters().subscribe(semesters => {
              this.Semesters = semesters;
              this.Loaded = true;
              setTimeout(() => {
                this.InitMaterializeCSS();   
              }, 1); 
            });         
          });
        });  
      });
    }));
  }

  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  InitMaterializeCSS(){
    M.AutoInit();
  }

  ChangeOrder(event){
    console.log(event.srcElement.innerHTML);
    switch(event.srcElement.innerHTML){
      case "Project":
        this.OrderByProp = "Assignment.Title"
      break;
      case "Naam":
        this.OrderByProp = "Student.Name"
      break;
      case "Email":
        this.OrderByProp = "Student.Email"
      break;
      case "Status":
        this.OrderByProp = "Subscription"
      break;
    }
  }

  onYearChange(event){
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionService.GetAllSubscriptionsByStudentId(this.authenticationService.CurrentUser.StudentId,this.SchoolYearFilter).subscribe(subscriptions =>{
        this.Subscriptions = subscriptions;
      });
    }));
  }
  
  GetSchoolyear(): string{
    let year = Number(new Date().getFullYear());
    if(new Date().getMonth() < 7){
      return (year - 1).toString() + '-' + year.toString(); 
    }
    else{
      return year.toString() + '-' + (year + 1).toString(); 
    }
  }
}
