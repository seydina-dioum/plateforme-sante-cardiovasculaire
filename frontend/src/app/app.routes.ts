import { Routes } from '@angular/router';
import { PatientVitalSignsComponent } from './components/patient-vital-signs/patient-vital-signs';

export const routes: Routes = [
  {
    path: 'patients/:patientId/vital-signs',
    component: PatientVitalSignsComponent
  }
];

