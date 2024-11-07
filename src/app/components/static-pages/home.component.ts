import {Component} from '@angular/core';
import {UserService} from '../../core/user.service';
import {User} from '../../core/User';
import {HeaderComponent} from '../structural/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderComponent,
    RouterOutlet
  ],
  template: `
    <app-header [role]="user.role"></app-header>
    <router-outlet></router-outlet>
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
