import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Subscription } from '../../subscription';
import { GlobalService } from '../../global.service';
import { SubscriptionService } from '../../subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../../assignment';
import { AssignmentImage } from '../../assignmentimage';
import { AssignmentService } from '../../assignment.service';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { AssignmentStatus } from '../../assignmentstatus';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-companyassignments',
  templateUrl: './companyassignments.component.html',
  styleUrls: ['./companyassignments.component.css']
})
export class CompanyassignmentsComponent implements OnInit {

  Assignments: Array<Assignment>
  Loaded: boolean;
  ParamSub: Array<any>;
  OrderByProp: string;
  Search: string;
  StatusFilter: string;
  Statuses: Array<AssignmentStatus>;
  SchoolYearFilter: string;
  SchoolYears: Array<string>;
  SemesterFilter: string;
  Semesters: Array<any>; 


  constructor(private authenticationService: AuthenticationService,private ref: ChangeDetectorRef ,private assignmentService: AssignmentService, private router: Router, private globalService: GlobalService) { 
    this.ParamSub = new Array<any>();
    this.SchoolYearFilter = this.GetSchoolyear();
  }

  ngOnInit() {
    this.ParamSub.push(
      this.assignmentService.GetAllAssignmentsByCompanyIdByYear(this.authenticationService.CurrentUser.BedrijfId ,this.SchoolYearFilter).subscribe(result => {
        this.Assignments = result;
        this.assignmentService.GetAllAssignmentStatuses().subscribe(statuses => {
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
      })
    );
  }

  InitMaterializeCSS(){
    M.AutoInit();
  }

  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  AssignmentClick(id){
    this.router.navigate(['/bedrijfopdrachtdetail', id]);
  }

  ChangeOrder(event){
    console.log(event.srcElement.innerHTML);
    switch(event.srcElement.innerHTML){
      case "Project":
        this.OrderByProp = "Title"
      break;
      case "Bedrijf":
        this.OrderByProp = "Company.Name"
      break;
      case "Ec":
        this.OrderByProp = "Ec"
      break;
    }
  }

  onYearChange(event){
    this.ParamSub.push(
      this.assignmentService.GetAllAssignmentsByCompanyIdByYear(this.authenticationService.CurrentUser.BedrijfId ,this.SchoolYearFilter).subscribe(result => {
        this.Assignments = result;
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
