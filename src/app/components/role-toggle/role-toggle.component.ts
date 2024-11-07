import {Component} from '@angular/core';
import {UserService} from '../../core/user.service';
import {MaterialModule} from '../../resources/material.module';

@Component({
  selector: 'app-role-toggle',
  standalone: true,
  imports: [MaterialModule],
  template: `
    <mat-button-toggle-group
      name="userRole"
      aria-label="User role"
    >
      <mat-button-toggle
        (click)="us.changeRole('patient')">Patient
      </mat-button-toggle>
      <mat-button-toggle
        (click)="us.changeRole('staff')">Staff
      </mat-button-toggle>
      <mat-button-toggle
        (click)="us.changeRole('admin')">Admin
      </mat-button-toggle>
    </mat-button-toggle-group>
  `,
  styleUrl: './role-toggle.component.scss'
})
export class RoleToggleComponent {
  constructor(public us: UserService) {}
}
