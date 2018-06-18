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

@Component({
  selector: 'app-companyassignments',
  templateUrl: './companyassignments.component.html',
  styleUrls: ['./companyassignments.component.css']
})
export class CompanyassignmentsComponent implements OnInit {

  Assignments: Array<Assignment>
  ComapanyImageUrl: string
  Loaded: boolean;
  ParamSub: Array<any>;
  Images: Array<AssignmentImage>;
  OrderByProp: string;
  Search: string;


  constructor(private ref: ChangeDetectorRef ,private assignmentService: AssignmentService, private router: Router, private globalService: GlobalService) { 
    this.ParamSub = new Array<any>();
  }

  ngOnInit() {
    this.ParamSub.push(
      this.assignmentService.GetAllAssignments().subscribe(result => {
        this.Assignments = result;
        console.log(result);
        this.Loaded = true;
        setTimeout(() => {
          this.InitMaterializeCSS();   
        }, 1); 
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


}
