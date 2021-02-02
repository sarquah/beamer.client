import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MockAuthService } from '../services/mockauth.service.spec';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { ProjectCreateComponent } from './project-create.component';

describe('ProjectCreateComponent', () => {
    let sut: ProjectCreateComponent;
    let formBuilderMock: FormBuilder;

    beforeEach(() => {
        const routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                ProjectCreateComponent,
                ProjectService,
                UserService,
                FormBuilder,
                {
                    provide: Router,
                    useValue: routerMock
                },
                {
                    provide: MsalService,
                    useClass: MockAuthService
                }
            ]
        });
        sut = TestBed.inject(ProjectCreateComponent);
        formBuilderMock = TestBed.inject(FormBuilder);
        sut.ngOnInit();
    });

    afterAll(() => {
        sut.ngOnDestroy();
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });

    describe('#createProject', () => {
        it('Call with valid form', () => {
            sut.createProject();
            expect(sut.form.valid).toBeTrue();
        });

        it('Call with invalid form', () => {
            sut.form.setErrors({ error: true })
            sut.createProject();
            expect(sut.form.invalid).toBeTrue();
        });
    });
});