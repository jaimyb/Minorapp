import { Component, OnInit, OnDestroy } from '@angular/core';
import { Assignment } from '../assignment';
import { AssignmentService } from '../assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentStatus } from '../assignmentstatus';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { AssignmentImage } from '../assignmentimage';



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
  AssignmentProfileUrl: string;
  Images: Array<AssignmentImage>;
  AssignmentImageUrl: string;
  AssignmentPicture = null;
  DeletedImages: Array<AssignmentImage>;

  constructor(private assignmentService: AssignmentService, private route: ActivatedRoute, private router: Router) {
    this.Loaded = false;
    this.ParamSub = new Array<any>();
    this.AssignmentProfileUrl = '/assets/images/profile.png';
    this.AssignmentImageUrl = '/assets/images/plus.png';
    this.Images = new Array<AssignmentImage>();
    this.DeletedImages = new Array<AssignmentImage>();
   }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.assignmentService.GetAssignmentById(params['assignmentid']).subscribe(Assignment => {
        this.Assignment = Assignment;
        this.assignmentService.GetAllAssignmentStatuses().subscribe(statuses => {
          this.Statuses = statuses;
          this.assignmentService.GetImageDataByAssignmentId(params['assignmentid']).subscribe(images =>{
            this.Images = images;
            this.Loaded = true;
            setTimeout(() => {
              this.InitMaterializeCSS();   
            }, 1); 
          });
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
    this.ParamSub.push(this.assignmentService.PostAssignmentById(this.Assignment.Id, this.Assignment).subscribe(bool =>{
      let postImages = [];
      this.Images.forEach(image => {
        if(image.File != undefined){
          postImages.push(image);
        }
      });
      if(postImages.length != 0){
        this.assignmentService.PostAssignmentImages(this.Assignment.Id, this.Images).subscribe(bool => {
          
        });
      }
      this.DeletedImages.forEach(image => {
        this.assignmentService.DeleteImageById(image.ImageId).subscribe(bool =>{
          console.log('image deleted: ' + image.ImageId);
        });
      });
      this.Succes = bool;
    }));
    setTimeout(() => {
      this.Succes = false; 
    }, 5000);
  }

  onProfileSelected(event){
    this.AssignmentPicture = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.AssignmentProfileUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
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
    if(image.ImageId != undefined)
    {
      this.DeletedImages.push(image);
    }
    this.Images.splice(this.Images.indexOf(image),1);
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
