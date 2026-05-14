export interface Alerte {
  id?: number;
  patient_id: number;
  niveau: 'info' | 'warning' | 'critique';
  message: string;
  lue: boolean;
  declenchee_a: string;
  created_at?: string;
  updated_at?: string;
  patient?: {
    id: number;
    nom: string;
    prenom: string;
  };
}
