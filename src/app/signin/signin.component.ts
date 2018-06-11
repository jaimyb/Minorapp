import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { NewUser } from '../newuser';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  User: NewUser;
  Loaded: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.User = new NewUser();
    this.Loaded = true;
  }

  InitMaterializeCSS(){
    M.textareaAutoResize($('#description'));
    M.updateTextFields();
    M.AutoInit();
  }

  LogIn(){
    this.authenticationService.Authenticate(this.User).subscribe(result =>{
      if(result){
        console.log("Ingelogd!!!!")
      }
    })
  }
}
