import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MsalService } from '@azure/msal-angular';
import { UserService } from './user.service';
import { IUser } from '../models/interfaces/IUser';
import { MockAuthService } from './mockauth.service.spec';

describe('UserService', () => {
  let sut: UserService;
  let mockUsers: IUser[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        UserService,
        {
          provide: MsalService,
          useClass: MockAuthService
        }
      ]
    });
    sut = TestBed.inject(UserService);

    mockUsers = [
      {
        id: 0,
        tenantId: 'tenantId',
        name: 'Test User',
        role: 'Tester',
        department: 'Test Department',
        email: 'test@test.com'
      }
    ];
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('#getUsers should return a value', () => {
    sut.getUsers().subscribe(data => expect(data).toEqual(mockUsers));
  });

  it('#createUser should return a value', () => {
    sut.createUsers(mockUsers).subscribe(data => expect(data).toEqual(mockUsers));
  });
});
