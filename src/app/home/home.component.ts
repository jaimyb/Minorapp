import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }


}
