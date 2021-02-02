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
        'getGroupMembers',
        'getGroups',
        'createForm'
    ]);
    let userServiceMock = jasmine.createSpyObj<UserService>('UserService', ['createUsers']);
    const users: IUser[] = [{
        id: 0,
        name: 'name',
        department: 'department',
        role: 'rolee',
        tenantId: 'tenantId',
        email: 'email'
    }];

    const createAdminServiceMock = (adminService: jasmine.SpyObj<AdminService>, formBuilder: FormBuilder, usersMock: IUser[]):
        jasmine.SpyObj<AdminService> => {
        const groupMembers = {
            value: usersMock
        };

        const getGroupMembersReturn: Observable<any> = new Observable((observer) => {
            observer.next(groupMembers);
            observer.complete();
        });
        adminService.getGroupMembers.and.returnValue(getGroupMembersReturn);

        const getGroupsReturn: Observable<any> = new Observable((observer) => {
            observer.next('getGroups');
            observer.complete();
        });
        adminService.getGroups.and.returnValue(getGroupsReturn);

        const createFormReturn = formBuilder.group({
            userGroupId: new FormControl('', Validators.required),
            adminGroupId: new FormControl('', Validators.required)
        });
        adminService.createForm.and.returnValue(createFormReturn);
        return adminService;
    }

    const createUserServiceThrowErrorMock = (userService: jasmine.SpyObj<UserService>):
        jasmine.SpyObj<UserService> => {
            userService.createUsers.and.throwError('Introduced error in unit test');
        return userService
    }

    const createUserServiceMock = (userService: jasmine.SpyObj<UserService>, usersMock: IUser[]):
        jasmine.SpyObj<UserService> => {
        const users$: Observable<IUser[]> = new Observable((observer) => {
            observer.next(usersMock);
            observer.complete();
        });
        userService.createUsers.and.returnValue(users$);
        return userService
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
                {
                    provide: AdminService,
                    useValue: adminServiceMock
                },
                {
                    provide: MsalService,
                    useClass: MockAuthService
                },
                {
                    provide: UserService,
                    useValue: userServiceMock
                }
            ]
        });
        sut = TestBed.inject(AdminComponent);
        formBuilderMock = TestBed.inject(FormBuilder);
        adminServiceMock = createAdminServiceMock(adminServiceMock, formBuilderMock, users);
    });

    afterAll(() => {
        TestBed.resetTestingModule();
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
            sut.groups$.subscribe(data => expect(data).toEqual('getGroups'));
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

    describe('#sync side effects', () => {
        it('should be called', () => {
            userServiceMock = createUserServiceMock(userServiceMock, users);
            const formGroup = formBuilderMock.group({
                userGroupId: new FormControl('userGroupId', Validators.required),
                adminGroupId: new FormControl('adminGroupId', Validators.required)
            });
            sut.form = formGroup;
            expect(sut.form.valid).toBeTrue();
            sut.sync();
        });

        it('userService should return error', () => {
            userServiceMock = createUserServiceThrowErrorMock(userServiceMock);
            const formGroup = formBuilderMock.group({
                userGroupId: new FormControl('userGroupId', Validators.required),
                adminGroupId: new FormControl('adminGroupId', Validators.required)
            });
            sut.form = formGroup;
            expect(() => userServiceMock.createUsers([{
                id: 0,
                name: 'name',
                department: 'department',
                role: 'rolee',
                tenantId: 'tenantId',
                email: 'email'
            }])).toThrowError('Introduced error in unit test');
            sut.sync()
        });

        it('adminService should return data', () => {
            userServiceMock = createUserServiceMock(userServiceMock, users);
            const formGroup = formBuilderMock.group({
                userGroupId: new FormControl('userGroupId', Validators.required),
                adminGroupId: new FormControl('adminGroupId', Validators.required)
            });
            sut.form = formGroup;
            const groupMembers = {
                value: [{
                    id: 0,
                    name: 'name',
                    department: 'department',
                    role: 'rolee',
                    tenantId: 'tenantId',
                    email: 'email'
                }]
            };
            adminServiceMock.getGroupMembers('groupMember').subscribe(x => expect(x).toEqual(groupMembers));
            sut.sync();
        });
    });
});