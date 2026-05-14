import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { PatientVitalSignsComponent } from './components/patient-vital-signs/patient-vital-signs';
import { Patients } from './components/patients/patients';
import { AlertesComponent } from './components/alertes/alertes.component';
import { MainLayoutComponent } from './components/layout/main-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: Patients },
      { path: 'patients/:patientId/vital-signs', component: PatientVitalSignsComponent },
      { path: 'alertes', component: AlertesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
