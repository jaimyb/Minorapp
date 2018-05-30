import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Assignment } from '../assignment';
import { Subscription } from '../subscription';
import { SubscriptionService } from '../subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService, private subscriptionService: SubscriptionService, private router: Router) {
    this.ParamSub = new Array<any>();
  }

  set DataAssignment(value: Assignment) { 
    this.dataService.CurrentAssignment = value; 
  }

  get DataAssignment() { 
    return this.dataService.CurrentAssignment; 
  }

  Assignment: Assignment;
  Motivation: string;
  StudentId: number;
  Loaded: boolean;
  Error: boolean;
  ParamSub: Array<any>;
  

  ngOnInit() {
    if(this.DataAssignment == undefined){
      this.router.navigate(['/assignments']);
    }
    else{
      this.Assignment = this.dataService.CurrentAssignment;
      this.Loaded = true;
    } 
  }

  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  PostSubscription(){
    let subscription = new Subscription(null, this.Motivation, 2, this.Assignment.Id, 1);
    this.ParamSub.push(this.subscriptionService.PostSubscription(subscription).subscribe(response => {
      if(response){
        this.DataAssignment = null;
        this.router.navigate(['/assignment-details', this.Assignment.Id]);
      }
      else{
        this.Error = true;
        setTimeout(() => {
          this.Error = false; 
        }, 5000);
      }
    }));
  }

}
