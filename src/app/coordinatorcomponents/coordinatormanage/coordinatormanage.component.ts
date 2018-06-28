import { Component, OnInit } from '@angular/core';
import * as randomstring from 'randomstring';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-coordinatormanage',
  templateUrl: './coordinatormanage.component.html',
  styleUrls: ['./coordinatormanage.component.css']
})
export class CoordinatormanageComponent implements OnInit {

  Message: string;
  Email: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  GenerateCompanyCode(){
    this.authenticationService.GenerateCompanyCode(this.Email).subscribe(response =>{
      console.log(response);
      this.Message = response.result;
    });
  }

}
