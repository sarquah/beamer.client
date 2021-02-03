import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { EStatus } from '../models/enums/EStatus';
import { IProject } from '../models/interfaces/IProject';
import { EnumPipe } from '../pipes/enum.pipe';
import { MockAuthService } from '../services/mockauth.service.spec';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
    let sut: ProjectDetailsComponent;
    let formBuilderMock: FormBuilder;
    const routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);

    beforeEach(() => {
        const activatedRouteMock = {
            snapshot: {
                paramMap: {
                    get: (id) => {
                        return 0;
                    }
                }
            }
        };

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                ProjectDetailsComponent,
                ProjectService,
                UserService,
                FormBuilder,
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
                }
            ]
        });
        sut = TestBed.inject(ProjectDetailsComponent);
        formBuilderMock = TestBed.inject(FormBuilder);
        sut.ngOnInit();
    });

    afterAll(() => {
        sut.ngOnDestroy();
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });

    it('#deleteProject should not change project', () => {
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
        sut.deleteProject();
        sut.project$.subscribe(project => expect(project).toEqual(mockProject))
    });
});