import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../assignment.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Assignment } from '../../assignment';
import { AssignmentImage } from '../../assignmentimage';

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

  constructor(private assignmentService: AssignmentService, private router: Router, private globalService: GlobalService) { 
    this.ParamSub = new Array<any>();
 
  }

  ngOnInit() {
    this.ParamSub.push(
      this.assignmentService.GetAllAvailibleAssignments().subscribe(result => {
        this.Assignments = result;
        this.Loaded = true;
      })
    );
  }

  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
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
}
