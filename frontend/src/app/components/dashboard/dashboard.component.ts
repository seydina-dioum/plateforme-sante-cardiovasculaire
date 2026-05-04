import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="dashboard">
      <nav class="sidebar">
        <div class="sidebar-header">
          <h2>CardioHealth</h2>
          <p>Espace Médecin</p>
        </div>
        <ul class="nav-links">
          <li class="active"><a href="#">Vue d'ensemble</a></li>
          <li><a href="#">Patients</a></li>
          <li><a href="#">Alertes <span class="badge">3</span></a></li>
        </ul>
        <div class="sidebar-footer">
          <button (click)="logout()" class="btn-logout">Déconnexion</button>
        </div>
      </nav>
      
      <main class="main-content">
        <header class="topbar">
          <h1>Tableau de bord : Suivi Cardiovasculaire</h1>
          <div class="user-info">
            Dr. Doucouré
          </div>
        </header>

        <section class="stats-grid">
          <div class="stat-card">
            <h3>Patients suivis</h3>
            <div class="value">124</div>
          </div>
          <div class="stat-card">
            <h3>Alertes critiques</h3>
            <div class="value text-danger">3</div>
          </div>
          <div class="stat-card">
            <h3>Risque élevé</h3>
            <div class="value text-warning">12</div>
          </div>
        </section>

        <section class="charts-section">
          <div class="chart-container">
            <h3>Répartition des Niveaux de Risque</h3>
            <div style="display: block;">
              <canvas baseChart
                [data]="pieChartData"
                [options]="pieChartOptions"
                [type]="'pie'">
              </canvas>
            </div>
          </div>
          
          <div class="chart-container">
            <h3>Évolution Moyenne de la Pression Artérielle</h3>
            <div style="display: block;">
              <canvas baseChart
                [data]="lineChartData"
                [options]="lineChartOptions"
                [type]="'line'">
              </canvas>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      height: 100vh;
      background-color: #f8f9fa;
      font-family: 'Inter', sans-serif;
    }
    .sidebar {
      width: 250px;
      background-color: #2c3e50;
      color: white;
      display: flex;
      flex-direction: column;
    }
    .sidebar-header {
      padding: 2rem 1.5rem;
      border-bottom: 1px solid #34495e;
    }
    .sidebar-header h2 { margin: 0; font-size: 1.5rem; }
    .sidebar-header p { margin: 0; color: #adb5bd; font-size: 0.9rem; }
    
    .nav-links {
      list-style: none;
      padding: 0;
      margin: 2rem 0;
      flex-grow: 1;
    }
    .nav-links li { padding: 0.8rem 1.5rem; }
    .nav-links li.active { background-color: #34495e; border-left: 4px solid #3498db; }
    .nav-links a { color: white; text-decoration: none; display: flex; justify-content: space-between; }
    .badge { background: #e74c3c; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; }
    
    .sidebar-footer { padding: 1.5rem; }
    .btn-logout { width: 100%; padding: 0.8rem; background: #c0392b; color: white; border: none; border-radius: 4px; cursor: pointer; }
    
    .main-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .topbar {
      background: white;
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .topbar h1 { margin: 0; font-size: 1.5rem; color: #2c3e50; }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      padding: 2rem;
    }
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .stat-card h3 { margin: 0 0 1rem 0; color: #7f8c8d; font-size: 1rem; }
    .stat-card .value { font-size: 2.5rem; font-weight: bold; color: #2c3e50; }
    .text-danger { color: #e74c3c !important; }
    .text-warning { color: #f39c12 !important; }

    .charts-section {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1.5rem;
      padding: 0 2rem 2rem 2rem;
    }
    .chart-container {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .chart-container h3 { margin-top: 0; color: #2c3e50; }
  `]
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Données pour le Pie Chart
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [ 'Faible', 'Modéré', 'Élevé' ],
    datasets: [ {
      data: [ 80, 32, 12 ],
      backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c']
    } ]
  };

  // Données pour le Line Chart
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [ 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil' ],
    datasets: [
      {
        data: [ 120, 122, 121, 125, 124, 128, 130 ],
        label: 'Pression Systolique Moyenne (mmHg)',
        fill: true,
        tension: 0.5,
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231,76,60,0.3)'
      }
    ]
  };

  ngOnInit(): void {
    // Initialisation
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
