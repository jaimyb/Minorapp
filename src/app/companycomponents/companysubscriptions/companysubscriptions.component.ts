import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../subscription';
import { SubscriptionService } from '../../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { AssignmentStatus } from '../../assignmentstatus';
import { SubscriptionStatus } from '../../subscriptionstatus';
import { AssignmentService } from '../../assignment.service';
import * as $ from 'jquery';
import * as M from 'materialize-css';

@Component({
  selector: 'app-companysubscriptions',
  templateUrl: './companysubscriptions.component.html',
  styleUrls: ['./companysubscriptions.component.css']
})
export class CompanysubscriptionsComponent implements OnInit {

  ParamSub: Array<any>;
  Subscriptions: Array<Subscription>
  Loaded: boolean;
  Search: string;
  OrderByProp: string;
  StatusFilter: string;
  Statuses: Array<SubscriptionStatus>;
  SchoolYearFilter: string;
  SchoolYears: Array<string>;
  SemesterFilter: string;
  Semesters: Array<any>;
  AssignmentId: string;

  constructor(private assignmentService: AssignmentService, private subscriptionService: SubscriptionService, private route: ActivatedRoute, private authenticationService: AuthenticationService) { 
    this.ParamSub = new Array<any>();
    this.AssignmentId = null;
    this.SchoolYearFilter = this.GetSchoolyear();
    this.Loaded = false;
  }

  ngOnInit() {
    this.ParamSub.push( 
      this.subscriptionService.GetAllSubscriptionsByCompanyIdByYear(this.authenticationService.CurrentUser.BedrijfId, this.SchoolYearFilter).subscribe(subscriptions =>{
        this.Subscriptions = subscriptions;
        console.log(subscriptions);
        this.subscriptionService.GetAllSubscriptionStatuses().subscribe(statuses =>{
          this.Statuses = statuses;
          this.assignmentService.GetAllAssignmentSchoolYears().subscribe(years =>{
            this.SchoolYears = years;
            this.assignmentService.GetAllAssignmentSemesters().subscribe(semesters =>{
              this.Semesters = semesters;
              this.Loaded = true;
              setTimeout(() => {
                this.InitMaterializeCSS();   
              }, 1); 
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
    this.ParamSub.push(
      this.subscriptionService.GetAllSubscriptionsByCompanyIdByYear(this.authenticationService.CurrentUser.BedrijfId,this.SchoolYearFilter).subscribe(subscriptions =>{
        this.Subscriptions = subscriptions;
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
