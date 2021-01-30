import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EStatus } from '../models/enums/EStatus';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { MSALInstanceFactory } from '../app.module';
import { TaskService } from './task.service';
import { ITask } from '../models/interfaces/ITask';

describe('TaskService', () => {
  let sut: TaskService;
  let formBuilderMock: FormBuilder = new FormBuilder();
  let mockTasks: ITask[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        TaskService,
        FormBuilder,
        MsalService,
        {
          provide: MSAL_INSTANCE,
          useFactory: MSALInstanceFactory
        }
      ]
    });
    formBuilderMock = TestBed.inject(FormBuilder);
    sut = TestBed.inject(TaskService);

    mockTasks = [
      {
        id: 0,
        tenantId: 'tenantId',
        status: EStatus.NotStarted,
        description: 'Task created for unit test',
        ownerId: 0,
        name: 'Create unit test',
        startDate: new Date(),
        endDate: new Date()
      }
    ];
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('#getTasks should return a value', () => {
    sut.getTasks().subscribe(data => expect(data).toEqual(mockTasks));
  });

  it('#getTask should return a value', () => {
    sut.getTask(0).subscribe(data => expect(data).toEqual(mockTasks[0]));
  });

  it('#updateTask should return a value', () => {
    sut.updateTask(0, mockTasks[0]).subscribe(data => expect(data).toEqual(mockTasks[0]));
  });

  it('#deleteTask should return a value', () => {
    sut.deleteTask(0).subscribe(data => expect(data).toEqual(mockTasks[0]));
  });

  it('#createTask should return a value', () => {
    sut.createTask(mockTasks[0]).subscribe(data => expect(data).toEqual(mockTasks[0]));
  });

  it('#createForm should return a form', () => {
    const formGroup = formBuilderMock.group({
      name: new FormControl(null),
      description: new FormControl(null),
      ownerId: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      status: new FormControl(null),
      projectId: new FormControl(null)
    });
    expect(sut.createForm().value).toEqual(formGroup.value);
  });
});
