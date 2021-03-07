import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeregistrationsComponent } from './timeregistrations.component';

describe('TimeregistrationsComponent', () => {
  let component: TimeregistrationsComponent;
  let fixture: ComponentFixture<TimeregistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeregistrationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeregistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
