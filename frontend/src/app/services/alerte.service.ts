import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alerte } from '../models/alerte.model';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/alertes';

  getAlertes(): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(this.apiUrl);
  }

  getAlerte(id: number): Observable<Alerte> {
    return this.http.get<Alerte>(`${this.apiUrl}/${id}`);
  }

  markAsRead(id: number): Observable<Alerte> {
    return this.http.put<Alerte>(`${this.apiUrl}/${id}`, { lue: true });
  }

  deleteAlerte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
