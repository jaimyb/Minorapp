import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Assignment } from './assignment';
import "rxjs/add/operator/map";
import { CompanyService } from './company.service';
import { Company } from './company';
import { AssignmentStatus } from './assignmentstatus';
import { AssignmentImage } from './assignmentimage';
import { ParseService } from './parse.service';

@Injectable()
export class AssignmentService {

  Url = "/api/assignments/";
  Assignment: Assignment;

  constructor(private http: Http, private companyService: CompanyService, private parse: ParseService) { }

  GetAllAssignmentsByCompanyIdByYear(id,year): Observable<Array<Assignment>>{
    return this.http.get(this.Url + 'bycompanyid/' + id + '/' + year).map(response => {
      let opdrachten = new Array<Assignment>();
      response.json().forEach(opdracht => {
        console.log(this.parse.JsonToAssignment(opdracht));
        opdrachten.push(this.parse.JsonToAssignment(opdracht));
      });
      return opdrachten;
    });
  }

  GetAllAssignmentsByYear(year): Observable<Array<Assignment>>{
    return this.http.get(this.Url + 'byschoolyear/' + year).map(response => {
      let opdrachten = new Array<Assignment>();
      response.json().forEach(opdracht => {
        opdrachten.push(this.parse.JsonToAssignment(opdracht));
      });
      return opdrachten;
    });
  }

  GetAllAvailibleAssignments(year): Observable<Array<Assignment>>{
    return this.http.get(this.Url + 'availible/' + year).map(response => {
      let opdrachten = new Array<Assignment>();
      response.json().forEach(opdracht => {
        opdrachten.push(this.parse.JsonToAssignment(opdracht));
      });
      return opdrachten;
    });
  }

  GetAssignmentById(id): Observable<Assignment>{
    return this.http.get(this.Url + 'byid/' + id).map(response => {
      let opdracht = response.json()[0];
      console.log(this.parse.JsonToAssignment(opdracht));
      return this.parse.JsonToAssignment(opdracht);
    });
  }

  GetAllAssignmentStatuses(): Observable<AssignmentStatus[]>{
    return this.http.get(this.Url + 'statuses').map(response => {
      let json = response.json();
      let statuses = new Array<AssignmentStatus>();
      json.forEach(status => {
        statuses.push(new AssignmentStatus(status.OpdrachtSID, status.opdrachtstatus));
      });
      return statuses;
    });
  }

  GetAllAssignmentSchoolYears(): Observable<string[]>{
    return this.http.get(this.Url + 'schoolyears').map(response => {
      let json = response.json();
      let years = new Array<string>();
      json.forEach(year => {
        years.push(year);
      });
      return years;
    });
  }

  GetAllAssignmentSemesters(): Observable<Array<any>>{
    return this.http.get(this.Url + 'semesters').map(response => {
      let json = response.json();
      let semesters = new Array<any>();
      json.forEach(semester => {
        semesters.push(semester);
      });
      return semesters;
    });
  }

  DeleteAssignmentById(id): Observable<boolean>{
    return this.http.get(this.Url + "delete/" + id).map(response =>{
      if(response.ok)
      {
        return true;
      }
      else
      {
        return false;
      }
    });
  }

  PostAssignment(assignment: Assignment): Observable<any>{
    let fd = new FormData();
    fd.append('titel', assignment.Title);
    fd.append('beschrijving', assignment.Description);
    fd.append('opdrachtstatusid', assignment.StatusId.toString());
    fd.append('ec', assignment.Ec.toString());
    fd.append('semester', assignment.Semester.toString());
    fd.append('schooljaar', assignment.SchoolYear);
    fd.append('bedrijfid', assignment.CompanyId.toString());
    if(assignment.AssignmentImage != undefined)
    {
      fd.append('opdrachtAfbeelding', assignment.AssignmentImage.File, assignment.AssignmentImage.File.name);
    }
    return this.http.post(this.Url + 'post', fd).map(response => {
      return response;
    });
  }

  DeleteAllAssignmentByAssignmentId(id): Observable<boolean>{
    return this.http.get(this.Url + '/deleteimages/' + id).map(response => {
      return response.ok;
    });
  }

  GetImageDataByAssignmentId(id): Observable<Array<AssignmentImage>>{
    return this.http.get(this.Url + '/imagedata/' + id).map(response => {
      let json = response.json();
      let images = new Array<AssignmentImage>();
      json.forEach(image => {
        images.push(new AssignmentImage(image.OpdrachtAfbeeldingID, 'http://localhost:3000/' + image.pad));
      });
      return images;
    });
  }

  PostAssignmentImages(id,images: Array<AssignmentImage>): Observable<boolean>{
    let fd = new FormData();
    images.forEach(image => {
      if(image.File != undefined){
        fd.append('opdrachtAfbeeldingen', image.File, image.File.name);
      }     
    });
    return this.http.post(this.Url + 'uploadimages/' + id, fd).map(response => {
      if(response.ok){
        return true;
      }
      else{
        return false;
      }
    });
  }

  PostAssignmentById(id, assignment: Assignment): Observable<boolean>{
    let fd = new FormData();
    fd.append('titel', assignment.Title);
    fd.append('beschrijving', assignment.Description);
    fd.append('opdrachtstatusid', assignment.StatusId.toString());
    fd.append('ec', assignment.Ec.toString());
    fd.append('semester', assignment.Semester.toString());
    fd.append('schooljaar', assignment.SchoolYear);
    fd.append('bedrijfid', assignment.CompanyId.toString());
    if(assignment.AssignmentImage != undefined && assignment.AssignmentImage.File != undefined)
    {
      fd.append('opdrachtAfbeelding', assignment.AssignmentImage.File, assignment.AssignmentImage.File.name);
    }
    
    return this.http.post(this.Url + 'update/' + id, fd).map(response => {
      if(response.ok){
        return true;
      }
      else{
        return false;
      }
    });
  }

  Get

  DeleteImageById(id): Observable<boolean>{
    return this.http.get(this.Url + 'deleteimage/' + id).map(response =>{
      if(response.ok){
        return true;
      }
      else{
        return false;
      }
    });
  }
}
