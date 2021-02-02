import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { IUser } from '../models/interfaces/IUser';
import { AdminService } from '../services/admin.service';
import { MockAuthService } from '../services/mockauth.service.spec';
import { UserService } from '../services/user.service';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
    let sut: AdminComponent;
    let formBuilderMock: FormBuilder;
    let adminServiceMock = jasmine.createSpyObj<AdminService>('AdminService', [
        'getGroups',
        'createForm',
        'syncGroup'
    ]);
    const users: IUser[] = [{
        id: 0,
        name: 'name',
        department: 'department',
        role: 'role',
        tenantId: 'tenantId',
        email: 'email'
    }];

    const createAdminServiceMock = (adminService: jasmine.SpyObj<AdminService>, formBuilder: FormBuilder, usersMock: IUser[]):
        jasmine.SpyObj<AdminService> => {
        // Create getGroups return value
        const getGroupsReturn: Observable<any> = new Observable((observer) => {
            observer.next('getGroups');
            observer.complete();
        });
        adminService.getGroups.and.returnValue(getGroupsReturn);

        // Create createForm return value
        const createFormReturn = formBuilder.group({
            userGroupId: new FormControl('', Validators.required),
            adminGroupId: new FormControl('', Validators.required)
        });
        adminService.createForm.and.returnValue(createFormReturn);

        // Create syncGroup return value
        const syncGroupReturn: Observable<any> = new Observable((observer) => {
            observer.next(usersMock);
            observer.complete();
        });
        adminService.syncGroup.and.returnValue(syncGroupReturn);

        return adminService;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                AdminComponent,
                FormBuilder,
                AdminService,
                UserService,
                {
                    provide: MsalService,
                    useClass: MockAuthService
                },
                {
                    provide: AdminService,
                    useValue: adminServiceMock
                }
            ]
        });
        sut = TestBed.inject(AdminComponent);
        formBuilderMock = TestBed.inject(FormBuilder);
        adminServiceMock = createAdminServiceMock(adminServiceMock, formBuilderMock, users);
        sut.ngOnInit();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });

    describe('#ngOnInit should set properties', () => {
        it('loading should be false', () => {
            expect(sut.loading).toBeFalse();
        });

        it('success should be empty', () => {
            expect(sut.success).toEqual('');
        });

        it('form should return a value', () => {
            const formGroup = formBuilderMock.group({
                userGroupId: new FormControl('', Validators.required),
                adminGroupId: new FormControl('', Validators.required)
            });
            expect(sut.form.value).toEqual(formGroup.value);
        });

        it('groups$ should be an observable with value', () => {
            sut.groups$.subscribe(data => expect(data).toEqual('getGroups'));
        });

        it('form is invalid', () => {
            sut.form.setErrors({ status: 'invalid' });
            expect(sut.form.invalid).toBeTrue();
        });

        it('form is valid', () => {
            const formGroup = formBuilderMock.group({
                userGroupId: new FormControl('userGroupId', Validators.required),
                adminGroupId: new FormControl('adminGroupId', Validators.required)
            });
            sut.form = formGroup;
            expect(sut.form.valid).toBeTrue();
        });
    });

    describe('#sync', () => {
        it('call with valid form', () => {
            const formGroup = formBuilderMock.group({
                userGroupId: new FormControl('userGroupId', Validators.required),
                adminGroupId: new FormControl('adminGroupId', Validators.required)
            });
            sut.form = formGroup;
            expect(sut.form.valid).toBeTrue();
            sut.sync();
        });

        it('adminService should return data', () => {
            const formGroup = formBuilderMock.group({
                userGroupId: new FormControl('userGroupId', Validators.required),
                adminGroupId: new FormControl('adminGroupId', Validators.required)
            });
            sut.form = formGroup;
            const groupMembers: IUser[] = [{
                id: 0,
                name: 'name',
                department: 'department',
                role: 'role',
                tenantId: 'tenantId',
                email: 'email'
            }];
            adminServiceMock.syncGroup('groupId', 'tenantId').subscribe(usersMock => expect(usersMock).toEqual(groupMembers));
            sut.sync();
            expect(sut.loading).toBeFalse();
            expect(sut.success).toEqual('Groups have been synchronized');
        });

        it('call with invalid form', () => {
            sut.form.setErrors({ error: true });
            sut.sync();
            expect(sut.form.invalid).toBeTrue();
        });
    });
});