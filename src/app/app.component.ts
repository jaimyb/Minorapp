import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { GlobalService } from './global.service';
import * as $ from 'jquery';


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

  constructor(private globalService: GlobalService){
    this.globalService.homeRouteActive.subscribe(bool =>{
      this.homeRouteActive = bool;
    });

    this.globalService.assignmentRouteActive.subscribe(bool =>{
      this.assignmentRouteActive = bool;
    });

    this.globalService.subscriptionRouteActive.subscribe(bool =>{
      this.subscriptionRouteActive = bool;
    });
  }
}
