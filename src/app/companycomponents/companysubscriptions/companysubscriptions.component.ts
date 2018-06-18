import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../subscription';
import { SubscriptionService } from '../../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-companysubscriptions',
  templateUrl: './companysubscriptions.component.html',
  styleUrls: ['./companysubscriptions.component.css']
})
export class CompanysubscriptionsComponent implements OnInit {

  ParamSub: Array<any>;
  Subscriptions: Array<Subscription>
  Loaded: boolean;
  Search: string;
  OrderByProp: string;

  constructor(private subscriptionService: SubscriptionService, private route: ActivatedRoute, private authenticationService: AuthenticationService) { 
    this.ParamSub = new Array<any>();
    this.Loaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      console.log(params);
      if(params['opdrachtid'] != undefined){
        this.ParamSub.push( this.route.params.subscribe(params => {
          this.subscriptionService.GetAllSubscriptionsFromAssignmentId(params['opdrachtid']).subscribe(subscriptions =>{
            this.Subscriptions = subscriptions;
            this.Loaded = true;
          });
        }));
      }
      else{
        this.ParamSub.push( 
          this.subscriptionService.GetAllSubscriptionsByCompanyId(this.authenticationService.CurrentUser.BedrijfId).subscribe(subscriptions =>{
            this.Subscriptions = subscriptions;
            this.Loaded = true;
          })
        );
      }
    });   
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
