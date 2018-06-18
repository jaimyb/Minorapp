import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorassignmentsComponent } from './coordinatorassignments.component';

describe('CoordinatorassignmentsComponent', () => {
  let component: CoordinatorassignmentsComponent;
  let fixture: ComponentFixture<CoordinatorassignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorassignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorassignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
