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
import { AssignmentImage } from './assignmentimage';
import { ParseService } from './parse.service';

@Injectable()
export class SubscriptionService {

  Url = "/api/subscriptions/";

  constructor(private http: Http, private parse: ParseService) { }

  GetAllSubscriptionsByYear(year):Observable<Array<Subscription>>{
    return this.http.get(this.Url + 'all/' + year).map(response => {
      console.log(response);
      let json = response.json();
      let subscriptions = new Array<Subscription>();
      
      json.forEach(subscription => {
        subscriptions.push(this.parse.JsonToSubscription(subscription));
      });
      console.log(subscriptions);
      return subscriptions;
    });
  }

  GetSubscriptionById(subscriptionid): Observable<Subscription>{
    return this.http.get(this.Url + 'byid/' + subscriptionid).map(response => {
      return this.parse.JsonToSubscription(response.json()[0]);
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

  GetAllSubscriptionsByStudentId(id, year):Observable<Array<Subscription>>{
    return this.http.get(this.Url + 'bystudent/' + id + "/" + year).map(response =>{
      let json = response.json();
      let subscriptions = new Array<Subscription>();
      json.forEach(subscription => {
        subscriptions.push(this.parse.JsonToSubscription(subscription));
      });
      return subscriptions
    });
  }

  GetAllSubscriptionsByCompanyIdByYear(id, year):Observable<Array<Subscription>>{
    return this.http.get(this.Url + 'bycompany/' + id + '/' + year).map(response =>{
      let json = response.json();
      let subscriptions = new Array<Subscription>();
      
      json.forEach(subscription => {
        subscriptions.push(this.parse.JsonToSubscription(subscription));
      });

      return subscriptions
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
        subscriptions.push(this.parse.JsonToSubscription(subscription));
      });
      return subscriptions;
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
