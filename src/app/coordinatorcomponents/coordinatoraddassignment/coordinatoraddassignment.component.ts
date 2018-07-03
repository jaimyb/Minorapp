import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../assignment.service';
import { Router } from '@angular/router';
import { AssignmentStatus } from '../../assignmentstatus';
import { Assignment } from '../../assignment';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { AssignmentImage } from '../../assignmentimage';
import { AuthenticationService } from '../../authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-coordinatoraddassignment',
  templateUrl: './coordinatoraddassignment.component.html',
  styleUrls: ['./coordinatoraddassignment.component.css']
})
export class CoordinatoraddassignmentComponent implements OnInit {

  Assignment: Assignment;
  ParamSub: Array<any>;
  Statuses: Array<AssignmentStatus>;
  Loaded: boolean;
  Ec = [{Id: 1, ec: 5},
    {Id: 2, ec: 10},
    {Id: 3, ec: 15}
   ];
  Error: boolean;
  Images: Array<AssignmentImage>;
  SchoolYears: Array<string>;
  Semesters: Array<any>;
  form: FormGroup;
  
  constructor(private fb: FormBuilder,private assignmentService: AssignmentService, private router: Router, private authenticationService: AuthenticationService) { 
    this.Assignment = new Assignment();
    this.Assignment.AssignmentImage = new AssignmentImage(null,'/assets/images/profile.png');
    this.ParamSub = new Array<any>();
    this.Images = new Array<AssignmentImage>();
    this.SchoolYears = new Array<string>();
    this.form = fb.group({
      title: ['', Validators.required],
      addmainimage: ['', Validators.required],
      addimage: [''],
      description: ['', Validators.required],
      status: ['', Validators.required],
      ec: ['', Validators.required],
      schoolyear: ['', Validators.required],
      semester: ['', Validators.required]
    }, { });
  }

  ngOnInit() {
    this.ParamSub.push( 
      this.assignmentService.GetAllAssignmentStatuses().subscribe(statuses => {
        this.Statuses = statuses;
        this.assignmentService.GetAllAssignmentSchoolYears().subscribe(years =>{
          this.SchoolYears = years;
          this.assignmentService.GetAllAssignmentSemesters().subscribe(semesters =>{
            this.Semesters = semesters;
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

  onProfileSelected(event){
    this.Assignment.AssignmentImage.File = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.Assignment.AssignmentImage.ImagePath = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  PostAssignment(){
    this.Assignment.CompanyId = this.authenticationService.CurrentUser.BedrijfId;
    console.log(this.Assignment);
    this.ParamSub.push(this.assignmentService.PostAssignment(this.Assignment).subscribe(response =>{
      if(response.ok){
        this.ParamSub.push(this.assignmentService.PostAssignmentImages(response.json().insertId, this.Images).subscribe(bool => {
          if(bool){
            this.router.navigate(['coordinatoropdrachten']);
          }
          else{
            
          }
        }));
      }
      else{
        this.Error = true;
        setTimeout(() => {
          this.Error = false; 
        }, 5000);
      }
    })); 
  }

  onImageSelected(event)
  {
    let url;
    let image: AssignmentImage;
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          url = event.target.result;
          image = new AssignmentImage(null, url);
          image.File = file;
          this.Images.push(image);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  DeleteImage(image){
    this.Images.splice(this.Images.indexOf(image),1);
  }

}
