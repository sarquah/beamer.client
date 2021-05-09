import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { ITimeregistration } from './../models/interfaces/ITimeregistration';
import { MockAuthService } from './mockauth.service.spec';
import { TimeregistrationService } from './timeregistration.service';

describe('TimeregistrationService', () => {
  let sut: TimeregistrationService;
  let formBuilderMock: FormBuilder = new FormBuilder();
  let mockTimeregistrations: ITimeregistration[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        TimeregistrationService,
        FormBuilder,
        {
          provide: MsalService,
          useClass: MockAuthService,
        },
      ],
    });
    formBuilderMock = TestBed.inject(FormBuilder);
    sut = TestBed.inject(TimeregistrationService);

    mockTimeregistrations = [
      {
        id: 0,
        tenantId: 'tenantId',
        date: new Date(),
        ownerId: 0,
        hours: 5,
        taskId: 0
      },
    ];
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('#getTimeregistrationsForTask should return a value', () => {
    sut.getTimeregistrationsForTask(0).subscribe(data => expect(data).toEqual(mockTimeregistrations));
  });

  it('#createTimeregistration should return a value', () => {
    sut.createTimeregistration(mockTimeregistrations[0]).subscribe(data => expect(data).toEqual(mockTimeregistrations[0]));
  });

  it('#getTimeregistration should return a value', () => {
    sut.getTimeregistration(0).subscribe(data => expect(data).toEqual(mockTimeregistrations[0]));
  });

  it('#updateTimeregistration should return a value', () => {
    sut.updateTimeregistration(0, mockTimeregistrations[0]).subscribe(data => expect(data).toEqual(mockTimeregistrations[0]));
  });

  it('#deleteTimeregistration should return a value', () => {
    sut.deleteTimeregistration(0).subscribe(data => expect(data).toEqual(mockTimeregistrations[0]));
  });

  it('#createForm should return a form', () => {
    const formGroup = formBuilderMock.group({
      date: new FormControl(null),
      hours: new FormControl(null),
      ownerId: new FormControl(null),
      taskId: new FormControl(null)
    });
    expect(sut.createForm().value).toEqual(formGroup.value);
  });
});
