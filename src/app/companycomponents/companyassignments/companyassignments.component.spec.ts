import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyassignmentsComponent } from './companyassignments.component';

describe('CompanyassignmentsComponent', () => {
  let component: CompanyassignmentsComponent;
  let fixture: ComponentFixture<CompanyassignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyassignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyassignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
