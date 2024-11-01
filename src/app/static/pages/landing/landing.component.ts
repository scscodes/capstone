import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '../../../shared/material.module'
import {User, UserProperties} from '../../../core/User';
import {UserService} from '../../../core/user.service';
import {Router} from '@angular/router';

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
        <button mat-flat-button class="role" (click)="assumePatientRole()">Patient</button>
        <button mat-flat-button class="role" (click)="assumeStaffRole()">Staff</button>
        <button mat-flat-button class="role" (click)="assumeAnonymousRole()">Anon</button>
      </div>
    </div>
  `,
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  constructor(private us: UserService, private router: Router) {
  }
  assumePatientRole() {
    this.registerUser({
      firstName: 'Sam',
      lastName: 'Badleg',
      email: 'whoops@mybad.com',
      role: 'patient',
    });
  }

  assumeStaffRole(){
    this.registerUser({
      firstName: 'Sam',
      lastName: 'Staffer',
      email: 'sam.staffer@medic.com',
      role: 'staff'
    });
  }

  assumeAnonymousRole() {
    this.registerUser({
      firstName: 'Sammy',
      lastName: 'Notsosa',
      email: 'someonenotsammy@football.com',
      role: null
    });
  }

  private registerUser(values: UserProperties){
    this.us.registerUser$(values).subscribe(user => {
      console.log('registered, response' ,user)
      if(!user){
        this.router.navigate(['/unauthorized'], {replaceUrl: true});
        return;
      }

      if(user.role === 'patient'){
        console.log('patient user');
        this.router.navigate(['/u/profile'], {replaceUrl: true}); return;
      } else if(user.role){
        console.log('staff')
        this.router.navigate(['/staff'], {replaceUrl: true}); return;
      }
      console.log('end')
      this.router.navigate([''], {replaceUrl: true}); return;
    });
  }
}
