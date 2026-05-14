import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { AlerteService } from '../../services/alerte.service';
import { NbCardModule, NbIconModule, NbBadgeModule } from '@nebular/theme';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule, NbIconModule, NbBadgeModule, HighchartsChartComponent],
  template: `
    <div class="page-header">
      <h1>Tableau de bord</h1>
      <p class="subtitle">Suivi cardiovasculaire en temps réel</p>
    </div>

    <!-- Stat cards -->
    <section class="stats-row">
      <nb-card class="stat-card">
        <nb-card-body>
          <div class="stat-icon patients-icon">
            <nb-icon icon="people-outline"></nb-icon>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ patientCount }}</span>
            <span class="stat-label">Patients suivis</span>
          </div>
        </nb-card-body>
      </nb-card>

      <nb-card class="stat-card">
        <nb-card-body>
          <div class="stat-icon danger-icon">
            <nb-icon icon="alert-triangle-outline"></nb-icon>
          </div>
          <div class="stat-info">
            <span class="stat-value danger">{{ alerteCritiqueCount }}</span>
            <span class="stat-label">Alertes critiques</span>
          </div>
        </nb-card-body>
      </nb-card>

      <nb-card class="stat-card">
        <nb-card-body>
          <div class="stat-icon warning-icon">
            <nb-icon icon="bell-outline"></nb-icon>
          </div>
          <div class="stat-info">
            <span class="stat-value warning">{{ alerteUnreadCount }}</span>
            <span class="stat-label">Alertes non lues</span>
          </div>
        </nb-card-body>
      </nb-card>

      <nb-card class="stat-card">
        <nb-card-body>
          <div class="stat-icon success-icon">
            <nb-icon icon="checkmark-circle-outline"></nb-icon>
          </div>
          <div class="stat-info">
            <span class="stat-value success">{{ alerteReadCount }}</span>
            <span class="stat-label">Alertes traitées</span>
          </div>
        </nb-card-body>
      </nb-card>
    </section>

    <!-- Charts -->
    <section class="charts-row">
      <nb-card>
        <nb-card-header>Répartition des Niveaux de Risque</nb-card-header>
        <nb-card-body>
          <highcharts-chart
            [options]="pieOptions"
            style="width: 100%; display: block;">
          </highcharts-chart>
        </nb-card-body>
      </nb-card>

      <nb-card>
        <nb-card-header>Évolution de la Pression Artérielle</nb-card-header>
        <nb-card-body>
          <highcharts-chart
            [options]="lineOptions"
            style="width: 100%; display: block;">
          </highcharts-chart>
        </nb-card-body>
      </nb-card>
    </section>
  `,
  styles: [`
    .page-header {
      margin-bottom: 1.5rem;
    }
    .page-header h1 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1e3a5f;
      margin: 0;
    }
    .subtitle {
      color: #718096;
      font-size: 0.9rem;
      margin: 0.2rem 0 0;
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .stat-card {
      border-radius: 12px !important;
      border: none !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06) !important;
    }

    .stat-card nb-card-body {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem !important;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
    }

    .patients-icon { background: #e8f0fe; color: #4a90d9; }
    .danger-icon { background: #fdecea; color: #e74c3c; }
    .warning-icon { background: #fff3e0; color: #f5a623; }
    .success-icon { background: #e6f9f0; color: #36b37e; }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1e3a5f;
      line-height: 1;
    }
    .stat-value.danger { color: #e74c3c; }
    .stat-value.warning { color: #f5a623; }
    .stat-value.success { color: #36b37e; }

    .stat-label {
      font-size: 0.85rem;
      color: #718096;
      margin-top: 0.25rem;
    }

    .charts-row {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1rem;
    }

    .charts-row nb-card {
      border-radius: 12px !important;
      border: none !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06) !important;
    }

    nb-card-header {
      font-weight: 600 !important;
      color: #1e3a5f !important;
      font-size: 0.95rem !important;
    }
  `]
})
export class DashboardComponent implements OnInit {
  private patientService = inject(PatientService);
  private alerteService = inject(AlerteService);
  private cdr = inject(ChangeDetectorRef);

  patientCount = 0;
  alerteCritiqueCount = 0;
  alerteUnreadCount = 0;
  alerteReadCount = 0;

  pieOptions: Highcharts.Options = {
    chart: { type: 'pie', backgroundColor: 'transparent', height: 280 },
    title: { text: '' },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: '55%',
        borderWidth: 0,
        dataLabels: { enabled: true, format: '{point.name}: {point.y}', style: { fontSize: '12px', color: '#718096' } }
      }
    },
    series: [{
      type: 'pie',
      name: 'Patients',
      data: [
        { name: 'Faible', y: 80, color: '#36b37e' },
        { name: 'Modéré', y: 32, color: '#f5a623' },
        { name: 'Élevé', y: 12, color: '#e74c3c' }
      ]
    }]
  };

  lineOptions: Highcharts.Options = {
    chart: { type: 'areaspline', backgroundColor: 'transparent', height: 280 },
    title: { text: '' },
    credits: { enabled: false },
    xAxis: {
      categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
      lineColor: '#e2e8f0',
      labels: { style: { color: '#718096' } }
    },
    yAxis: {
      title: { text: 'mmHg', style: { color: '#718096' } },
      gridLineColor: '#f0f0f0',
      labels: { style: { color: '#718096' } }
    },
    plotOptions: {
      areaspline: { fillOpacity: 0.15 }
    },
    series: [{
      type: 'areaspline',
      name: 'Pression Systolique',
      data: [120, 122, 121, 125, 124, 128, 130],
      color: '#4a90d9',
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [[0, 'rgba(74, 144, 217, 0.3)'], [1, 'rgba(74, 144, 217, 0.02)']]
      },
      marker: { radius: 4, fillColor: '#4a90d9' }
    }]
  };

  ngOnInit(): void {
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.patientCount = patients.length;
        this.cdr.markForCheck();
      }
    });

    this.alerteService.getAlertes().subscribe({
      next: (alertes) => {
        this.alerteUnreadCount = alertes.filter(a => !a.lue).length;
        this.alerteCritiqueCount = alertes.filter(a => a.niveau === 'critique').length;
        this.alerteReadCount = alertes.filter(a => a.lue).length;
        this.cdr.markForCheck();
      }
    });
  }
}
