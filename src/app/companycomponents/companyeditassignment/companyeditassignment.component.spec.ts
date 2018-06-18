import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyeditassignmentComponent } from './companyeditassignment.component';

describe('CompanyeditassignmentComponent', () => {
  let component: CompanyeditassignmentComponent;
  let fixture: ComponentFixture<CompanyeditassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyeditassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyeditassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
