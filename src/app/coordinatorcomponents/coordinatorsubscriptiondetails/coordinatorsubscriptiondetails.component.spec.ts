import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsubscriptiondetailsComponent } from './coordinatorsubscriptiondetails.component';

describe('CoordinatorsubscriptiondetailsComponent', () => {
  let component: CoordinatorsubscriptiondetailsComponent;
  let fixture: ComponentFixture<CoordinatorsubscriptiondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsubscriptiondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsubscriptiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
