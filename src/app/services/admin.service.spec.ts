import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let sut: AdminService;
  let formBuilderMock: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        AdminService,
        FormBuilder
      ]
    });
    sut = TestBed.inject(AdminService);
    formBuilderMock = TestBed.inject(FormBuilder);
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
});
