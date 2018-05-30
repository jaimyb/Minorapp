import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/map";
import { Company } from './company';

@Injectable()
export class CompanyService {

  Url = "/api/companies/";

  constructor(private http: Http) { }

  GetCompanybyId(id): Observable<Company>{
    return this.http.get(this.Url + 1).map(response => {
      var json = response.json()[0];
      var company = new Company(json.BedrijfID, json.naam, json.email , json.telefoonnummer);

      return company;
    });
  }

}
