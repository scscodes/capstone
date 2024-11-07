import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../../core/user.service';
import {UserRole} from '../../core/User';
import {MatTooltip} from '@angular/material/tooltip';
import {MaterialModule} from '../../resources/material.module';
import {RoleToggleComponent} from '../role-toggle/role-toggle.component';

// <mat-icon>contacts</mat-icon>
// <mat-icon>dataset</mat-icon>
// <mat-icon>api</mat-icon>
// <mat-icon>dns</mat-icon>

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, MatTooltip, RoleToggleComponent],
  template: `
    <mat-toolbar>
      <span class="heading-info">M3</span>
      <app-role-toggle></app-role-toggle>
      <div class="heading-info">
        <span matTooltip="Users" matTooltipPosition="below"><mat-icon>group</mat-icon>{{sumAllUsers}}</span>
      </div>
    </mat-toolbar>
  `,
  styles: `
    .heading-info{
      pointer-events: none;
      display: block;
    }
  `
})
export class HeaderComponent {

  private greetings: string[] = ["Hello", "Hi", "Welcome", "Greetings", "Good day"];

  constructor(public us: UserService) {}
  @Input() role!: UserRole;
  @Output() roleChange = new EventEmitter<UserRole>();

  get sumAllUsers(){
    return Object.values(this.us.userCount).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  getRandomGreeting(): string {
    const randomIndex = Math.floor(Math.random() * this.greetings.length);
    return this.greetings[randomIndex];
  }

}
