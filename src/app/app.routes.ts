import { Routes } from '@angular/router';
import {HomeComponent} from './static/home/home.component';
import {UnauthorizedComponent} from './static/unauthorized/unauthorized.component';
import {NotfoundComponent} from './static/notfound/notfound.component';
import {DashboardComponent} from './shared/dashboard/dashboard.component';
import {PatientComponent} from './patient/patient.component';
import {ProfileComponent} from './patient/profile/profile.component';
import {StaffComponent} from './staff/staff.component';
import {genericAuthGuard, patientAuthGuard, staffAuthGuard} from './core/role-based.guard';


/*
  <scope>Routes
  Enable base-level functionality, while providing clear and explicit Guard use.

  Public: anonymous access, static/fixed, informational in nature
  Private: basic auth, functionally generic purpose, but (user) data-driven content
  Patient|Staff: restricted, first-pass to compartmentalize and secure sensitive data, PII etc...
*/

const publicRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' },
];

const privateRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [genericAuthGuard] }
]

const patientRoutes: Routes = [
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [patientAuthGuard],
    canActivateChild: [patientAuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'data', redirectTo: 'profile' },
    ]
  }
];

const staffRoutes: Routes = [
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [staffAuthGuard],
    canActivateChild: [staffAuthGuard],
    children: [ ]
  }
];

export const routes: Routes = [
  ...privateRoutes,
  ...publicRoutes,
  ...patientRoutes,
  ...staffRoutes
];
