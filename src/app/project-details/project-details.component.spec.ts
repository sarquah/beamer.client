import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { EStatus } from '../models/enums/EStatus';
import { IProject } from '../models/interfaces/IProject';
import { EnumPipe } from '../pipes/enum.pipe';
import { MockAuthService } from '../services/mockauth.service.spec';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
    let sut: ProjectDetailsComponent;
    const routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);
    let projectServiceMock: jasmine.SpyObj<ProjectService>;

    beforeEach(() => {
        const activatedRouteMock = {
            snapshot: {
                paramMap: {
                    get: () => {
                        return 0;
                    }
                }
            }
        };

        projectServiceMock = jasmine.createSpyObj<ProjectService>('ProjectService', [
            'deleteProject',
            'getProject'
        ]);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                ProjectDetailsComponent,
                UserService,
                EnumPipe,
                {
                    provide: Router,
                    useValue: routerMock
                },
                {
                    provide: ActivatedRoute,
                    useValue: activatedRouteMock
                },
                {
                    provide: MsalService,
                    useClass: MockAuthService
                },
                {
                    provide: ProjectService,
                    useValue: projectServiceMock
                }
            ]
        });
        sut = TestBed.inject(ProjectDetailsComponent);

        const deleteProject$ = new Observable<any>((observer) => {
            observer.next('Test');
            observer.complete();
        });
        projectServiceMock.deleteProject.and.returnValue(deleteProject$);

        const mockProject: IProject = {
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
        };

        const getProject$ = new Observable<IProject>((observer) => {
            observer.next(mockProject);
            observer.complete();
        });
        projectServiceMock.getProject.and.returnValue(getProject$);

        sut.ngOnInit();
    });

    afterAll(() => {
        sut.ngOnDestroy();
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });

    it('#deleteProject should be called', () => {
        sut.deleteProject();
        expect(projectServiceMock.deleteProject).toHaveBeenCalled();
    });
});