import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatoreditassignmentComponent } from './coordinatoreditassignment.component';

describe('CoordinatoreditassignmentComponent', () => {
  let component: CoordinatoreditassignmentComponent;
  let fixture: ComponentFixture<CoordinatoreditassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatoreditassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatoreditassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
