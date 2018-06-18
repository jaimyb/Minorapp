import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorassignmentsubscriptionsComponent } from './coordinatorassignmentsubscriptions.component';

describe('CoordinatorassignmentsubscriptionsComponent', () => {
  let component: CoordinatorassignmentsubscriptionsComponent;
  let fixture: ComponentFixture<CoordinatorassignmentsubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorassignmentsubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorassignmentsubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
