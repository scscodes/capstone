import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export type UserRole = 'patient' | 'staff' | 'admin' | null;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentRoleSubject = new BehaviorSubject<UserRole>('admin') // default to admin

  constructor() { }

  setRole(value: UserRole){
    this.currentRoleSubject.next(value);
  }

  getRole(){
    return this.currentRoleSubject.getValue();
  }

  getRole$(){
    return this.currentRoleSubject.asObservable();
  }
}
