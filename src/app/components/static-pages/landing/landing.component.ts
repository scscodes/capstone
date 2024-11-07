import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/user.service';
import {Router} from '@angular/router';
import {MaterialModule} from '../../../resources/material.module';
import {UserRole} from '../../../core/User';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MaterialModule],
  template: `
    <div class="landing-container">
      <div class="landing-card hero-image">
        <div class="hero-image-mask"></div>
        <div class="content">
          <h1>M3</h1>
          <h5>MedModMon</h5>
          <div class="icons">
            <mat-icon aria-hidden="true">emergency</mat-icon>
            <mat-icon aria-hidden="true">terminal</mat-icon>
            <mat-icon aria-hidden="true">monitoring</mat-icon>
          </div>
        </div>
      </div>
      <div class="landing-row">
        <button mat-button>Learn More</button>
      </div>
      <div class="landing-row">
        <button mat-flat-button class="role" (click)="changeRole('patient')">Patient</button>
        <button mat-flat-button class="role" (click)="changeRole('staff')">Staff</button>
        <button mat-flat-button class="role" (click)="changeRole('admin')">Admin</button>
      </div>
    </div>
  `,
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  constructor(private us: UserService, private router: Router) {
  }

  changeRole(value: UserRole){
    this.us.changeRole(value);
    this.navigateToRole();
  }

  private navigateToRole(){
    const currentUser = this.us.userSubject.getValue();
    if(!currentUser || !currentUser.role){
      this.router.navigate(['/unauthorized'], {replaceUrl: true});
      return;
    }

    if(currentUser.role === 'patient'){
      this.router.navigate(['/u/profile'], {replaceUrl: true}); return;
    } else if(currentUser.role){
      this.router.navigate(['/staff'], {replaceUrl: true}); return;
    }
    this.router.navigate([''], {replaceUrl: true}); return;
  }

}
