import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Laravel backend URL
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        this.currentUserSubject.next(JSON.parse(user));
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }

  login(credentials: any): Observable<any> {
    // MOCK LOGIN : Simulation du backend pour pouvoir tester l'interface
    const mockResponse = {
      token: 'fake-jwt-token-12345',
      user: {
        id: 1,
        name: 'Dr. Doucouré',
        email: credentials.email || 'medecin@cardiohealth.com'
      }
    };

    return of(mockResponse).pipe(
      delay(800), // Simulation du temps de chargement
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
