import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordlostComponent } from './passwordlost.component';

describe('PasswordlostComponent', () => {
  let component: PasswordlostComponent;
  let fixture: ComponentFixture<PasswordlostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordlostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordlostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
