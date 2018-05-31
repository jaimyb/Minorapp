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

@Injectable()
export class AssignmentService {

  Url = "/api/assignments/";
  Assignment: Assignment;

  constructor(private http: Http, private companyService: CompanyService) { }

  GetAllAssignments(): Observable<Array<Assignment>>{
    return this.http.get(this.Url).map(response => {
      let opdrachten = new Array<Assignment>();
      response.json().forEach(opdracht => {
        let bedrijf = new Company(opdracht.bedrijfid, opdracht.naam, opdracht.email, opdracht.telefoonnummer);
        opdrachten.push(new Assignment(opdracht.OpdrachtID, opdracht.titel, opdracht.beschrijving, opdracht.ec, opdracht.opdrachtstatusid, opdracht.bedrijfid ,opdracht.opdrachtstatus, bedrijf,  'http://localhost:3000/' + opdracht.opdrachtafbeelding));
      });
      return opdrachten;
    });
  }

  GetAssignmentById(id): Observable<Assignment>{
    return this.http.get(this.Url + id).map(response => {
      let opdracht = response.json()[0];
      let bedrijf = new Company(opdracht.bedrijfid, opdracht.naam, opdracht.email, opdracht.telefoonnummer);
      opdracht = new Assignment(opdracht.OpdrachtID, opdracht.titel, opdracht.beschrijving, opdracht.ec, opdracht.opdrachtstatusid, opdracht.bedrijfid ,opdracht.opdrachtstatus, bedrijf, 'http://localhost:3000/' + opdracht.opdrachtafbeelding);
      
      return opdracht;
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

  PostAssignment(assignment: Assignment): Observable<boolean>{
    console.log(assignment);
    let body = { titel: assignment.Title, beschrijving: assignment.Description, opdrachtstatusid: assignment.StatusId, ec: assignment.Ec, bedrijfid: assignment.CompanyId };
    return this.http.post(this.Url + 'post', body).map(response => {
      console.log(response);
      if(response.ok){
        return true;
      }
      else{
        return false;
      }
    });
  }

  DeleteAllAssignmentByAssignmentId(id): Observable<boolean>{
    return this.http.get(this.Url + '/deleteimages/' + id).map(response => {
      return response.ok;
    });
  }

  GetAllAssignmentImagesByAssignmentId(id): Observable<Array<AssignmentImage>>
  {
    return this.http.get(this.Url + '/images/' + id).map(response => {
      let json = response.json();
      let images = new Array<AssignmentImage>();

      json.forEach(image => {
        images.push(new AssignmentImage(image.OpdrachtAfbeeldingID, image.pad));
      });

      return images;
    });
  }

  PostAssignmentById(id, assignment: Assignment, assignmentPicture: File): Observable<boolean>{
    console.log(assignment);
    let fd = new FormData();
    fd.append('titel', assignment.Title);
    fd.append('beschrijving', assignment.Description);
    fd.append('opdrachtstatusid', assignment.StatusId.toString());
    fd.append('ec', assignment.Ec.toString());
    fd.append('opdrachtAfbeelding', assignmentPicture, assignmentPicture.name);
    console.log(fd);
    let body = {titel: assignment.Title, beschrijving: assignment.Description,opdrachtstatusid: assignment.StatusId, ec: assignment.Ec};
    return this.http.post(this.Url + 'update/' + id, fd).map(response => {
      console.log(response);
      if(response.ok){
        return true;
      }
      else{
        return false;
      }
    });
  }
}
