import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../subscription';
import { GlobalService } from '../../global.service';
import { SubscriptionService } from '../../subscription.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coordinatorassignmentsubscriptions',
  templateUrl: './coordinatorassignmentsubscriptions.component.html',
  styleUrls: ['./coordinatorassignmentsubscriptions.component.css']
})
export class CoordinatorassignmentsubscriptionsComponent implements OnInit {

  ParamSub: Array<any>;
  Subscriptions: Array<Subscription>
  Loaded: boolean;

  constructor(private globalService: GlobalService, private subscriptionService: SubscriptionService,private route: ActivatedRoute) { 
    this.ParamSub = new Array<any>();
    this.Loaded = false;
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionService.GetAllSubscriptionsFromAssignmentId(params['opdrachtid']).subscribe(subscriptions =>{
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
