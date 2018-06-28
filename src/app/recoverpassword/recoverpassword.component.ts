import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router) { 
    this.Subscribes = new Array<any>();
  }

  ngOnInit() {
    this.Subscribes.push( this.route.params.subscribe(params => {
      this.authenticationService.CheckRecoverCode(params['email'],params['code']).subscribe(response =>{
        this.Valid = response.success;
        this.Email = params['email'];
        if(!this.Valid){
          this.Message = response.result;
        }
      });
    }));
  }

  SetPassword(){
    this.authenticationService.ResetPassword(this.Email, this.Password).subscribe(response =>{
      this.Message = response.result;
      console.log(response);
      if(response.success){
        this.router.navigate(['signin']);
      }
    });
  }

}
