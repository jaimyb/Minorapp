import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsubscribeComponent } from './studentsubscribe.component';

describe('StudentsubscribeComponent', () => {
  let component: StudentsubscribeComponent;
  let fixture: ComponentFixture<StudentsubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
