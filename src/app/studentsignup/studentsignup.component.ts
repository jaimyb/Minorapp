import { Component, OnInit } from '@angular/core';
import { NewUser } from '../newuser';
import { Student } from '../student';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from '../Validators/PasswordValidation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-studentsignup',
  templateUrl: './studentsignup.component.html',
  styleUrls: ['./studentsignup.component.css']
})
export class StudentsignupComponent implements OnInit {

  User: NewUser;
  Student: Student;
  Loaded: boolean;
  form: FormGroup;
  
  constructor(private authenticationService: AuthenticationService, private router: Router,private fb: FormBuilder) {
    this.User = new NewUser();
    this.Student = new Student();

    this.form = fb.group({
        email: ['', Validators.required, this.IsEmailValid],
        password: ['', Validators.required, this.IsPasswordValid],
        confirmPassword: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required]
      },{
        validator: PasswordValidation.MatchPassword,
      });
   }

  IsEmailValid(input: FormControl){
    let email = input.value;
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(email, regex, regex.test(email));
    return Observable.of(regex.test(email)).map(result => {
      return !result ? { IsEmailValid: true} : null;
    });
  }

  IsPasswordValid(input: FormControl){
    let password = input.value;
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    console.log(password, regex, regex.test(password));
    return Observable.of(regex.test(password)).map(result => {
      return !result ? { IsPasswordValid: true} : null;
    });
  }

  


  ngOnInit() {
    this.Loaded = true;
  }

  SignUp(){
   this.authenticationService.StudentSignUp(this.User,this.Student).subscribe(result =>{
     this.router.navigate(['/home']);
   }); 
  }

}
