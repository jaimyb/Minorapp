import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from '../subscription';
import { SubscriptionStatus } from '../subscriptionstatus';
import * as $ from 'jquery';
import * as M from 'materialize-css';

@Component({
  selector: 'app-subscriptiondetails',
  templateUrl: './subscriptiondetails.component.html',
  styleUrls: ['./subscriptiondetails.component.css']
})
export class SubscriptiondetailsComponent implements OnInit, OnDestroy {
  
  Subscription: Subscription;
  Loaded: boolean;
  ParamSub: Array<any>;
  Statuses: Array<SubscriptionStatus>;
  SelectedStatus: SubscriptionStatus;

  constructor(private subscriptionsService: SubscriptionService,private route: ActivatedRoute) { 
    this.Loaded = false;
    this.ParamSub = new Array<any>();
    this.Statuses = new Array<SubscriptionStatus>();
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionsService.GetSubscriptionById(params['subscriptionid']).subscribe(subscription =>{
        this.Subscription = subscription;
        this.subscriptionsService.GetAllSubscriptionStatuses().subscribe(statuses =>{
          this.Statuses = statuses;
          console.log(this.Statuses);
          this.Loaded = true;
          setTimeout(() => {
            this.InitMaterializeCSS();   
          }, 1);
        });   
      });
    }));
  }

  InitMaterializeCSS(){
    M.updateTextFields();
    M.AutoInit();
  }

  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  statusChanged(event){
    console.log(event);
    this.subscriptionsService.UpdateSubscriptionStatus(this.Subscription.Id, this.Subscription.StatusId).subscribe(bool =>{
      console.log(bool);
    });
  }

}
