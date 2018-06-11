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



@Injectable()
export class AuthenticationService implements CanActivate {

  Authenticated: boolean;
  Roles: Array<string>;
  CurrentUser: CurrentUser;

  canActivate(): Observable<boolean> | boolean {
    let token = this.cookieService.get('minorappl');
    if(this.Authenticated)
    {
      return true;
    }
    else{
      if(token == ''){
        return false;
      }
      else{
        let body = {token: JSON.parse(token).token};
        console.log(body);
        return this.http.post(this.Url + "/authenticatejwt", body).map(response =>{
          if(response.json().success){
            this.Authenticated = true;
            return true;
          }
          else{
            this.Authenticated = false;
            this.router.navigate(['home']);
            return false;
          }
        });
      }
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
        console.log(decode(response.json().token));
        //asddsadsadasds
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
    this.cookieService.delete('minorappl');
    this.Authenticated = false;
    this.router.navigate(['home']);
  }
}
