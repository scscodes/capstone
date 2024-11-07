import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User, UserProperties, UserRole} from './User';
import {Names} from '../resources/Names';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUser: User = new User({email: 'fake@email.com', firstName: 'Bad', lastName: 'Actor', role: null})
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.baseUser);

  private static users: User[] = [];

  constructor() {
    // Initialize users with various roles
    const baseRoles = ['patient', 'staff', 'admin'];
    UserService.users = Names.map(fullname => {
      const name = fullname.split(' ')
      const email = `${name[0].toLowerCase()}${name[1].toLowerCase()}@email.com`;
      const role = baseRoles[Math.floor(Math.random() * baseRoles.length)];
      const finalizedProperties: UserProperties = {
        firstName: name[0],
        lastName: name[1],
        email: email,
        role: role as UserRole
      }
      return new User(finalizedProperties)
    });

    console.log('Mocked Users', User.getRoleCounters())
  }

  changeRole(role: UserRole){
    // Given a role, randomly select a compatible user, updating subject with the latest
    const reducedByRole = UserService.users.filter(r => r.role === role);
    this.userSubject = reducedByRole[Math.floor(Math.random() * reducedByRole.length)];
  }

  registerUser$(propertyValues: UserProperties): Observable<User>{
    const user = new User(propertyValues);
    if(!user){
      throw new Error('Uh-oh, experienced a problem registering that user.');
    }
    console.log(`Created user: ${user.userName} with UID: ${user.UID}`);
    this.userSubject = user;
    return this.userSubject.asObservable() as Observable<User>;
  }

  private set userSubject(value: User){
    // Update existing user subject with a new user value; functional equivalent to changing logged-in user
    this._userSubject.next(value);
  }

  get patients(){
    return UserService.users.filter(u => u.role === 'patient');
  }

  get userSubject(): BehaviorSubject<User>{
    return this._userSubject;
  }

  get userCount(){
    return User.getRoleCounters();
  }
}
