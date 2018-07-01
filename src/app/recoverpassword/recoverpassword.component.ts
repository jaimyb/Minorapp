import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from '../Validators/PasswordValidation';

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.component.html',
  styleUrls: ['./recoverpassword.component.css']
})
export class RecoverpasswordComponent implements OnInit {

  Message: string;
  Email: string;
  Password: string;
  Subscribes: Array<any>;
  Valid: boolean;
  form: FormGroup;

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.Subscribes = new Array<any>();
    this.form = fb.group({
      password: ['', Validators.required, this.IsPasswordValid],
      confirmPassword: ['', Validators.required],

    }, {
        validator: PasswordValidation.MatchPassword,
      });
  }

  IsPasswordValid(input: FormControl) {
    let password = input.value;
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    console.log(password, regex, regex.test(password));
    return Observable.of(regex.test(password)).map(result => {
      return !result ? { IsPasswordValid: true } : null;
    });
  }


  ngOnInit() {
    this.Subscribes.push(this.route.params.subscribe(params => {
      this.authenticationService.CheckRecoverCode(params['email'], params['code']).subscribe(response => {
        this.Valid = response.success;
        this.Email = params['email'];
        if (!this.Valid) {
          this.Message = response.result;
        }
      });
    }));
  }

  SetPassword() {
    this.authenticationService.ResetPassword(this.Email, this.Password).subscribe(response => {
      this.Message = response.result;
      console.log(response);
      if (response.success) {
        this.router.navigate(['signin']);
      }
    });
  }

}
