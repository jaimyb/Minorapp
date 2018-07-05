import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../assignment';
import { AssignmentStatus } from '../../assignmentstatus';
import { AssignmentImage } from '../../assignmentimage';
import { AssignmentService } from '../../assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-coordinatoreditassignment',
  templateUrl: './coordinatoreditassignment.component.html',
  styleUrls: ['./coordinatoreditassignment.component.css']
})
export class CoordinatoreditassignmentComponent implements OnInit {

  form: FormGroup;
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
  DeletedImages: Array<AssignmentImage>;
  SchoolYears: Array<string>;
  Semesters: Array<any>;
  

  constructor(private fb: FormBuilder,private assignmentService: AssignmentService, private route: ActivatedRoute, private router: Router) {
    this.Loaded = false;
    this.ParamSub = new Array<any>();
    this.Images = new Array<AssignmentImage>();
    this.DeletedImages = new Array<AssignmentImage>();
    this.SchoolYears = new Array<string>();
    this.form = fb.group({
      title: ['', Validators.required],
      addmainimage: [''],
      addimage: [''],
      description: ['', Validators.required],
      status: ['', Validators.required],
      ec: ['', Validators.required],
      schoolyear: ['', Validators.required],
      semester: ['', Validators.required]
    }, { });
   }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.assignmentService.GetAssignmentById(params['opdrachtid']).subscribe(Assignment => {
        this.Assignment = Assignment;
        this.assignmentService.GetAllAssignmentStatuses().subscribe(statuses => {
          this.Statuses = statuses;
          this.assignmentService.GetImageDataByAssignmentId(params['opdrachtid']).subscribe(images =>{
            this.Images = images;
            this.assignmentService.GetAllAssignmentSchoolYears().subscribe(years =>{
              this.SchoolYears = years;
              console.log(this.SchoolYears)
              this.assignmentService.GetAllAssignmentSemesters().subscribe(semesters =>{
                this.Semesters = semesters;
                this.Loaded = true;
                setTimeout(() => {
                  this.InitMaterializeCSS();   
                }, 1);
              });
            });
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
      this.router.navigate(['coordinatoropdrachten']);
    }));
    setTimeout(() => {
      this.Succes = false; 
    }, 5000);
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
          this.router.navigate(['/coordinatoropdrachten']);
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
