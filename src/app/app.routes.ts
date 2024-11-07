import { Routes } from '@angular/router';
import {PatientComponent} from './patient/patient.component';
import {ProfileComponent} from './patient/profile/profile.component';
import {StaffComponent} from './staff/staff.component';
import {PatientRoleGuard, RoleGuard, StaffRoleGuard} from './core/role-based.guard';
import {LandingComponent} from './components/static-pages/landing/landing.component';
import {HomeComponent} from './components/static-pages/home.component';
import {NotfoundComponent} from './components/static-pages/notfound.component';
import {UnauthorizedComponent} from './components/static-pages/unauthorized.component';



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
