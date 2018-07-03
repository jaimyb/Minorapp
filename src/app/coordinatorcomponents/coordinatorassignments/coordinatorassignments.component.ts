import { Component, OnInit } from '@angular/core';
import { AssignmentImage } from '../../assignmentimage';
import { AssignmentService } from '../../assignment.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Assignment } from '../../assignment';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { AssignmentStatus } from '../../assignmentstatus';

@Component({
  selector: 'app-coordinatorassignments',
  templateUrl: './coordinatorassignments.component.html',
  styleUrls: ['./coordinatorassignments.component.css']
})
export class CoordinatorassignmentsComponent implements OnInit {

  Assignments: Array<Assignment>
  ComapanyImageUrl: string
  Loaded: boolean;
  ParamSub: Array<any>;
  Images: Array<AssignmentImage>;
  Search: string;
  OrderByProp: string;
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
      this.assignmentService.GetAllAssignmentsByYear(this.SchoolYearFilter).subscribe(result => {
        this.Assignments = result;
      }));
    this.assignmentService.GetAllAssignmentStatuses().subscribe(statuses => {
      this.Statuses = statuses;
    });
    this.assignmentService.GetAllAssignmentSchoolYears().subscribe(years => {
      this.SchoolYears = years;
    });
    this.assignmentService.GetAllAssignmentSemesters().subscribe(semesters => {
      this.Semesters = semesters;
      this.Loaded = true;
      setTimeout(() => {
        this.InitMaterializeCSS();
      }, 1);
    });
  }

  InitMaterializeCSS() {
    M.AutoInit();
  }

  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  AssignmentClick(id) {
    this.router.navigate(['/coordinatoropdrachtdetail', id]);
  }

  onYearChange(event) {
    this.ParamSub.push(
      this.assignmentService.GetAllAssignmentsByYear(this.SchoolYearFilter).subscribe(result => {
        this.Assignments = result;
      }));
  }


  GetSchoolyear(): string {
    let year = Number(new Date().getFullYear());
    if (new Date().getMonth() < 7) {
      return (year - 1).toString() + '-' + year.toString();
    }
    else {
      return year.toString() + '-' + (year + 1).toString();
    }
  }

  ChangeOrder(event) {
    console.log(event.srcElement.innerHTML);
    switch (event.srcElement.innerHTML) {
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
}

