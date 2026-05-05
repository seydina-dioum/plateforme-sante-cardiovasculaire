export interface VitalSign {
  id: number;
  patient_id: number;
  bpm: number;
  blood_pressure: string;
  spo2: number;
  temperature?: number;
  notes?: string;
  measured_at: string;
  created_at: string;
  updated_at: string;
}
export interface CreateVitalSignDto {
  patient_id: number;
  bpm: number;
  blood_pressure: string;
  spo2: number;
  temperature?: number;
  notes?: string;
  measured_at: string;
}
