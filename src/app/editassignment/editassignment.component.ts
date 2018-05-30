import { Component, OnInit, OnDestroy } from '@angular/core';
import { Assignment } from '../assignment';
import { AssignmentService } from '../assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentStatus } from '../assignmentstatus';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import * as $ from 'jquery';
import * as M from 'materialize-css';



@Component({
  selector: 'app-editassignment',
  templateUrl: './editassignment.component.html',
  styleUrls: ['./editassignment.component.css']
})
export class EditassignmentComponent implements OnInit, OnDestroy {


  Assignment: Assignment;
  Statuses: Array<AssignmentStatus>;
  Ec = [{Id: 1, ec: 5},
       {Id: 2, ec: 10},
       {Id: 3, ec: 15}
      ];
  SelectedStatus: AssignmentStatus;
  Loaded: boolean;
  ParamSub: Array<any>;
  Succes: boolean;
  Error: boolean;
  LocalUrl: string;
  AssignmentPicture = null;

  constructor(private assignmentService: AssignmentService, private route: ActivatedRoute, private router: Router) {
    this.Loaded = false;
    this.ParamSub = new Array<any>();
    this.LocalUrl = '/assets/images/profile.png';
   }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.assignmentService.GetAssignmentById(params['assignmentid']).subscribe(Assignment => {
        this.Assignment = Assignment;
        if(Assignment.AssignmentImagePath != null){
          this.LocalUrl = 'http://localhost:3000/' + Assignment.AssignmentImagePath;
        }
        this.assignmentService.GetAllAssignmentStatuses().subscribe(statuses => {
          this.Statuses = statuses;
          this.Loaded = true;
          setTimeout(() => {
            this.InitMaterializeCSS();   
          }, 1); 
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
    M.textareaAutoResize($('#description'));
    M.updateTextFields();
    M.AutoInit();
  }

  PostAssignment(){
    this.ParamSub.push(this.assignmentService.PostAssignmentById(this.Assignment.Id, this.Assignment, this.AssignmentPicture).subscribe(bool =>{
      this.Succes = bool;
    }));
    setTimeout(() => {
      this.Succes = false; 
    }, 5000);
  }

  onFileSelected(event){
    this.AssignmentPicture = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.LocalUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  DeleteAssignment(){
    var answer = confirm("Weet u het zeker dat u het project: " + this.Assignment.Title + " wilt verwijderen?")
    if (answer) {
      this.ParamSub.push(this.assignmentService.DeleteAssignmentById(this.Assignment.Id).subscribe(bool =>{
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

}
