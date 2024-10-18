import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';
import {genericAuthGuard} from './role-based.guard';


describe('genericAuthGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => genericAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
