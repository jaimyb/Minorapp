import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../assignment';
import { AssignmentImage } from '../../assignmentimage';
import { AssignmentService } from '../../assignment.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { AuthenticationService } from '../../authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-companyaddassignment',
  templateUrl: './companyaddassignment.component.html',
  styleUrls: ['./companyaddassignment.component.css']
})
export class CompanyaddassignmentComponent implements OnInit {

  Assignment: Assignment;
  ParamSub: Array<any>;
  Loaded: boolean;
  Error: boolean;
  Images: Array<AssignmentImage>;
  form: FormGroup;
  
  constructor(private fb: FormBuilder, private assignmentService: AssignmentService, private router: Router, private authenticationService: AuthenticationService) { 
    this.Assignment = new Assignment();
    this.ParamSub = new Array<any>();
    this.Assignment.AssignmentImage = new AssignmentImage(null,'/assets/images/profile.png');
    this.Images = new Array<AssignmentImage>();
    this.form = fb.group({
      title: ['', Validators.required],
      addmainimage: [''],
      addimage: [''],
      description: ['', Validators.required],
    }, { });
  }

  ngOnInit() {
    this.Loaded = true;
    setTimeout(() => {
      this.InitMaterializeCSS();   
    }, 1); 
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

  GetSchoolyear(): string{
    let year = Number(new Date().getFullYear());
    if(new Date().getMonth() < 7){
      return (year - 1).toString() + '-' + year.toString(); 
    }
    else{
      return year.toString() + '-' + (year + 1).toString(); 
    }
  }

  PostAssignment(){
    this.Assignment.Ec = 10;
    this.Assignment.StatusId = 4;
    this.Assignment.Semester = 1;
    this.Assignment.SchoolYear = this.GetSchoolyear();
    this.Assignment.CompanyId = this.authenticationService.CurrentUser.BedrijfId;
    
    this.ParamSub.push(this.assignmentService.PostAssignment(this.Assignment).subscribe(response =>{
      if(response.ok){
        this.ParamSub.push(this.assignmentService.PostAssignmentImages(response.json().insertId, this.Images).subscribe(bool => {
          if(bool){
            this.router.navigate(['bedrijfopdrachten']);
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
