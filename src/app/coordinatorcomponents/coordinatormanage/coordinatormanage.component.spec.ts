import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatormanageComponent } from './coordinatormanage.component';

describe('CoordinatormanageComponent', () => {
  let component: CoordinatormanageComponent;
  let fixture: ComponentFixture<CoordinatormanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatormanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatormanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
