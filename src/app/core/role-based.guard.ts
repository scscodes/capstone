import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserRole, UserService} from '../user.service';
import {map} from 'rxjs';

const userService = inject(UserService);
const router = inject(Router);

const patientAccessRoles: Set<string> = new Set(['patient', 'admin']);
const staffAccessRoles: Set<string> = new Set(['staff', 'admin']);
const allAccessRoles: Set<string> = new Set([...patientAccessRoles, ...staffAccessRoles])

const roleValidatorFn = (permittedRoles: Set<string>) => userService.getRole$().pipe(
  map((role: UserRole) => {
    if(!role){
      return router.createUrlTree(['/unauthorized']);
    } else if(permittedRoles.has(role)){
      return true
    }
    return router.createUrlTree(['/unauthorized']);
  })
)

export const genericAuthGuard: CanActivateChildFn = () => {
  return roleValidatorFn(allAccessRoles);
}

export const patientAuthGuard: CanActivateChildFn = () => {
  return roleValidatorFn(patientAccessRoles);
};

export const staffAuthGuard: CanActivateChildFn = () => {
  return roleValidatorFn(staffAccessRoles);
};
