import { Component, OnInit } from '@angular/core';
import { NewUser } from '../newuser';
import { Company } from '../company';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from '../Validators/PasswordValidation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-companysignup',
  templateUrl: './companysignup.component.html',
  styleUrls: ['./companysignup.component.css']
})
export class CompanysignupComponent implements OnInit {

  User: NewUser;
  Company: Company;
  Code: string;
  Loaded: boolean;
  form: FormGroup;
  
  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder) {
    this.User = new NewUser();
    this.Company = new Company();
    this.form = fb.group({
      email: [null, Validators.required, this.IsEmailValid],
      password: [null, Validators.required, this.IsPasswordValid],
      confirmPassword: [null, Validators.required],
      name: [null, Validators.required],
      phonenumber: [null, Validators.required],
      code: [null, Validators.required]
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

  InitMaterializeCSS(){
    M.textareaAutoResize($('#description'));
    M.updateTextFields();
    M.AutoInit();
  }

  SignUp(){
    this.authenticationService.CheckCompanyCode(this.Code).subscribe(response => {
      if(response.success){
        this.authenticationService.CompanySignUp(this.User,this.Company).subscribe(result =>{
          this.router.navigate(['/home']);
        }); 
      }
      else{
        console.log(response.result);
      }
    });
  }
}
