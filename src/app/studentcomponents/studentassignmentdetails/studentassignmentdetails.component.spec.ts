import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentassignmentdetailsComponent } from './studentassignmentdetails.component';

describe('StudentassignmentdetailsComponent', () => {
  let component: StudentassignmentdetailsComponent;
  let fixture: ComponentFixture<StudentassignmentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentassignmentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentassignmentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
