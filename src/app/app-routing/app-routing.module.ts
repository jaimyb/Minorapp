import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';
import { AssignmentsComponent } from '../assignments/assignments.component';
import { AssignmentComponent } from '../assignment/assignment.component';
import { SubscriptiondetailsComponent } from '../subscriptiondetails/subscriptiondetails.component';
import { EditassignmentComponent } from '../editassignment/editassignment.component';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { AddassignmentComponent } from '../addassignment/addassignment.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'subscriptions/:assignmentid', component: SubscriptionsComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'assignment-details/:id', component: AssignmentComponent },
  { path: 'subscription-details/:subscriptionid', component: SubscriptiondetailsComponent},
  { path: 'edit-assignment/:assignmentid', component: EditassignmentComponent},
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'add-assignment', component: AddassignmentComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ 
    RouterModule 
  ],
  declarations: [

  ]
})

export class AppRoutingModule { }
