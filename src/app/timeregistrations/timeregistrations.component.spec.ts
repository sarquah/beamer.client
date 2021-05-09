import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { ITimeregistration } from '../models/interfaces/ITimeregistration';
import { MockAuthService } from '../services/mockauth.service.spec';
import { TaskService } from '../services/task.service';
import { TimeregistrationService } from '../services/timeregistration.service';
import { TimeregistrationsComponent } from './timeregistrations.component';

describe('TimeregistrationsComponent', () => {
  let sut: TimeregistrationsComponent;
  let taskServiceMock: jasmine.SpyObj<TaskService>;
  let timeregistrationServiceMock: jasmine.SpyObj<TimeregistrationService>;

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
    taskServiceMock = jasmine.createSpyObj<TaskService>('TaskService', [
      'getTask',
    ]);
    timeregistrationServiceMock = jasmine.createSpyObj<TimeregistrationService>(
      'TimeregistrationService',
      ['getTimeregistrationsForTask', 'deleteTimeregistration']
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TimeregistrationsComponent,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        {
          provide: MsalService,
          useClass: MockAuthService,
        },
        {
          provide: TaskService,
          useValue: taskServiceMock,
        },
        {
          provide: TimeregistrationService,
          useValue: timeregistrationServiceMock,
        },
      ],
    });

    const mockTimeregistrations: ITimeregistration[] = [
      {
        id: 0,
        tenantId: 'tenantId',
        ownerId: 0,
        date: new Date(),
        taskId: 0,
        hours: 5,
      },
    ];

    const timeregistrations$ = new Observable<ITimeregistration[]>(
      (observer) => {
        observer.next(mockTimeregistrations);
        observer.complete();
      }
    );
    timeregistrationServiceMock.getTimeregistrationsForTask.and.returnValue(
      timeregistrations$
    );

    timeregistrationServiceMock.deleteTimeregistration.and.returnValue(timeregistrations$);

    sut = TestBed.inject(TimeregistrationsComponent);

    sut.ngOnInit();
  });

  afterAll(() => {
    sut.ngOnDestroy();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('#delete should be called', () => {
    sut.delete(0);
    expect(
      timeregistrationServiceMock.deleteTimeregistration
    ).toHaveBeenCalled();
  });
});
