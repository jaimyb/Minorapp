import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsubscriptiondetailsComponent } from './studentsubscriptiondetails.component';

describe('StudentsubscriptiondetailsComponent', () => {
  let component: StudentsubscriptiondetailsComponent;
  let fixture: ComponentFixture<StudentsubscriptiondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsubscriptiondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsubscriptiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
