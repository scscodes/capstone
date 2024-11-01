import { Routes } from '@angular/router';
import {PatientComponent} from './patient/patient.component';
import {ProfileComponent} from './patient/profile/profile.component';
import {StaffComponent} from './staff/staff.component';
import {UnauthorizedComponent} from './static/pages/unauthorized.component';
import {NotfoundComponent} from './static/pages/notfound.component';
import {LandingComponent} from './static/pages/landing/landing.component';
import {HomeComponent} from './static/pages/home.component';
import {PatientRoleGuard, RoleGuard, StaffRoleGuard} from './core/role-based.guard';



export const routes: Routes = [
  { path: 'welcome', component: LandingComponent },
  { path: 'home', redirectTo: '', pathMatch: "full" },
  { path: '', component: HomeComponent, canActivate: [RoleGuard],
    children: [
      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [StaffRoleGuard],
        canActivateChild: [StaffRoleGuard],
        children: [ ]
      },
      {
        path: 'u',
        component: PatientComponent,
        canActivate: [PatientRoleGuard],
        canActivateChild: [PatientRoleGuard],
        children: [
          { path: 'profile', component: ProfileComponent }
        ]
      },
    ]
  },
  { path: 'notfound', component: NotfoundComponent, canActivate: [RoleGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent, canActivate: [RoleGuard] },
  { path: '**', redirectTo: 'notfound' },
];
