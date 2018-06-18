import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysubscriptiondetailsComponent } from './companysubscriptiondetails.component';

describe('CompanysubscriptiondetailsComponent', () => {
  let component: CompanysubscriptiondetailsComponent;
  let fixture: ComponentFixture<CompanysubscriptiondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysubscriptiondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysubscriptiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
