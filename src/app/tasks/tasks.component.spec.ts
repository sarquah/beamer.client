import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { EStatus } from '../models/enums/EStatus';
import { IProject } from '../models/interfaces/IProject';
import { ITask } from '../models/interfaces/ITask';
import { MockAuthService } from '../services/mockauth.service.spec';
import { TaskService } from '../services/task.service';
import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let sut: TasksComponent;
  let taskServiceMock: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    taskServiceMock = jasmine.createSpyObj<TaskService>('TaskService', [
      'deleteTask',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TasksComponent,
        {
          provide: MsalService,
          useClass: MockAuthService,
        },
        {
          provide: TaskService,
          useValue: taskServiceMock,
        },
      ],
    });
    sut = TestBed.inject(TasksComponent);

    const mockTask: ITask = {
      id: 0,
      tenantId: 'tenantId',
      status: EStatus.NotStarted,
      description: 'Task created for unit test',
      ownerId: 0,
      ownerName: 'Test Tester',
      name: 'Create unit test',
      startDate: new Date(),
      endDate: new Date(),
      projectId: 0,
    };

    const task$ = new Observable<ITask>((observer) => {
      observer.next(mockTask);
      observer.complete();
    });
    taskServiceMock.deleteTask.and.returnValue(task$);

    const mockProject: IProject = {
      id: 0,
      tenantId: 'tenantId',
      status: EStatus.NotStarted,
      description: 'Project created for unit test',
      ownerId: 0,
      name: 'Unit test',
      startDate: new Date(),
      endDate: new Date(),
      tasks: [mockTask],
    };

    const project$ = new Observable<IProject>((observer) => {
      observer.next(mockProject);
      observer.complete();
    });
    sut.project = project$;
    taskServiceMock.deleteTask.and.returnValue(task$);
    sut.ngOnInit();
  });

  afterAll(() => {
    sut.ngOnDestroy();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('#delete should be called', () => {
    sut.delete(0);
    expect(taskServiceMock.deleteTask).toHaveBeenCalled();
  });
});
