<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Seed the application's database with sample patients.
     */
    public function run(): void
    {
        $patients = [
            [
                'nom' => 'Diallo',
                'prenom' => 'Mamadou',
                'date_naissance' => '1965-03-15',
                'sexe' => 'M',
                'telephone' => '77 123 45 67',
                'email' => 'mamadou.diallo@email.com',
                'antecedents_medicaux' => 'Hypertension artérielle, diabète type 2',
            ],
            [
                'nom' => 'Ndiaye',
                'prenom' => 'Fatou',
                'date_naissance' => '1978-07-22',
                'sexe' => 'F',
                'telephone' => '76 234 56 78',
                'email' => 'fatou.ndiaye@email.com',
                'antecedents_medicaux' => 'Antécédent familial de cardiopathie',
            ],
            [
                'nom' => 'Sow',
                'prenom' => 'Ibrahima',
                'date_naissance' => '1952-11-08',
                'sexe' => 'M',
                'telephone' => '78 345 67 89',
                'email' => 'ibrahima.sow@email.com',
                'antecedents_medicaux' => 'Infarctus du myocarde (2020), stent coronarien',
            ],
            [
                'nom' => 'Ba',
                'prenom' => 'Aissatou',
                'date_naissance' => '1985-01-30',
                'sexe' => 'F',
                'telephone' => '70 456 78 90',
                'email' => 'aissatou.ba@email.com',
                'antecedents_medicaux' => 'Obésité, apnée du sommeil',
            ],
            [
                'nom' => 'Fall',
                'prenom' => 'Ousmane',
                'date_naissance' => '1970-06-12',
                'sexe' => 'M',
                'telephone' => '77 567 89 01',
                'email' => 'ousmane.fall@email.com',
                'antecedents_medicaux' => 'Insuffisance cardiaque chronique, fibrillation auriculaire',
            ],
        ];

        foreach ($patients as $patient) {
            Patient::create($patient);
        }
    }
}
