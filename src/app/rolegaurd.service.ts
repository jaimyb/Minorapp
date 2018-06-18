import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import { CookieService } from 'ngx-cookie-service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrentUser } from './currentuser';
import { AuthenticationService } from './authentication.service';

const helper = new JwtHelperService();


@Injectable()
export class RolegaurdService implements CanActivate {

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let token = JSON.parse( this.cookieService.get('minorappl')).token;
    if(token == ''){
      this.router.navigate(['signin']);
      this.authenticationService.Authenticated = false;
      return false;
      }
      if(this.authenticationService.CurrentUser == undefined){
        let payload = helper.decodeToken(token);
        this.authenticationService.CurrentUser = new CurrentUser(payload.email, payload.roles, payload.studentid, payload.bedrijfid, payload.coordinatorid);
      }
    if(!helper.isTokenExpired(token) && this.authenticationService.CurrentUser.Roles.indexOf(route.data.expectedRole) >= 0)
    {
      console.log(this.authenticationService.CurrentUser.Roles.indexOf(route.data.expectedRole));
      console.log('test');
      this.authenticationService.Authenticated = true;
      return true;
    }
  }

  Url = "/api/authentication";

  constructor(private http: Http, private authenticationService: AuthenticationService,private cookieService: CookieService, private router: Router) { 

  }

}
