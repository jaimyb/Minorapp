import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../assignment';
import { AssignmentImage } from '../../assignmentimage';
import { AssignmentService } from '../../assignment.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-companyaddassignment',
  templateUrl: './companyaddassignment.component.html',
  styleUrls: ['./companyaddassignment.component.css']
})
export class CompanyaddassignmentComponent implements OnInit {

  AssignmentTitle: string;
  AssignmentStatusId: number;
  AssignmentEc: number;
  AssignmentDescription: string;
  ParamSub: Array<any>;
  Loaded: boolean;
  Error: boolean;
  AssignmentImage: AssignmentImage;
  Images: Array<AssignmentImage>;
  
  constructor(private assignmentService: AssignmentService, private router: Router, private authenticationService: AuthenticationService) { 
    this.ParamSub = new Array<any>();
    this.AssignmentImage = new AssignmentImage(null,'/assets/images/profile.png');
    this.Images = new Array<AssignmentImage>();
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
    this.AssignmentImage.File = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.AssignmentImage.ImagePath = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  PostAssignment(){
    let assignment = new Assignment(null, this.AssignmentTitle, this.AssignmentDescription, 10, 4, this.authenticationService.CurrentUser.BedrijfId);
    console.log(assignment);
    this.ParamSub.push(this.assignmentService.PostAssignment(assignment, this.AssignmentImage.File).subscribe(response =>{
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
