import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbInputModule, NbButtonModule, NbAlertModule, NbSpinnerModule, NbIconModule } from '@nebular/theme';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NbCardModule, NbInputModule, NbButtonModule, NbAlertModule, NbSpinnerModule, NbIconModule],
  template: `
    <section class="login-page">
      <div class="login-wrapper">
        <div class="login-brand">
          <span class="brand-icon">❤️</span>
          <h1>CardioHealth</h1>
          <p>Plateforme de Suivi Cardiovasculaire</p>
        </div>

        <nb-card class="login-card">
          <nb-card-header>
            <h2>Connexion Médecin</h2>
          </nb-card-header>
          <nb-card-body>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="email" class="label">Adresse email</label>
                <input nbInput fullWidth id="email" type="email" formControlName="email"
                       placeholder="medecin@cardiohealth.com"
                       [status]="loginForm.get('email')?.touched && loginForm.get('email')?.invalid ? 'danger' : 'basic'">
              </div>

              <div class="form-group">
                <label for="password" class="label">Mot de passe</label>
                <input nbInput fullWidth id="password" type="password" formControlName="password"
                       placeholder="••••••••"
                       [status]="loginForm.get('password')?.touched && loginForm.get('password')?.invalid ? 'danger' : 'basic'">
              </div>

              <nb-alert *ngIf="errorMessage" status="danger" closable (close)="errorMessage = ''">
                {{ errorMessage }}
              </nb-alert>

              <button nbButton fullWidth status="primary" size="large" type="submit"
                      [disabled]="loginForm.invalid || isLoading"
                      [nbSpinner]="isLoading" nbSpinnerStatus="control">
                Se connecter
              </button>
            </form>
          </nb-card-body>
        </nb-card>
      </div>
    </section>
  `,
  styles: [`
    .login-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #e8f0fe 0%, #f4f7fc 50%, #dce6f5 100%);
    }

    .login-wrapper {
      width: 100%;
      max-width: 420px;
      padding: 2rem;
    }

    .login-brand {
      text-align: center;
      margin-bottom: 2rem;
    }

    .brand-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    .login-brand h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #1e3a5f;
      margin: 0;
    }

    .login-brand p {
      color: #718096;
      font-size: 0.95rem;
      margin-top: 0.25rem;
    }

    .login-card {
      border-radius: 16px !important;
      box-shadow: 0 8px 30px rgba(30, 58, 95, 0.1) !important;
      border: none !important;
    }

    nb-card-header h2 {
      text-align: center;
      font-size: 1.15rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .label {
      display: block;
      margin-bottom: 0.4rem;
      font-weight: 500;
      color: #4a5568;
      font-size: 0.9rem;
    }

    nb-alert {
      margin-bottom: 1rem;
    }

    button[nbButton] {
      margin-top: 0.5rem;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
          this.cdr.markForCheck();
        }
      });
    }
  }
}
