import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MsalService } from '@azure/msal-angular';
import { MockAuthService } from '../services/mockauth.service.spec';
import { TaskService } from '../services/task.service';
import { TimeregistrationService } from '../services/timeregistration.service';

import { TimeregistrationsComponent } from './timeregistrations.component';

describe('TimeregistrationsComponent', () => {
  let sut: TimeregistrationsComponent;
  let taskServiceMock: jasmine.SpyObj<TaskService>
  let timeregistrationServiceMock: jasmine.SpyObj<TimeregistrationService>

  beforeEach(() => {
    taskServiceMock = jasmine.createSpyObj<TaskService>('TaskService', ['getTask']);
    timeregistrationServiceMock = jasmine.createSpyObj<TimeregistrationService>('TimeregistrationService', ['getTimeregistrationsForTask']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TimeregistrationsComponent,
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
    })
    sut = TestBed.inject(TimeregistrationsComponent)
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
