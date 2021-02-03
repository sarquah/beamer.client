import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { TaskEditComponent } from './task-edit.component';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnumToArrayPipe } from '../pipes/enum-to-array.pipe';
import { EnumPipe } from '../pipes/enum.pipe';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MockAuthService } from '../services/mockauth.service.spec';
import { Observable } from 'rxjs';
import { EStatus } from '../models/enums/EStatus';
import { ITask } from '../models/interfaces/ITask';

describe('TaskEditComponent', () => {
    let sut: TaskEditComponent;
    let formBuilderMock: FormBuilder;
    let taskServiceMock: jasmine.SpyObj<TaskService>;
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

        taskServiceMock = jasmine.createSpyObj<TaskService>('TaskService', [
            'updateTask',
            'createForm',
            'getTask'
        ]);
        locationMock = jasmine.createSpyObj<Location>('Location', ['back']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                TaskEditComponent,
                UserService,
                ProjectService,
                EnumPipe,
                EnumToArrayPipe,
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
                    provide: TaskService,
                    useValue: taskServiceMock
                },
                {
                    provide: Location,
                    useValue: locationMock
                }
            ]
        });
        sut = TestBed.inject(TaskEditComponent);

        formBuilderMock = TestBed.inject(FormBuilder);

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
            projectId: 0
        };

        const task$ = new Observable<ITask>((observer) => {
            observer.next(mockTask);
            observer.complete();
        });
        taskServiceMock.updateTask.and.returnValue(task$);
        taskServiceMock.getTask.and.returnValue(task$);

        const form = formBuilderMock.group({
            name: new FormControl(null),
            description: new FormControl(null),
            ownerId: new FormControl(null),
            startDate: new FormControl(null),
            endDate: new FormControl(null),
            status: new FormControl(null)
        });
        taskServiceMock.createForm.and.returnValue(form);

        sut.ngOnInit();
    });

    afterAll(() => {
        sut.ngOnDestroy();
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });

    describe('#updateTask', () => {
        it('call with valid form', () => {
            sut.updateTask();
            expect(sut.form.valid).toBeTrue()
        });

        it('call with invalid form', () => {
            sut.form.setErrors({ error: true });
            sut.updateTask();
            expect(sut.form.invalid).toBeTrue()
        });

        it('should be called', () => {
            sut.updateTask();
            expect(taskServiceMock.updateTask).toHaveBeenCalled();
        });
    });

    it('#goBack should be called', () => {
        sut.goBack();
        expect(locationMock.back).toHaveBeenCalled();
    });
});