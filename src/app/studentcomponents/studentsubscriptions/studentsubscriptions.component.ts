import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { SubscriptionService } from '../../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from '../../subscription';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-studentsubscriptions',
  templateUrl: './studentsubscriptions.component.html',
  styleUrls: ['./studentsubscriptions.component.css']
})
export class StudentsubscriptionsComponent implements OnInit {

  ParamSub: Array<any>;
  Subscriptions: Array<Subscription>
  Loaded: boolean;

  constructor(private authenticationService: AuthenticationService,private globalService: GlobalService, private subscriptionService: SubscriptionService,private route: ActivatedRoute) { 
    this.ParamSub = new Array<any>();
    this.Loaded = false;
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionService.GetAllSubscriptionsByStudentId(this.authenticationService.CurrentUser.StudentId).subscribe(subscriptions =>{
        this.Subscriptions = subscriptions;
        console.log(subscriptions);
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
