import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VitalSign, CreateVitalSignDto } from '../models/vital-sign.model';
@Injectable({
  providedIn: 'root'
})
export class VitalSignService {
  private apiUrl = 'http://localhost:8000/api/vital-signs';
  private patientApiUrl = 'http://localhost:8000/api/patients';
  constructor(private http: HttpClient) {}
  /**
   * Récupérer toutes les constantes vitales
   */
  getAllVitalSigns(page: number = 1, limit: number = 20): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }
  /**
   * Récupérer une constante vitale spécifique
   */
  getVitalSign(id: number): Observable<VitalSign> {
    return this.http.get<VitalSign>(`${this.apiUrl}/${id}`);
  }
  /**
   * Récupérer les constantes vitales d'un patient
   */
  getPatientVitalSigns(patientId: number): Observable<VitalSign[]> {
    return this.http.get<VitalSign[]>(`${this.patientApiUrl}/${patientId}/vital-signs`);
  }
  /**
   * Récupérer les dernières N constantes vitales d'un patient
   */
  getPatientLatestVitalSigns(patientId: number, limit: number = 10): Observable<VitalSign[]> {
    return this.http.get<VitalSign[]>(
      `${this.patientApiUrl}/${patientId}/vital-signs/latest/${limit}`
    );
  }
  /**
   * Créer une nouvelle constante vitale
   */
  createVitalSign(vitalSign: CreateVitalSignDto): Observable<VitalSign> {
    return this.http.post<VitalSign>(this.apiUrl, vitalSign);
  }
  /**
   * Mettre à jour une constante vitale
   */
  updateVitalSign(id: number, vitalSign: Partial<CreateVitalSignDto>): Observable<VitalSign> {
    return this.http.put<VitalSign>(`${this.apiUrl}/${id}`, vitalSign);
  }
  /**
   * Supprimer une constante vitale
   */
  deleteVitalSign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
