export interface Patient {
  id?: number;
  medecin_id?: number | null;
  nom: string;
  prenom: string;
  date_naissance: string;
  sexe: 'M' | 'F';
  telephone?: string | null;
  email?: string | null;
  antecedents_medicaux?: string | null;
  created_at?: string;
  updated_at?: string;
}
