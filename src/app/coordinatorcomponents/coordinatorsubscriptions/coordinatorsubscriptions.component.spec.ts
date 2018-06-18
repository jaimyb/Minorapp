import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsubscriptionsComponent } from './coordinatorsubscriptions.component';

describe('CoordinatorsubscriptionsComponent', () => {
  let component: CoordinatorsubscriptionsComponent;
  let fixture: ComponentFixture<CoordinatorsubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
