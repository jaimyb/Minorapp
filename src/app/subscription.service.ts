import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/map";
import { Subscription } from './subscription';
import { Company } from './company';
import { Assignment } from './assignment';
import { Student } from './student';
import { SubscriptionStatus } from './subscriptionstatus';

@Injectable()
export class SubscriptionService {

  Url = "/api/subscriptions/";

  constructor(private http: Http) { }

  GetSubscriptionById(subscriptionid): Observable<Subscription>{
    return this.http.get(this.Url + subscriptionid).map(response => {
      let subscription = response.json()[0];
      console.log(subscription);

      let student = new Student(subscription.StudentID, subscription.voornaam, subscription.achternaam, subscription.studentnummer ,subscription.klas, subscription.studentemail);
      let company = new Company(subscription.BedrijfID,subscription.naam, subscription.bedrijfemail, subscription.telefoonnummer);
      let assignment = new Assignment(subscription.OpdrachtID, subscription.titel, subscription.beschrijving, subscription.ec, subscription.opdrachtstatusid,subscription, subscription.opdrachtstatus, company);

      subscription = new Subscription(subscription.IntekeningID, subscription.motivatie, subscription.statusid, subscription.opdrachtid, subscription.studentid, subscription.intekeningstatus,assignment, student);

      return subscription
    });
  }

  PostSubscription(subscription: Subscription): Observable<Boolean>{
    let body = { motivatie: subscription.Motivation, intekeningstatusid: subscription.StatusId, opdrachtid: subscription.AssignmentId, studentid: subscription.StudentId};
    console.log(body);
    return this.http.post(this.Url + "post/", body).map(response => {
      if(response.ok)
      {
        return true;
      }
      else{
        return false;
      }
    });
  }

  UpdateSubscriptionStatus(id, statusid): Observable<boolean>{
    let body = {IntekeningSID: statusid};
    return this.http.post(this.Url + "update/" + id, body).map(response => {
      if(response.ok)
      {
        return true;
      }
      else{
        return false;
      }
    });
  }

  GetAllSubscriptionsFromAssignmentId(assignmentid): Observable<Array<Subscription>>{
    return this.http.get(this.Url +'byassignment/'+ assignmentid).map(response => {
      let json = response.json();
      let subscriptions = new Array<Subscription>();

      json.forEach(subscription => {
        let student = new Student(subscription.StudentID, subscription.voornaam, subscription.achternaam, subscription.studentnummer ,subscription.klas, subscription.studentemail);
        
        let company = new Company(subscription.BedrijfID,subscription.naam, subscription.bedrijfemail, subscription.telefoonnummer);
        
        let assignment = new Assignment(subscription.OpdrachtID, subscription.titel, subscription.beschrijving, subscription.ec, subscription.opdrachtstatusid,subscription, subscription.opdrachtstatus, company);
        
        subscriptions.push(new Subscription(subscription.IntekeningID, subscription.motivatie, subscription.intekeneningstatusid, subscription.opdrachtid, subscription.studentid, subscription.intekeningstatus,assignment, student));
      });
      return subscriptions
    });
  }

  GetAllSubscriptionStatuses(): Observable<SubscriptionStatus[]>{
    return this.http.get(this.Url + 'status/all').map(response => {
      let json = response.json();
      let statuses = new Array<SubscriptionStatus>();

      json.forEach(status => {
        statuses.push(new SubscriptionStatus(status.IntekeningSID, status.intekeningstatus));
      });
      console.log(json);
      return statuses;
    });
  }

}
