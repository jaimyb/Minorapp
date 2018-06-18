import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatoraddassignmentComponent } from './coordinatoraddassignment.component';

describe('CoordinatoraddassignmentComponent', () => {
  let component: CoordinatoraddassignmentComponent;
  let fixture: ComponentFixture<CoordinatoraddassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatoraddassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatoraddassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
