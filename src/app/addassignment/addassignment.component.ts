import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { AssignmentStatus } from '../assignmentstatus';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { Assignment } from '../assignment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addassignment',
  templateUrl: './addassignment.component.html',
  styleUrls: ['./addassignment.component.css']
})
export class AddassignmentComponent implements OnInit, OnDestroy {

  AssignmentTitle: string;
  AssignmentStatusId: number;
  AssignmentEc: number;
  AssignmentDescription: string;
  ParamSub: Array<any>;
  Statuses: Array<AssignmentStatus>;
  Loaded: boolean;
  Ec = [{Id: 1, ec: 5},
    {Id: 2, ec: 10},
    {Id: 3, ec: 15}
   ];
  Error: boolean;
  
  constructor(private assignmentService: AssignmentService, private router: Router) { 
    this.ParamSub = new Array<any>();
  }

  ngOnInit() {
    this.ParamSub.push( 
      this.assignmentService.GetAllAssignmentStatuses().subscribe(statuses => {
        this.Statuses = statuses;
        this.Loaded = true;
        setTimeout(() => {
          this.InitMaterializeCSS();   
        }, 1); 
      }));
  }


  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  InitMaterializeCSS(){
    M.textareaAutoResize($('#description'));
    M.updateTextFields();
    M.AutoInit();
  }

  PostAssignment(){
    let assignment = new Assignment(null, this.AssignmentTitle, this.AssignmentDescription, this.AssignmentEc, this.AssignmentStatusId, 1);
    this.ParamSub.push(this.assignmentService.PostAssignment(assignment).subscribe(bool =>{
      if(bool){
        this.router.navigate(['/assignments']);
      }
      else{
        this.Error = true;
        setTimeout(() => {
          this.Error = false; 
        }, 5000);
      }
    })); 
  }
}
