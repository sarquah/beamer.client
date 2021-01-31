import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProjectService } from './project.service';
import { IProject } from '../models/interfaces/IProject';
import { EStatus } from '../models/enums/EStatus';
import { MsalService } from '@azure/msal-angular';
import { MockAuthService } from './mockauth.service';

describe('ProjectService', () => {
  let sut: ProjectService;
  let formBuilderMock: FormBuilder = new FormBuilder();
  let mockProjects: IProject[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        ProjectService,
        FormBuilder,
        {
          provide: MsalService,
          useClass: MockAuthService
        }
      ]
    });
    formBuilderMock = TestBed.inject(FormBuilder);
    sut = TestBed.inject(ProjectService);

    mockProjects = [
      {
        id: 0,
        tenantId: 'tenantId',
        status: EStatus.NotStarted,
        description: 'Project created for unit test',
        ownerId: 0,
        name: 'Unit test',
        startDate: new Date(),
        endDate: new Date(),
        tasks: [
          {
            id: 0,
            tenantId: 'tenantId',
            status: EStatus.NotStarted,
            description: 'Task created for unit test',
            ownerId: 0,
            name: 'Create unit test',
            startDate: new Date(),
            endDate: new Date(),
          }
        ]
      }
    ];
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('#getProjects should return a value', () => {
    sut.getProjects().subscribe(data => expect(data).toEqual(mockProjects));
  });

  it('#getProject should return a value', () => {
    sut.getProject(0).subscribe(data => expect(data).toEqual(mockProjects[0]));
  });

  it('#updateProject should return a value', () => {
    sut.updateProject(0, mockProjects[0]).subscribe(data => expect(data).toEqual(mockProjects[0]));
  });

  it('#deleteProject should return a value', () => {
    sut.deleteProject(0).subscribe(data => expect(data).toEqual(mockProjects[0]));
  });

  it('#createProject should return a value', () => {
    sut.createProject(mockProjects[0]).subscribe(data => expect(data).toEqual(mockProjects[0]));
  });

  it('#createForm should return a form', () => {
    const formGroup = formBuilderMock.group({
      name: new FormControl(null),
      description: new FormControl(null),
      ownerId: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      status: new FormControl(null)
    });
    expect(sut.createForm().value).toEqual(formGroup.value);
  });
});
