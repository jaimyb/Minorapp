import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { GlobalService } from './global.service';
import * as $ from 'jquery';
import { AuthenticationService } from './authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  homeRouteActive: boolean;
  assignmentRouteActive: boolean;
  subscriptionRouteActive: boolean;

  constructor(private globalService: GlobalService, private authenticationService: AuthenticationService){
    this.authenticationService.CheckCookieAuthentication();
  }

  LogOff(){
    this.authenticationService.LogOff();
  }


}
