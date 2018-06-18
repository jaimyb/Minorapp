import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../subscription';
import { GlobalService } from '../../global.service';
import { SubscriptionService } from '../../subscription.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coordinatorsubscriptions',
  templateUrl: './coordinatorsubscriptions.component.html',
  styleUrls: ['./coordinatorsubscriptions.component.css']
})
export class CoordinatorsubscriptionsComponent implements OnInit {

  ParamSub: Array<any>;
  Subscriptions: Array<Subscription>
  Loaded: boolean;
  Search: string;
  OrderByProp: string;

  constructor(private globalService: GlobalService, private subscriptionService: SubscriptionService,private route: ActivatedRoute) { 
    this.ParamSub = new Array<any>();
    this.Loaded = false;
  }

  ngOnInit() {
    this.ParamSub.push( this.route.params.subscribe(params => {
      this.subscriptionService.GetAllSubscriptions().subscribe(subscriptions =>{
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

  ChangeOrder(event){
    console.log(event.srcElement.innerHTML);
    switch(event.srcElement.innerHTML){
      case "Project":
        this.OrderByProp = "Assignment.Title"
      break;
      case "Naam":
        this.OrderByProp = "Student.Name"
      break;
      case "Email":
        this.OrderByProp = "Student.Email"
      break;
      case "Status":
        this.OrderByProp = "Subscription"
      break;
    }
  }

}
