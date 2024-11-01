import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../layout/header.component';
import {UserService} from '../../core/user.service';
import {User} from '../../core/User';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  template: `
    <app-header [role]="user.role"></app-header>
  `,
  styles: ``
})
export class HomeComponent {
  private _user!: User;
  constructor(private us: UserService) {
    this.us.userSubject.subscribe(u => this.user = u)
  }

  private set user(user: User) {
    this._user = user;
  }

  get user(){
    return this._user;
  }
}
