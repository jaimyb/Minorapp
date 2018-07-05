import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private globalService: GlobalService, private router: Router, private auth: AuthenticationService) { }

  ngOnInit() { 
    if(this.auth.IsCurrentUserRoleCoordinator()){
      this.router.navigate(['coordinatoropdrachten']);
    }
    else if(this.auth.IsCurrentUserRoleCompany()){
      this.router.navigate(['bedrijfopdrachten']);
    }
    else if(this.auth.IsCurrentUserRoleStudent()){
      this.router.navigate(['studentopdrachten']);
    }
    else{
      this.router.navigate(['signin']);
    }
  }

  ngOnDestroy(): void {
  }


}
