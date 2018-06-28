import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/map";
import { Company } from './company';
import { ParseService } from './parse.service';

@Injectable()
export class CompanyService {

  Url = "/api/companies/";

  constructor(private http: Http, private parse: ParseService) { }

  GetCompanybyId(id): Observable<Company>{
    return this.http.get(this.Url + 1).map(response => {
      var json = response.json()[0];
      var company = this.parse.JsonToCompany(json);
      return company;
    });
  }

}
