import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../subscription';
import { SubscriptionStatus } from '../../subscriptionstatus';
import { SubscriptionService } from '../../subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import * as M from 'materialize-css';

@Component({
  selector: 'app-coordinatorsubscriptiondetails',
  templateUrl: './coordinatorsubscriptiondetails.component.html',
  styleUrls: ['./coordinatorsubscriptiondetails.component.css']
})
export class CoordinatorsubscriptiondetailsComponent implements OnInit {

  Subscription: Subscription;
  Loaded: boolean;
  ParamSub: Array<any>;
  Statuses: Array<SubscriptionStatus>;
  SelectedStatus: SubscriptionStatus;

  constructor(private subscriptionsService: SubscriptionService, private route: ActivatedRoute ,private router: Router) { 
    this.Loaded = false;
    this.ParamSub = new Array<any>();
    this.Statuses = new Array<SubscriptionStatus>();
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionsService.GetSubscriptionById(params['intekeningid']).subscribe(subscription =>{
        this.Subscription = subscription;
        console.log(subscription);
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

  acceptSubscription(event){
    this.Subscription.StatusId = 1;
    this.subscriptionsService.UpdateSubscriptionStatus(this.Subscription.Id, this.Subscription.StatusId).subscribe(bool =>{
      console.log(bool);
      this.router.navigate["coordinatorintekening/" + this.Subscription.Id];
    });
  }

  denySubscription(event){
    this.Subscription.StatusId = 3;
    this.subscriptionsService.UpdateSubscriptionStatus(this.Subscription.Id, this.Subscription.StatusId).subscribe(bool =>{
      console.log(bool);
      this.subscriptionsService.GetSubscriptionById(this.Subscription.Id).subscribe(subscription =>{
        this.Subscription = subscription;
      });
    });
  }

  statusChanged(event){
    console.log(event);
    this.subscriptionsService.UpdateSubscriptionStatus(this.Subscription.Id, this.Subscription.StatusId).subscribe(bool =>{
      console.log(bool);
      this.subscriptionsService.GetSubscriptionById(this.Subscription.Id).subscribe(subscription =>{
        this.Subscription = subscription;
      });
    });
  }

}
