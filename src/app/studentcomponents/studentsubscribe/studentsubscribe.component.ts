import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../subscription';
import { Assignment } from '../../assignment';
import { DataService } from '../../data.service';
import { SubscriptionService } from '../../subscription.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-studentsubscribe',
  templateUrl: './studentsubscribe.component.html',
  styleUrls: ['./studentsubscribe.component.css']
})
export class StudentsubscribeComponent implements OnInit {

  Assignment: Assignment;
  Motivation: string;
  StudentId: number;
  Loaded: boolean;
  Error: boolean;
  ParamSub: Array<any>;
  form: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private authenticationService: AuthenticationService, private subscriptionService: SubscriptionService, private router: Router) {
    this.ParamSub = new Array<any>();
    this.form = fb.group({
      motivation: ['', Validators.required],
    }, { });
  }

  set DataAssignment(value: Assignment) {
    this.dataService.CurrentAssignment = value;
  }

  get DataAssignment() {
    return this.dataService.CurrentAssignment;
  }

  ngOnInit() {
    if (this.DataAssignment == undefined) {
      this.router.navigate(['/assignments']);
    }
    else {
      this.Assignment = this.dataService.CurrentAssignment;
      this.Loaded = true;
    }
  }

  ngOnDestroy(): void {
    this.ParamSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  PostSubscription() {
    console.log(this.authenticationService.CurrentUser.StudentId);
    let subscription = new Subscription(null, this.Motivation, 2, this.Assignment.Id, this.authenticationService.CurrentUser.StudentId, null, null, null, null, null);
    this.ParamSub.push(this.subscriptionService.PostSubscription(subscription).subscribe(response => {
      if (response) {
        this.DataAssignment = null;
        this.router.navigate(['/studentopdrachtdetail', this.Assignment.Id]);
      }
      else {
        this.Error = true;
        setTimeout(() => {
          this.Error = false;
        }, 5000);
      }
    }));
  }

}
