import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbSidebarModule, NbMenuModule, NbButtonModule, NbIconModule, NbSidebarService, NbUserModule, NbBadgeModule } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';
import { AuthService } from '../../services/auth.service';
import { AlerteService } from '../../services/alerte.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbButtonModule, NbIconModule, NbUserModule, NbBadgeModule],
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <nav class="header-nav">
          <div class="header-left">
            <button nbButton ghost (click)="toggleSidebar()" class="toggle-btn">
              <nb-icon icon="menu-outline"></nb-icon>
            </button>
            <h1 class="logo">
              <span class="logo-icon">❤️</span>
              CardioHealth
            </h1>
          </div>
          <div class="header-right">
            <nb-user
              name="Dr. Doucouré"
              title="Cardiologue"
              size="medium"
              [onlyPicture]="false">
            </nb-user>
            <button nbButton ghost status="basic" (click)="logout()" class="logout-btn">
              <nb-icon icon="log-out-outline"></nb-icon>
            </button>
          </div>
        </nav>
      </nb-layout-header>

      <nb-sidebar tag="menu-sidebar" responsive>
        <div class="sidebar-brand">
          <p class="sidebar-subtitle">Espace Médecin</p>
        </div>
        <nb-menu [items]="menuItems"></nb-menu>
      </nb-sidebar>

      <nb-layout-column class="main-column">
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: [`
    :host {
      display: block;
    }

    nb-layout-header nav.header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0 1rem;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo {
      font-size: 1.3rem;
      font-weight: 700;
      color: #1e3a5f;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }

    .logo-icon {
      font-size: 1.5rem;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .toggle-btn {
      font-size: 1.2rem;
    }

    .sidebar-brand {
      padding: 1rem 1.25rem 0.5rem;
    }

    .sidebar-subtitle {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0;
    }

    .main-column {
      background: #f4f7fc !important;
      padding: 1.5rem !important;
    }

    .logout-btn {
      color: #718096;
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  private sidebarService = inject(NbSidebarService);
  private authService = inject(AuthService);
  private alerteService = inject(AlerteService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  menuItems: NbMenuItem[] = [
    { title: 'Vue d\'ensemble', icon: 'home-outline', link: '/dashboard' },
    { title: 'Patients', icon: 'people-outline', link: '/patients' },
    { title: 'Alertes', icon: 'bell-outline', link: '/alertes' },
  ];

  ngOnInit(): void {
    this.alerteService.getAlertes().subscribe({
      next: (alertes) => {
        const unread = alertes.filter(a => !a.lue).length;
        if (unread > 0) {
          this.menuItems = this.menuItems.map(item => {
            if (item.title === 'Alertes') {
              return { ...item, badge: { text: String(unread), status: 'danger' } };
            }
            return item;
          });
          this.cdr.markForCheck();
        }
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarService.toggle(false, 'menu-sidebar');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
