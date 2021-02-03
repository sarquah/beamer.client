import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { TaskCreateComponent } from './task-create.component';
import { Location } from '@angular/common'
import { MsalService } from '@azure/msal-angular';
import { MockAuthService } from '../services/mockauth.service.spec';
import { ITask } from '../models/interfaces/ITask';
import { EStatus } from '../models/enums/EStatus';
import { Observable } from 'rxjs';

describe('TaskCreateComponent', () => {
    let sut: TaskCreateComponent;
    let locationMock: jasmine.SpyObj<Location>;
    let taskServiceMock: jasmine.SpyObj<TaskService>;
    let formBuilderMock: FormBuilder;

    beforeEach(() => {
        locationMock = jasmine.createSpyObj<Location>('Location', ['back']);
        taskServiceMock = jasmine.createSpyObj<TaskService>('TaskService', [
            'createTask',
            'createForm'
        ]);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                TaskCreateComponent,
                UserService,
                ProjectService,
                FormBuilder,
                {
                    provide: MsalService,
                    useClass: MockAuthService
                },
                {
                    provide: Location,
                    useValue: locationMock
                },
                {
                    provide: TaskService,
                    useValue: taskServiceMock
                }
            ]
        });
        sut = TestBed.inject(TaskCreateComponent);
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
        taskServiceMock.createTask.and.returnValue(task$);

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
    })

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });

    describe('#createTask', () => {
        it('call with valid form', () => {
            sut.createTask();
            expect(sut.form.valid).toBeTrue();
        });

        it('call with invalid form', () => {
            sut.form.setErrors({ error: true });
            sut.createTask();
            expect(sut.form.invalid).toBeTrue();
        });

        it('should be called once', () => {
            sut.createTask();
            expect(taskServiceMock.createTask).toHaveBeenCalled();
        });
    });
});