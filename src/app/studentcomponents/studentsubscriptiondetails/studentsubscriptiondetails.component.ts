import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../subscription';
import { SubscriptionService } from '../../subscription.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import * as M from 'materialize-css';

@Component({
  selector: 'app-studentsubscriptiondetails',
  templateUrl: './studentsubscriptiondetails.component.html',
  styleUrls: ['./studentsubscriptiondetails.component.css']
})
export class StudentsubscriptiondetailsComponent implements OnInit {

  Subscription: Subscription;
  Loaded: boolean;
  ParamSub: Array<any>;

  constructor(private subscriptionsService: SubscriptionService, private route: ActivatedRoute) { 
    this.Loaded = false;
    this.ParamSub = new Array<any>();
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionsService.GetSubscriptionById(params['intekeningid']).subscribe(subscription =>{
        this.Subscription = subscription;
          console.log(subscription);
          this.Loaded = true;
          setTimeout(() => {
            this.InitMaterializeCSS();   
          }, 1);   
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
