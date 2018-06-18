import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorassignmentdetailsComponent } from './coordinatorassignmentdetails.component';

describe('CoordinatorassignmentdetailsComponent', () => {
  let component: CoordinatorassignmentdetailsComponent;
  let fixture: ComponentFixture<CoordinatorassignmentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorassignmentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorassignmentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
