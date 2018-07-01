import { Component, OnInit } from '@angular/core';
import * as randomstring from 'randomstring';
import { AuthenticationService } from '../../authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from '../../Validators/PasswordValidation';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-coordinatormanage',
  templateUrl: './coordinatormanage.component.html',
  styleUrls: ['./coordinatormanage.component.css']
})
export class CoordinatormanageComponent implements OnInit {

  Message: string;
  Email: string;
  form: FormGroup;

  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder) { 
    this.form = fb.group({
      email: ['', Validators.required, this.IsEmailValid],


    }, {});
  }

  IsEmailValid(input: FormControl) {
    let email = input.value;
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(email, regex, regex.test(email));
    return Observable.of(regex.test(email)).map(result => {
      return !result ? { IsEmailValid: true } : null;
    });
  }

  ngOnInit() {
  }

  GenerateCompanyCode(){
    this.authenticationService.GenerateCompanyCode(this.Email).subscribe(response =>{
      console.log(response);
      this.Message = response.result;
    });
  }

}
