import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from '../subscription';

@Component({
  selector: 'app-subscriptiondetails',
  templateUrl: './subscriptiondetails.component.html',
  styleUrls: ['./subscriptiondetails.component.css']
})
export class SubscriptiondetailsComponent implements OnInit, OnDestroy {
  
  Subscription: Subscription;
  Loaded: boolean;
  ParamSub: Array<any>;

  constructor(private subscriptionsService: SubscriptionService,private route: ActivatedRoute) { 
    this.Loaded = false;
    this.ParamSub = new Array<any>();
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionsService.GetSubscriptionById(params['subscriptionid']).subscribe(subscription =>{
        console.log(subscription);
        this.Subscription = subscription;
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
