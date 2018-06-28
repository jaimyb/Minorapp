import { Component, OnInit } from '@angular/core';
import { NewUser } from '../newuser';
import { Company } from '../company';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as M from 'materialize-css';

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
  
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.User = new NewUser();
    this.Company = new Company();
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
