import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeregistrationCreateComponent } from './timeregistration-create.component';

describe('TimeregistrationCreateComponent', () => {
  let component: TimeregistrationCreateComponent;
  let fixture: ComponentFixture<TimeregistrationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeregistrationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeregistrationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
