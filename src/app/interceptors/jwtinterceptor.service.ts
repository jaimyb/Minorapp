// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class JwtinterceptorService implements HttpInterceptor {
  constructor(private cs: CookieService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: JSON.parse( this.cs.get('minorappl')).token
      }
    });
    return next.handle(request);
  }
}