import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VitalSignService } from '../../services/vital-sign.service';
import { VitalSign, CreateVitalSignDto } from '../../models/vital-sign.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject, interval } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-patient-vital-signs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './patient-vital-signs.html',
  styleUrls: ['./patient-vital-signs.css']
})
export class PatientVitalSignsComponent implements OnInit, OnDestroy {
  patientId!: number;
  vitalSigns: VitalSign[] = [];
  loading = true;
  error = '';
  showForm = false;
  form!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private vitalSignService: VitalSignService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('patientId');
    if (idParam) {
      this.patientId = +idParam;
      this.loadVitalSigns();
      // Mise à jour toutes les 10 secondes
      this.startAutoRefresh();
    } else {
      this.error = 'ID du patient manquant';
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.form = this.fb.group({
      bpm: ['', [Validators.required, Validators.min(30), Validators.max(250)]],
      blood_pressure: ['', [Validators.required, Validators.pattern(/^\d{2,3}\/\d{2,3}$/)]],
      spo2: ['', [Validators.required, Validators.min(70), Validators.max(100)]],
      temperature: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      notes: ['', [Validators.maxLength(500)]]
    });
  }

  loadVitalSigns(): void {
    this.loading = true;
    this.vitalSignService.getPatientVitalSigns(this.patientId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.vitalSigns = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement des données';
          console.error(err);
          this.loading = false;
        }
      });
  }

  private startAutoRefresh(): void {
    interval(10000)
      .pipe(
        switchMap(() => this.vitalSignService.getPatientVitalSigns(this.patientId)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          this.vitalSigns = data;
        },
        error: (err) => console.error('Erreur lors de la mise à jour', err)
      });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const newVitalSign: CreateVitalSignDto = {
      patient_id: this.patientId,
      ...this.form.value,
      measured_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    this.vitalSignService.createVitalSign(newVitalSign)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.form.reset();
          this.showForm = false;
          this.loadVitalSigns();
        },
        error: (err) => {
          this.error = 'Erreur lors de la création';
          console.error(err);
        }
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  deleteVitalSign(id: number): void {
    if (confirm('Confirmer la suppression?')) {
      this.vitalSignService.deleteVitalSign(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.loadVitalSigns(),
          error: (err) => {
            this.error = 'Erreur lors de la suppression';
            console.error(err);
          }
        });
    }
  }

  getStatusColor(bpm: number): string {
    if (bpm < 60 || bpm > 100) return 'warning';
    return 'normal';
  }
}
