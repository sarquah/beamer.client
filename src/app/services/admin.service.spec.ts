import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let sut: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        AdminService,
        FormBuilder
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    sut = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });
});
