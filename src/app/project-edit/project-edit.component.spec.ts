import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { EStatus } from '../models/enums/EStatus';
import { IProject } from '../models/interfaces/IProject';
import { EnumPipe } from '../pipes/enum.pipe';
import { MockAuthService } from '../services/mockauth.service.spec';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { ProjectEditComponent } from './project-edit.component';
import { Location } from '@angular/common'

describe('ProjectEditComponent', () => {
    let sut: ProjectEditComponent;
    let formBuilderMock: FormBuilder;
    let projectServiceMock: jasmine.SpyObj<ProjectService>;
    let locationMock: jasmine.SpyObj<Location>;

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
            'getProject',
            'updateProject',
            'createForm'
        ]);

        locationMock = jasmine.createSpyObj<Location>('Location', [ 'back' ]);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                ProjectEditComponent,
                UserService,
                EnumPipe,
                FormBuilder,
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
                },
                {
                    provide: Location,
                    useValue: locationMock
                }
            ]
        });
        sut = TestBed.inject(ProjectEditComponent);
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

        const project$ = new Observable<IProject>((observer) => {
            observer.next(mockProject);
            observer.complete();
        });
        projectServiceMock.getProject.and.returnValue(project$);
        projectServiceMock.updateProject.and.returnValue(project$);

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

    describe('#updateProject', () => {
        it('call with valid form', () => {
            sut.updateProject();
            expect(sut.form.valid).toBeTrue();
        });

        it('call with invalid form', () => {
            sut.form.setErrors({ error: true });
            sut.updateProject();
            expect(sut.form.invalid).toBeTrue();
        });

        it('should be called', () => {
            sut.updateProject();
            expect(projectServiceMock.updateProject).toHaveBeenCalled();
        });
    });

    it('#goBack should be called', () => {
        sut.goBack();
        expect(locationMock.back).toHaveBeenCalled();
    });
});