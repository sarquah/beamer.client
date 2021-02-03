import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { EStatus } from '../models/enums/EStatus';
import { IProject } from '../models/interfaces/IProject';
import { MockAuthService } from '../services/mockauth.service.spec';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { ProjectCreateComponent } from './project-create.component';

describe('ProjectCreateComponent', () => {
    let sut: ProjectCreateComponent;
    let formBuilderMock: FormBuilder;
    let projectServiceMock: jasmine.SpyObj<ProjectService>;

    beforeEach(() => {
        const routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);
        projectServiceMock = jasmine.createSpyObj<ProjectService>('ProjectService', [
            'createProject',
            'createForm'
        ]);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                ProjectCreateComponent,
                UserService,
                FormBuilder,
                {
                    provide: Router,
                    useValue: routerMock
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
        sut = TestBed.inject(ProjectCreateComponent);
        formBuilderMock = TestBed.inject(FormBuilder);

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

        const createProject$ = new Observable<IProject>((observer) => {
            observer.next(mockProject);
            observer.complete();
        });
        projectServiceMock.createProject.and.returnValue(createProject$);

        const form = formBuilderMock.group({
            name: new FormControl(null),
            description: new FormControl(null),
            ownerId: new FormControl(null),
            startDate: new FormControl(null),
            endDate: new FormControl(null),
            status: new FormControl(null)
        });
        projectServiceMock.createForm.and.returnValue(form);

        sut.ngOnInit();
    });

    afterAll(() => {
        sut.ngOnDestroy();
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });

    describe('#createProject', () => {
        it('call with valid form', () => {
            sut.createProject();
            expect(sut.form.valid).toBeTrue();
        });

        it('call with invalid form', () => {
            sut.form.setErrors({ error: true })
            sut.createProject();
            expect(sut.form.invalid).toBeTrue();
        });

        it('called once', () => {
            sut.createProject();
            expect(projectServiceMock.createProject).toHaveBeenCalled();
        });
    });
});