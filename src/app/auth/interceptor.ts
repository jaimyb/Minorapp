import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service'; //


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService
    ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwttoken;
    if(!this.cookieService.get('jwt')){
      jwttoken = this.cookieService.get('jwt');
    }
    else{
      jwttoken = "";
    }
    request = request.clone({
      setHeaders: {
        token: jwttoken
      }
    });
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          console.log("handle error here")
        }
      }
    });
  }
}