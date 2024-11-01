import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User, UserProperties, UserRole} from './User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUser: User = new User({email: 'fake@email.com', firstName: 'Bad', lastName: 'Actor', role: null})
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.baseUser);

  private mockUserData: UserProperties[] = [
    { firstName: 'Abe', lastName: 'Link', email: 'abe.link@expres.com', role: 'admin' },
    { firstName: 'Ten', lastName: 'Ticonderoga', email: 'ten.ticonderoga@pencils.com', role: 'staff' },
    { firstName: 'Judi', lastName: 'Dench', email: 'm@uk.gov', role: 'staff' },
    { firstName: 'John', lastName: 'Adams', email: 'john.adams@adamsfam.com', role: 'patient' },
    { firstName: 'John', lastName: 'Locke', email: 'lockes@treaty.com', role: 'patient' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'patient' },
    { firstName: 'Emily', lastName: 'Airhart', email: 'acepilot@prop.com', role: 'patient' },
    { firstName: 'Ronald', lastName: 'Donald', email: 'ronny.donald@fries.com', role: 'patient' },
  ];

  constructor() {
    this.createMockUsers();
  }

  private createMockUsers() {
    for (const propertyValues of this.mockUserData) {
      try {
        const newUser = new User(propertyValues);
        console.log(`Created user: ${newUser.userName} with UID: ${newUser.UID}`);
      } catch (error) {
        // @ts-ignore
        console.error(error.message);
      }
    }
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
    this._userSubject.next(value);
  }

  get userSubject(): BehaviorSubject<User>{
    return this._userSubject;
  }

  get userCount(){
    return User.getRoleCounters();
  }
}
