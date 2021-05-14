import { TestBed } from '@angular/core/testing';
import { TimeregistrationService } from '../services/timeregistration.service';
import { Location } from '@angular/common';

import { TimeregistrationEditComponent } from './timeregistration-edit.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MockAuthService } from '../services/mockauth.service.spec';
import { ITimeregistration } from '../models/interfaces/ITimeregistration';
import { Observable } from 'rxjs';

describe('TimeregistrationEditComponent', () => {
  let sut: TimeregistrationEditComponent;
  let formBuilderMock: FormBuilder;
  let timeregistrationServiceMock: jasmine.SpyObj<TimeregistrationService>;
  let locationMock: jasmine.SpyObj<Location>;

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

    timeregistrationServiceMock = jasmine.createSpyObj<TimeregistrationService>(
      'TimeregistrationService',
      ['updateTimeregistration', 'createForm', 'getTimeregistration']
    );
    locationMock = jasmine.createSpyObj<Location>('Location', ['back']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        TimeregistrationEditComponent,
        UserService,
        FormBuilder,
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
          useValue: timeregistrationServiceMock
        }
      ],
    });
    sut = TestBed.inject(TimeregistrationEditComponent);

    formBuilderMock = TestBed.inject(FormBuilder);

    const mockTimeregistration: ITimeregistration = {
      id: 0,
      tenantId: 'tenantId',
      ownerId: 0,
      date: new Date(),
      hours: 4,
      taskId: 0,
    };

    const timeregistration$ = new Observable<ITimeregistration>((observer) => {
      observer.next(mockTimeregistration);
      observer.complete();
    });
    timeregistrationServiceMock.updateTimeregistration.and.returnValue(
      timeregistration$
    );
    timeregistrationServiceMock.getTimeregistration.and.returnValue(
      timeregistration$
    );

    const form = formBuilderMock.group({
      ownerId: new FormControl(null),
      date: new FormControl(null),
      hours: new FormControl(null),
      taskId: new FormControl(null),
    });
    timeregistrationServiceMock.createForm.and.returnValue(form);

    sut.ngOnInit();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  afterAll(() => {
    sut.ngOnDestroy();
  });

  describe('#updateTimeregistration', () => {
    it('call with valid form', () => {
      sut.updateTimeregistration();
      expect(sut.form.valid).toBeTrue();
    });

    it('call with invalid form', () => {
      sut.form.setErrors({ error: true });
      sut.updateTimeregistration();
      expect(sut.form.invalid).toBeTrue();
    });

    it('should be called', () => {
      sut.updateTimeregistration();
      expect(timeregistrationServiceMock.updateTimeregistration).toHaveBeenCalled();
    });
  });

  it('#goBack should be called', () => {
    sut.goBack();
    expect(locationMock.back).toHaveBeenCalled();
  });
});
