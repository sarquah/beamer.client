import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { MSALInstanceFactory } from '../app.module';
import { AdminService } from '../services/admin.service';
import { MockAuthService } from '../services/mockauth.service.spec';
import { UserService } from '../services/user.service';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
    let sut: AdminComponent;
    let formBuilderMock: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                AdminComponent,
                AdminService,
                UserService,
                FormBuilder,
                {
                    provide: MsalService,
                    useClass: MockAuthService
                }
            ]
        });
        sut = TestBed.inject(AdminComponent);
        formBuilderMock = TestBed.inject(FormBuilder);
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });

    describe('#ngOnInit should set properties', () => {
        it('loading should be false', () => {
            sut.ngOnInit();
            expect(sut.loading).toBeFalse();
        });

        it('success should be empty', () => {
            sut.ngOnInit();
            expect(sut.success).toEqual('');
        });

        it('form should return a value', () => {
            sut.ngOnInit();
            const formGroup = formBuilderMock.group({
                userGroupId: new FormControl('', Validators.required),
                adminGroupId: new FormControl('', Validators.required)
            });
            expect(sut.form.value).toEqual(formGroup.value);
        });

        it('groups$ should be an observable with value', () => {
            sut.ngOnInit();
            sut.groups$.subscribe(data => expect(data).toEqual('Mock return value'));
        });

        it('form is not valid', () => {
            sut.ngOnInit();
            sut.form.setErrors({ status: 'invalid' });
            expect(sut.form.invalid).toBeTrue();
        });

        it('form is valid', () => {
            sut.ngOnInit();
            const formGroup = formBuilderMock.group({
                userGroupId: new FormControl('userGroupId', Validators.required),
                adminGroupId: new FormControl('adminGroupId', Validators.required)
            });
            sut.form = formGroup;
            expect(sut.form.valid).toBeTrue();
        });
    });

    it('sync', () => {
        sut.ngOnInit();
        const formGroup = formBuilderMock.group({
            userGroupId: new FormControl('userGroupId', Validators.required),
            adminGroupId: new FormControl('adminGroupId', Validators.required)
        });
        sut.form = formGroup;
        expect(sut.form.valid).toBeTrue();
        sut.sync();
    });
});