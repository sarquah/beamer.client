import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminService } from './admin.service';
import { MsalService } from '@azure/msal-angular';
import { MockAuthService } from './mockauth.service.spec';
import { UserService } from './user.service';

describe('AdminService', () => {
  let sut: AdminService;
  let formBuilderMock: FormBuilder;
  let userServiceMock: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        AdminService,
        FormBuilder,
        UserService,
        {
          provide: MsalService,
          useClass: MockAuthService
        }
      ]
    });
    sut = TestBed.inject(AdminService);
    formBuilderMock = TestBed.inject(FormBuilder);
    userServiceMock = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('#getGroups should return a value', () => {
    sut.getGroups().subscribe(data => expect(data).toEqual('Mock return value'));
  });

  it('#getGroupMembers should return a value', () => {
    sut.getGroupMembers('testId').subscribe(data => expect(data).toEqual('Mock return value'));
  });

  it('#createForm should return a form', () => {
    const formGroup = formBuilderMock.group({
      userGroupId: new FormControl('', Validators.required),
      adminGroupId: new FormControl('', Validators.required)
    });
    expect(sut.createForm().value).toEqual(formGroup.value);
  });

  it('#syncGroup should return a value', () => {
    const usersMock = [
      {
        id: 0,
        name: 'name',
        department: 'department',
        role: 'role',
        tenantId: 'tenantId',
        email: 'email'
      }
    ];
    sut.syncGroup('userGroupId', 'tenantId').subscribe(users => expect(users).toEqual(usersMock));
  });
});
