import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlerteService } from '../../services/alerte.service';
import { Alerte } from '../../models/alerte.model';
import { NbCardModule, NbButtonModule, NbIconModule, NbBadgeModule, NbAlertModule, NbSpinnerModule } from '@nebular/theme';

@Component({
  selector: 'app-alertes',
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule, NbButtonModule, NbIconModule, NbBadgeModule, NbAlertModule, NbSpinnerModule],
  templateUrl: './alertes.html',
  styleUrls: ['./alertes.css']
})
export class AlertesComponent implements OnInit {
  private alerteService = inject(AlerteService);
  private cdr = inject(ChangeDetectorRef);

  alertes: Alerte[] = [];
  loading = false;

  get alertesCritiques(): Alerte[] { return this.alertes.filter(a => a.niveau === 'critique'); }
  get alertesWarning(): Alerte[] { return this.alertes.filter(a => a.niveau === 'warning'); }
  get alertesInfo(): Alerte[] { return this.alertes.filter(a => a.niveau === 'info'); }
  get unreadCount(): number { return this.alertes.filter(a => !a.lue).length; }

  ngOnInit(): void {
    this.loadAlertes();
  }

  loadAlertes(): void {
    this.loading = true;
    this.alerteService.getAlertes().subscribe({
      next: (data) => {
        this.alertes = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading alertes', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  markAsRead(alerte: Alerte): void {
    if (alerte.id && !alerte.lue) {
      this.alerteService.markAsRead(alerte.id).subscribe({
        next: () => {
          alerte.lue = true;
          this.cdr.markForCheck();
        }
      });
    }
  }

  deleteAlerte(id: number): void {
    if (confirm('Supprimer cette alerte ?')) {
      this.alerteService.deleteAlerte(id).subscribe({
        next: () => {
          this.alertes = this.alertes.filter(a => a.id !== id);
          this.cdr.markForCheck();
        }
      });
    }
  }

  getNiveauLabel(niveau: string): string {
    return { critique: 'Critique', warning: 'Attention', info: 'Info' }[niveau] || niveau;
  }

  getNiveauStatus(niveau: string): string {
    return { critique: 'danger', warning: 'warning', info: 'info' }[niveau] || 'basic';
  }
}
