import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyaddassignmentComponent } from './companyaddassignment.component';

describe('CompanyaddassignmentComponent', () => {
  let component: CompanyaddassignmentComponent;
  let fixture: ComponentFixture<CompanyaddassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyaddassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyaddassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
