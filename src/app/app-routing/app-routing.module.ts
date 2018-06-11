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
import { StudentsignupComponent } from '../studentsignup/studentsignup.component';
import { SigninComponent } from '../signin/signin.component';
import { AuthenticationService} from '../authentication.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'subscriptions/:assignmentid', component: SubscriptionsComponent, canActivate: [AuthenticationService] },
  { path: 'assignments', component: AssignmentsComponent, canActivate: [AuthenticationService]},
  { path: 'assignment-details/:id', component: AssignmentComponent, canActivate: [AuthenticationService] },
  { path: 'subscription-details/:subscriptionid', component: SubscriptiondetailsComponent, canActivate: [AuthenticationService]},
  { path: 'edit-assignment/:assignmentid', component: EditassignmentComponent, canActivate: [AuthenticationService]},
  { path: 'subscribe', component: SubscribeComponent, canActivate: [AuthenticationService]},
  { path: 'add-assignment', component: AddassignmentComponent, canActivate: [AuthenticationService] },
  { path: 'studentsignup', component: StudentsignupComponent },
  { path: 'signin', component: SigninComponent },
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
