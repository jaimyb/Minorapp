import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../assignment.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Assignment } from '../../assignment';
import { AssignmentImage } from '../../assignmentimage';
import { AssignmentStatus } from '../../assignmentstatus';
import * as $ from 'jquery';
import * as M from 'materialize-css';

@Component({
  selector: 'app-studentassignments',
  templateUrl: './studentassignments.component.html',
  styleUrls: ['./studentassignments.component.css']
})
export class StudentassignmentsComponent implements OnInit {

  Assignments: Array<Assignment>;
  ComapanyImageUrl: string;
  Loaded: boolean;
  ParamSub: Array<any>;
  Images: Array<AssignmentImage>;
  OrderByProp: string;
  Search: string;
  StatusFilter: string;
  Statuses: Array<AssignmentStatus>;
  SchoolYearFilter: string;
  SchoolYears: Array<string>;
  SemesterFilter: string;
  Semesters: Array<any>; 

  constructor(private assignmentService: AssignmentService, private router: Router, private globalService: GlobalService) { 
    this.ParamSub = new Array<any>();
    this.SchoolYearFilter = this.GetSchoolyear();
  }

  ngOnInit() {
    this.ParamSub.push(
      this.assignmentService.GetAllAvailibleAssignments(this.SchoolYearFilter).subscribe(result => {
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

  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  InitMaterializeCSS(){
    M.AutoInit();
  }

  AssignmentClick(id){
    this.router.navigate(['/assignment-details', id]);
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
      this.assignmentService.GetAllAvailibleAssignments(this.SchoolYearFilter).subscribe(result => {
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
