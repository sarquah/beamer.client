import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MsalService } from '@azure/msal-angular';
import { MockAuthService } from '../services/mockauth.service.spec';
import { TimeregistrationService } from '../services/timeregistration.service';
import { Location } from '@angular/common';
import { TimeregistrationCreateComponent } from './timeregistration-create.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ITimeregistration } from '../models/interfaces/ITimeregistration';
import { Observable } from 'rxjs';

describe('TimeregistrationCreateComponent', () => {
  let sut: TimeregistrationCreateComponent;
  let locationMock: jasmine.SpyObj<Location>;
  let timeregistrationServiceMock: jasmine.SpyObj<TimeregistrationService>;
  let userServiceMock: UserService;
  let formBuilderMock: FormBuilder;

  beforeEach(() => {
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: () => {
            return 0;
          },
        },
      },
    };

    locationMock = jasmine.createSpyObj<Location>('Location', ['back']);
    timeregistrationServiceMock = jasmine.createSpyObj<TimeregistrationService>(
      'TimeregistrationService',
      ['createForm', 'createTimeregistration']
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        TimeregistrationCreateComponent,
        FormBuilder,
        UserService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        {
          provide: MsalService,
          useClass: MockAuthService,
        },
        {
          provide: Location,
          useValue: locationMock,
        },
        {
          provide: TimeregistrationService,
          useValue: timeregistrationServiceMock,
        },
      ],
    });
    sut = TestBed.inject(TimeregistrationCreateComponent);
    userServiceMock = TestBed.inject(UserService);
    formBuilderMock = TestBed.inject(FormBuilder);

    const form = formBuilderMock.group({
      ownerId: new FormControl(null),
      date: new FormControl(null),
      taskId: new FormControl(null),
      hours: new FormControl(null),
    });
    timeregistrationServiceMock.createForm.and.returnValue(form);

    const mockTimeregistration: ITimeregistration = {
      id: 0,
      tenantId: 'tenantId',
      ownerId: 0,
      date: new Date(),
      taskId: 0,
      hours: 5,
    };

    const timeregistration$ = new Observable<ITimeregistration>((observer) => {
      observer.next(mockTimeregistration);
      observer.complete();
    });
    timeregistrationServiceMock.createTimeregistration.and.returnValue(
      timeregistration$
    );

    sut.ngOnInit();
  });

  afterAll(() => {
    sut.ngOnDestroy();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  describe('#createTimeregistration', () => {
    it('call with valid form', () => {
      sut.createTimeregistration();
      expect(sut.form.valid).toBeTrue();
    });

    it('call with invalid form', () => {
      sut.form.setErrors({ error: true });
      sut.createTimeregistration();
      expect(sut.form.invalid).toBeTrue();
    });

    it('should be called once', () => {
      sut.createTimeregistration();
      expect(
        timeregistrationServiceMock.createTimeregistration
      ).toHaveBeenCalled();
    });
  });
});
