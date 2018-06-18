import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyassignmentdetailsComponent } from './companyassignmentdetails.component';

describe('CompanyassignmentdetailsComponent', () => {
  let component: CompanyassignmentdetailsComponent;
  let fixture: ComponentFixture<CompanyassignmentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyassignmentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyassignmentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
