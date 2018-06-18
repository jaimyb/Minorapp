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
import { RolegaurdService } from '../rolegaurd.service';
import { StudentassignmentsComponent } from '../studentcomponents/studentassignments/studentassignments.component';
import { StudentassignmentdetailsComponent } from '../studentcomponents/studentassignmentdetails/studentassignmentdetails.component';
import { StudentsubscribeComponent } from '../studentcomponents/studentsubscribe/studentsubscribe.component';
import { StudentsubscriptionsComponent } from '../studentcomponents/studentsubscriptions/studentsubscriptions.component';
import { StudentsubscriptiondetailsComponent } from '../studentcomponents/studentsubscriptiondetails/studentsubscriptiondetails.component';
import { CoordinatorassignmentsComponent } from '../coordinatorcomponents/coordinatorassignments/coordinatorassignments.component';
import { CoordinatorassignmentdetailsComponent } from '../coordinatorcomponents/coordinatorassignmentdetails/coordinatorassignmentdetails.component';
import { CoordinatoreditassignmentComponent } from '../coordinatorcomponents/coordinatoreditassignment/coordinatoreditassignment.component';
import { CoordinatorassignmentsubscriptionsComponent } from '../coordinatorcomponents/coordinatorassignmentsubscriptions/coordinatorassignmentsubscriptions.component';
import { CoordinatorsubscriptiondetailsComponent } from '../coordinatorcomponents/coordinatorsubscriptiondetails/coordinatorsubscriptiondetails.component';
import { CoordinatoraddassignmentComponent } from '../coordinatorcomponents/coordinatoraddassignment/coordinatoraddassignment.component';
import { CoordinatorsubscriptionsComponent } from '../coordinatorcomponents/coordinatorsubscriptions/coordinatorsubscriptions.component';
import { CompanyassignmentsComponent } from '../companycomponents/companyassignments/companyassignments.component';
import { CompanyaddassignmentComponent } from '../companycomponents/companyaddassignment/companyaddassignment.component';
import { CompanyassignmentdetailsComponent } from '../companycomponents/companyassignmentdetails/companyassignmentdetails.component';
import { CompanyeditassignmentComponent } from '../companycomponents/companyeditassignment/companyeditassignment.component';
import { CompanysubscriptionsComponent } from '../companycomponents/companysubscriptions/companysubscriptions.component';
import { CompanysubscriptiondetailsComponent } from '../companycomponents/companysubscriptiondetails/companysubscriptiondetails.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'subscriptions/:assignmentid', component: SubscriptionsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'} },
  // { path: 'assignments', component: AssignmentsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'}},
  // { path: 'assignment-details/:id', component: AssignmentComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'}},
  // { path: 'subscription-details/:subscriptionid', component: SubscriptiondetailsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'}},
  // { path: 'edit-assignment/:assignmentid', component: EditassignmentComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'} },
  // { path: 'subscribe', component: SubscribeComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'student'}},
  // { path: 'add-assignment', component: AddassignmentComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'} },
  { path: 'bedrijfopdrachten', component: CompanyassignmentsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'bedrijf'}},
  { path: 'bedrijfaddopdracht', component: CompanyaddassignmentComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'bedrijf'}},
  { path: 'bedrijfopdrachtdetail/:opdrachtid', component: CompanyassignmentdetailsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'bedrijf'}},
  { path: 'bedrijfeditopdracht/:opdrachtid', component: CompanyeditassignmentComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'bedrijf'}},
  { path: 'bedrijfintekeningen', component: CompanysubscriptionsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'bedrijf'}},
  { path: 'bedrijfprojectintekeningen/:opdrachtid', component: CompanysubscriptionsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'bedrijf'}},
  { path: 'bedrijfintekeningdetail/:intekeningid', component: CompanysubscriptiondetailsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'bedrijf'}},

  { path: 'coordinatoropdrachten', component: CoordinatorassignmentsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'}},
  { path: 'coordinatoropdrachtdetail/:opdrachtid', component: CoordinatorassignmentdetailsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'}},
  { path: 'coordinatoreditopdracht/:opdrachtid', component: CoordinatoreditassignmentComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'}},
  { path: 'coordinatorprojectintekeningen/:opdrachtid', component: CoordinatorassignmentsubscriptionsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'}},
  { path: 'coordinatorintekening/:intekeningid', component: CoordinatorsubscriptiondetailsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'}},
  { path: 'coordinatoraddopdracht', component: CoordinatoraddassignmentComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'}},
  { path: 'coordinatorintekeningen', component: CoordinatorsubscriptionsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'coordinator'}},

  { path: 'studentsignup', component: StudentsignupComponent },
  { path: 'studentintekeningdetail/:intekeningid', component: StudentsubscriptiondetailsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'student'}},
  { path: 'studentopdrachten', component: StudentassignmentsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'student'}},
  { path: 'studentintekenen', component: StudentsubscribeComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'student'}},
  { path: 'studentopdrachtdetail/:opdrachtid', component: StudentassignmentdetailsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'student'}},
  { path: 'studentintekeningen', component: StudentsubscriptionsComponent, canActivate: [ RolegaurdService ], data: {expectedRole: 'student'}},
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
