import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GlobalService {

  homeRouteActiveSource = new BehaviorSubject<boolean>(false);
  homeRouteActive = this.homeRouteActiveSource.asObservable();

  assignmentRouteActiveSource = new BehaviorSubject<boolean>(false);
  assignmentRouteActive = this.homeRouteActiveSource.asObservable();

  subscriptionRouteActiveSource = new BehaviorSubject<boolean>(false);
  subscriptionRouteActive = this.homeRouteActiveSource.asObservable();

  constructor() { }


  changeHomeRouteActive(bool: boolean) {
    console.log(bool);
    this.homeRouteActiveSource.next(bool)
  }

  changeassignmentRouteActive(bool: boolean) {
    console.log(bool);
    this.assignmentRouteActiveSource.next(bool)
  }

  changesubscriptionRouteActive(bool: boolean) {
    console.log(bool);
    this.subscriptionRouteActiveSource.next(bool)
  }
}
