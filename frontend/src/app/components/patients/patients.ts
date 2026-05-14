import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { NbCardModule, NbButtonModule, NbIconModule, NbSpinnerModule, NbInputModule, NbSelectModule, NbAlertModule } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NbCardModule, NbButtonModule, NbIconModule, NbSpinnerModule, NbInputModule, NbSelectModule, NbAlertModule],
  templateUrl: './patients.html',
  styleUrls: ['./patients.css']
})
export class Patients implements OnInit {
  private patientService = inject(PatientService);
  private cdr = inject(ChangeDetectorRef);

  private fb = inject(FormBuilder);

  patients: Patient[] = [];
  loading = false;
  showForm = false;
  editingPatientId: number | null = null;
  patientForm: FormGroup;
  error = '';
  success = '';

  constructor() {
    this.patientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      prenom: ['', [Validators.required, Validators.maxLength(100)]],
      date_naissance: ['', Validators.required],
      sexe: ['M', Validators.required],
      telephone: [''],
      email: ['', [Validators.email]],
      antecedents_medicaux: ['']
    });
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading patients', err);
        this.error = 'Erreur lors du chargement des patients.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  toggleForm(patient?: Patient): void {
    this.showForm = !this.showForm;
    this.error = '';
    this.success = '';
    
    if (patient) {
      this.editingPatientId = patient.id || null;
      this.patientForm.patchValue({
        nom: patient.nom,
        prenom: patient.prenom,
        date_naissance: patient.date_naissance,
        sexe: patient.sexe,
        telephone: patient.telephone,
        email: patient.email,
        antecedents_medicaux: patient.antecedents_medicaux
      });
    } else {
      this.editingPatientId = null;
      this.patientForm.reset({ sexe: 'M' });
    }
    this.cdr.markForCheck();
  }

  onSubmit(): void {
    if (this.patientForm.invalid) return;

    const patientData = this.patientForm.value;
    this.loading = true;

    if (this.editingPatientId) {
      this.patientService.updatePatient(this.editingPatientId, patientData).subscribe({
        next: () => {
          this.success = 'Patient mis à jour avec succès !';
          this.showForm = false;
          this.loadPatients();
        },
        error: () => {
          this.error = 'Erreur lors de la mise à jour du patient.';
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
    } else {
      this.patientService.createPatient(patientData).subscribe({
        next: () => {
          this.success = 'Patient ajouté avec succès !';
          this.showForm = false;
          this.loadPatients();
        },
        error: () => {
          this.error = 'Erreur lors de l\'ajout du patient.';
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
    }
  }

  deletePatient(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
      this.loading = true;
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          this.success = 'Patient supprimé avec succès !';
          this.loadPatients();
        },
        error: () => {
          this.error = 'Erreur lors de la suppression du patient.';
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
    }
  }
}
