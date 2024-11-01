import {Component, Input} from '@angular/core';
import {MaterialModule} from '../../shared/material.module';
import {UserService} from '../../core/user.service';
import {UserRole} from '../../core/User';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, MatTooltip],
  template: `
    <mat-toolbar>
      <span>M3</span>
      <div
        matTooltip="Role: {{role | titlecase}}"
        matTooltipPosition="right"
        matTooltipHideDelay="1000">
        <ng-container *ngIf="role; else nullRole">
          <mat-icon class="success color">check_circle</mat-icon>
        </ng-container>
        <ng-template #nullRole>
          <mat-icon>error</mat-icon>
        </ng-template>
        <mat-icon>contacts</mat-icon>
        <mat-icon>dataset</mat-icon>
        <mat-icon>api</mat-icon>
        <mat-icon>dns</mat-icon>
        <mat-icon>group</mat-icon>
      </div>
    </mat-toolbar>
  `,
  styles: ``
})
export class HeaderComponent {

  private greetings: string[] = ["Hello", "Hi", "Welcome", "Greetings", "Good day"];

  // constructor(public us: UserService) {
  // }
  @Input() role!: UserRole;

  getRandomGreeting(): string {
    const randomIndex = Math.floor(Math.random() * this.greetings.length);
    return this.greetings[randomIndex];
  }
}
