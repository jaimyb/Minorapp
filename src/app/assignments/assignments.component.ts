import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { Assignment } from '../assignment';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { AssignmentImage } from '../assignmentimage';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit, OnDestroy {

  Assignments: Array<Assignment>
  ComapanyImageUrl: string
  Loaded: boolean;
  ParamSub: Array<any>;
  Images: Array<AssignmentImage>;

  constructor(private assignmentService: AssignmentService, private router: Router, private globalService: GlobalService) { 
    this.ComapanyImageUrl = 'http://localhost:3000/uploads//4d33d0d4a9a4fab468941319839d1ae71527597200377DSC_8252.jpg';
    this.ParamSub = new Array<any>();
 
  }

  ngOnInit() {
    this.ParamSub.push(
      this.assignmentService.GetAllAssignments().subscribe(result => {
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
}
