import { Component, OnInit } from '@angular/core';
import { NewUser } from '../newuser';
import { Student } from '../student';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-studentsignup',
  templateUrl: './studentsignup.component.html',
  styleUrls: ['./studentsignup.component.css']
})
export class StudentsignupComponent implements OnInit {

  User: NewUser;
  Student: Student;
  Loaded: boolean;
  
  constructor(private authenticationService: AuthenticationService) {
    this.User = new NewUser();
    this.Student = new Student();
   }

  ngOnInit() {
    this.Loaded = true;
  }

  InitMaterializeCSS(){
    M.textareaAutoResize($('#description'));
    M.updateTextFields();
    M.AutoInit();
  }

  SignUp(){
   this.authenticationService.StudentSignUp(this.User,this.Student).subscribe(result =>{
     console.log("signed up me boiiiii");
   }); 
  }

}
