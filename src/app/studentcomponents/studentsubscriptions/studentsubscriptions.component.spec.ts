import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsubscriptionsComponent } from './studentsubscriptions.component';

describe('StudentsubscriptionsComponent', () => {
  let component: StudentsubscriptionsComponent;
  let fixture: ComponentFixture<StudentsubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
