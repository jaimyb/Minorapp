import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysubscriptionsComponent } from './companysubscriptions.component';

describe('CompanysubscriptionsComponent', () => {
  let component: CompanysubscriptionsComponent;
  let fixture: ComponentFixture<CompanysubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
