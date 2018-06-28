import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-passwordlost',
  templateUrl: './passwordlost.component.html',
  styleUrls: ['./passwordlost.component.css']
})
export class PasswordlostComponent implements OnInit {

 
  Message: string;
  Email: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  SendPasswordRecovery(){
    this.authenticationService.GeneratePasswordRecoveryCode(this.Email).subscribe(response =>{
      this.Message = response.result;
    });
  }
}
