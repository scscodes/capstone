import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from './user.service';


export const RoleGuard: CanActivateFn = (route, state) => {
  const us = inject(UserService);
  const router = inject(Router);

  const userRole = us.userSubject.getValue().role;
  if(userRole){
    return true;
  }
  router.navigate(['/welcome'])
  return false;
}


export const StaffRoleGuard: CanActivateFn = () => {
  const us = inject(UserService);
  const router = inject(Router);

  const userRole = us.userSubject.getValue().role;
  if(!userRole){
    router.navigate(['/welcome'], {replaceUrl: true}).then();
  }
  if(userRole !== 'patient'){
    return true;
  }
  router.navigate(['/unauthorized'])
  return false;
};

export const PatientRoleGuard: CanActivateFn = () => {
  const us = inject(UserService);
  const router = inject(Router);

  const userRole = us.userSubject.getValue().role;
  if(!userRole){
    router.navigate(['/welcome'], {replaceUrl: true}).then();
  }
  if(userRole === 'patient'){
    return true;
  }
  router.navigate(['/unauthorized'])
  return false;
};
