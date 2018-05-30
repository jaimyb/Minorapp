import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditassignmentComponent } from './editassignment.component';

describe('EditassignmentComponent', () => {
  let component: EditassignmentComponent;
  let fixture: ComponentFixture<EditassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
