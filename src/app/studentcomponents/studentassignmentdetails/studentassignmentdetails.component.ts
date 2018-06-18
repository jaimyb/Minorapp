import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../assignment';
import { Student } from '../../student';
import { AssignmentImage } from '../../assignmentimage';
import { DataService } from '../../data.service';
import { AssignmentService } from '../../assignment.service';
import { StudentService } from '../../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import * as $ from 'jquery';
import * as M from 'materialize-css';

@Component({
  selector: 'app-studentassignmentdetails',
  templateUrl: './studentassignmentdetails.component.html',
  styleUrls: ['./studentassignmentdetails.component.css']
})
export class StudentassignmentdetailsComponent implements OnInit {

  Assignment: Assignment;
  Students: Array<Student>;
  ParamSub: Array<any>;
  ComapanyImageUrl: string;
  Loaded: boolean;
  Images: Array<AssignmentImage>;

  set DataAssignment(value: Assignment) { 
    this.dataService.CurrentAssignment = value; 
  } 

  constructor(private dataService: DataService, private assignmentService: AssignmentService, private studentService: StudentService, private route: ActivatedRoute, private globalService: GlobalService, private router: Router) { 
    this.ParamSub = new Array<any>();
    this.ComapanyImageUrl = '/assets/images/profile.png';
    this.Images = new Array<AssignmentImage>();
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.ParamSub.push(this.assignmentService.GetAssignmentById(params['opdrachtid']).subscribe(Assignment => {
        this.Assignment = Assignment;
        this.ParamSub.push(this.studentService.GetStudentsByProjectId(this.Assignment.Id).subscribe(result => {
          this.Students = result;
          this.ParamSub.push(this.assignmentService.GetImageDataByAssignmentId(params['opdrachtid']).subscribe(images =>{
            this.Images = images;
            console.log(images);
            this.Loaded = true;
            setTimeout(() => {
              this.InitMaterializeCSS();   
            }, 1);
          }));
        }));
      }));
   }));
  }

  InitMaterializeCSS(){
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, 
      {fullWidth: true,
      indicators: true});
  }

  ngOnDestroy() {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  Subscribe(){
    this.DataAssignment = this.Assignment;
    this.router.navigate(['/studentintekenen']);
  }

}
