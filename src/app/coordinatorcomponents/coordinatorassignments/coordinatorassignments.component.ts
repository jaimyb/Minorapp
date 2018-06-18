import { Component, OnInit } from '@angular/core';
import { AssignmentImage } from '../../assignmentimage';
import { AssignmentService } from '../../assignment.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Assignment } from '../../assignment';

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

  constructor(private assignmentService: AssignmentService, private router: Router, private globalService: GlobalService) { 
    this.ParamSub = new Array<any>();
  }

  ngOnInit() {
    this.ParamSub.push(
      this.assignmentService.GetAllAssignments().subscribe(result => {
        this.Assignments = result;
        console.log(result);
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
    this.router.navigate(['/coordinatoropdrachtdetail', id]);
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
