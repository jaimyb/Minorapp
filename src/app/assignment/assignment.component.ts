import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { Assignment } from '../assignment';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { GlobalService } from '../global.service';
import { DataService } from '../data.service';
import { AssignmentImage } from '../assignmentimage';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit, OnDestroy {

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
      this.assignmentService.GetAssignmentById(params['id']).subscribe(Assignment => {
        this.Assignment = Assignment;
        this.studentService.GetStudentsByProjectId(this.Assignment.Id).subscribe(result => {
          this.Students = result;
          this.assignmentService.GetImageDataByAssignmentId(params['id']).subscribe(images =>{
            this.Images = images;
            this.Loaded = true;
          });
        });
      });
   }));
  }

  ngOnDestroy() {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  Subscribe(){
    this.DataAssignment = this.Assignment;
    this.router.navigate(['/subscribe']);
  }
}
