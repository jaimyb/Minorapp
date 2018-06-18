import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentassignmentsComponent } from './studentassignments.component';

describe('StudentassignmentsComponent', () => {
  let component: StudentassignmentsComponent;
  let fixture: ComponentFixture<StudentassignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentassignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentassignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
