import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../global.service';
import { SubscriptionService } from '../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from '../subscription';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit,OnDestroy {

  ParamSub: Array<any>;
  Subscriptions: Array<Subscription>
  Loaded: boolean;

  constructor(private globalService: GlobalService, private subscriptionService: SubscriptionService,private route: ActivatedRoute) { 
    this.ParamSub = new Array<any>();
    this.Loaded = false;
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionService.GetAllSubscriptionsFromAssignmentId(params['assignmentid']).subscribe(subscriptions =>{
        this.Subscriptions = subscriptions;
        this.Loaded = true;
      });
    }));
  }

  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
