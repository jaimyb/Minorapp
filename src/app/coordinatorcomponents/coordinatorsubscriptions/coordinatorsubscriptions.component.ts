import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../subscription';
import { GlobalService } from '../../global.service';
import { SubscriptionService } from '../../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { AssignmentStatus } from '../../assignmentstatus';
import { AssignmentService } from '../../assignment.service';
import * as $ from 'jquery';
import * as M from 'materialize-css';

@Component({
  selector: 'app-coordinatorsubscriptions',
  templateUrl: './coordinatorsubscriptions.component.html',
  styleUrls: ['./coordinatorsubscriptions.component.css']
})
export class CoordinatorsubscriptionsComponent implements OnInit {

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

  constructor(private assignmentService: AssignmentService, private globalService: GlobalService, private subscriptionService: SubscriptionService,private route: ActivatedRoute) { 
    this.ParamSub = new Array<any>();
    this.SchoolYearFilter = this.GetSchoolyear();
    this.Loaded = false;
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionService.GetAllSubscriptionsByYear(this.SchoolYearFilter).subscribe(subscriptions =>{
        this.Subscriptions = subscriptions;
        this.subscriptionService.GetAllSubscriptionStatuses().subscribe(statuses =>{
          this.Statuses = statuses;
          this.assignmentService.GetAllAssignmentSchoolYears().subscribe(years =>{
            this.assignmentService.GetAllAssignmentSemesters().subscribe(semesters =>{
              this.Semesters = semesters;
              this.Loaded = true;
              setTimeout(() => {
                this.InitMaterializeCSS();   
              }, 1); 
            });
            this.SchoolYears = years;              
          });
        });
      });
    }));
  }

  InitMaterializeCSS(){
    M.updateTextFields();
    M.AutoInit();
  }

  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
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
      this.subscriptionService.GetAllSubscriptionsByYear(this.SchoolYearFilter).subscribe(subscriptions =>{
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
