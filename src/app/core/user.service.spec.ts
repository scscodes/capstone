import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get/set user role, given valid input', () => {
    // is initialized with a value
    expect(service.getRole()).toBeTruthy();

    // updates subject with valid role
    service.setRole('patient');
    expect(service.getRole()).toEqual('patient');
    service.setRole('staff');
    expect(service.getRole()).toEqual('staff');
  });
});
