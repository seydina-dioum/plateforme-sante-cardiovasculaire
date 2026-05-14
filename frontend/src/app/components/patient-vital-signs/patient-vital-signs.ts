import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VitalSignService } from '../../services/vital-sign.service';
import { VitalSign, CreateVitalSignDto } from '../../models/vital-sign.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, interval } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbAlertModule, NbSpinnerModule, NbTooltipModule } from '@nebular/theme';

@Component({
  selector: 'app-patient-vital-signs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbAlertModule, NbSpinnerModule, NbTooltipModule],
  templateUrl: './patient-vital-signs.html',
  styleUrls: ['./patient-vital-signs.css']
})
export class PatientVitalSignsComponent implements OnInit, OnDestroy {
  private vitalSignService = inject(VitalSignService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  patientId!: number;
  vitalSigns: VitalSign[] = [];
  loading = true;
  error = '';
  showForm = false;
  form!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor() {
    this.form = this.fb.group({
      bpm: ['', [Validators.required, Validators.min(30), Validators.max(250)]],
      blood_pressure: ['', [Validators.required, Validators.pattern(/^\d{2,3}\/\d{2,3}$/)]],
      spo2: ['', [Validators.required, Validators.min(70), Validators.max(100)]],
      temperature: [''],
      notes: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('patientId');
    if (idParam) {
      this.patientId = +idParam;
      this.loadVitalSigns();
      interval(10000).pipe(
        switchMap(() => this.vitalSignService.getPatientVitalSigns(this.patientId)),
        takeUntil(this.destroy$)
      ).subscribe({
        next: (data) => { this.vitalSigns = data; this.cdr.markForCheck(); }
      });
    } else {
      this.error = 'ID du patient manquant';
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadVitalSigns(): void {
    this.loading = true;
    this.vitalSignService.getPatientVitalSigns(this.patientId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => { this.vitalSigns = data; this.loading = false; this.cdr.markForCheck(); },
        error: () => { this.error = 'Erreur lors du chargement'; this.loading = false; this.cdr.markForCheck(); }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const dto: CreateVitalSignDto = {
      patient_id: this.patientId,
      ...this.form.value,
      measured_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    this.vitalSignService.createVitalSign(dto).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => { this.form.reset(); this.showForm = false; this.loadVitalSigns(); },
      error: () => { this.error = 'Erreur lors de la création'; this.cdr.markForCheck(); }
    });
  }

  toggleForm(): void { this.showForm = !this.showForm; this.cdr.markForCheck(); }

  deleteVitalSign(id: number): void {
    if (confirm('Supprimer cette mesure ?')) {
      this.vitalSignService.deleteVitalSign(id).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.loadVitalSigns(),
        error: () => { this.error = 'Erreur lors de la suppression'; this.cdr.markForCheck(); }
      });
    }
  }

  getBpmStatus(bpm: number): string {
    if (bpm < 60 || bpm > 100) return 'danger';
    return 'success';
  }

  getSpo2Status(spo2: number): string {
    if (spo2 < 90) return 'danger';
    if (spo2 < 95) return 'warning';
    return 'success';
  }
}
