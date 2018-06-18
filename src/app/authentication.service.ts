import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import { NewUser } from './newuser';
import { Student } from './student';
import { CookieService } from 'ngx-cookie-service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as decode from 'jwt-decode';
import { CurrentUser } from './currentuser';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable()
export class AuthenticationService {

  Authenticated: boolean;
  Roles: Array<string>;
  CurrentUser: CurrentUser;

  CheckCookieAuthentication(): boolean {
    if(this.cookieService.get('minorappl') != ''){
      let token = JSON.parse( this.cookieService.get('minorappl')).token;
      if(!helper.isTokenExpired(token)){
        if(this.CurrentUser == undefined){
          let payload = helper.decodeToken(token);
          this.CurrentUser = new CurrentUser(payload.email, payload.roles, payload.studentid, payload.bedrijfid, payload.coordinatorid);
        }
        this.Authenticated = true;
        return true;
      }
      else{
        this.Authenticated = false;
        return false;
      }
    }
  }

  IsCurrentUserRoleStudent(){
    if(this.CurrentUser != undefined){
      if(this.CurrentUser.Roles.indexOf('student') >= 0){
        return true
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }

  IsCurrentUserRoleCoordinator(){
    if(this.CurrentUser != undefined){
      if(this.CurrentUser.Roles.indexOf('coordinator') >= 0){
        return true
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }

  IsCurrentUserRoleCompany(){
    if(this.CurrentUser != undefined){
      if(this.CurrentUser.Roles.indexOf('bedrijf') >= 0){
        return true
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }


  Url = "/api/authentication";

  constructor(private http: Http, private cookieService: CookieService, private router: Router) { 
    this.Authenticated = false;
    this.Roles = new Array<string>();
  }

  StudentSignUp(user: NewUser, student: Student): Observable<any>{
    let body = { email: user.Email, password: user.Password, voornaam: student.Name, achternaam: student.Surname, studentnummer: student.Studentnumber, klas: student.Class };
    return this.http.post(this.Url + "/signup/student", body).map(response =>{
      if(response.ok){
        return true;
      }
      else{
        return false;
      }
    });
  }

  Authenticate(user: NewUser): Observable<any>{
    let body = { email: user.Email, password: user.Password };
    return this.http.post(this.Url + "/authenticate", body).map(response =>{
      if(response.json().success){
        this.cookieService.set('minorappl',JSON.stringify(response.json()));
        let payload = decode(response.json().token);
        this.CurrentUser = new CurrentUser(payload.email, payload.roles, payload.studentid, payload.bedrijfid, payload.coordinatorid);
        this.Authenticated = true;
        this.router.navigate(["home"]);
        return true;
      }
      else{
        return false;
      }
    });
  }

  AuthenticateJwt(token: string): Observable<boolean>{
    let body = { token: token };
    return this.http.post(this.Url + "/authenticatejwt", body).map(response =>{
      if(response.ok){
        this.Authenticated = true;
        return true;
      }
      else{
        this.Authenticated = false;
        return false;
      }
    });
  }

  LogOff(){
    console.log('ayy lmao');
    this.cookieService.delete('minorappl');
    this.Authenticated = false;
    this.router.navigate(['home']);
  }
}
