<?php
namespace Database\Seeders;
use App\Models\VitalSign;
use App\Models\Patient;
use App\Models\Medecin;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
class VitalSignSeeder extends Seeder
{
    public function run(): void
    {
        // Créer un médecin et un patient si aucun n'existe
        if (Patient::count() === 0) {
            $medecin = Medecin::create([
                'nom' => 'Dupont',
                'prenom' => 'Jean',
                'email' => 'jean.dupont@example.com',
                'password' => bcrypt('password'),
                'specialite' => 'Cardiologue',
                'telephone' => '0123456789'
            ]);
            Patient::create([
                'medecin_id' => $medecin->id,
                'nom' => 'Doe',
                'prenom' => 'John',
                'date_naissance' => '1980-01-01',
                'sexe' => 'M',
                'telephone' => '0987654321',
                'email' => 'john.doe@example.com'
            ]);
        }
        $patients = Patient::all();
        foreach ($patients as $patient) {
            // Créer 10 mesures pour chaque patient
            for ($i = 0; $i < 10; $i++) {
                VitalSign::create([
                    'patient_id' => $patient->id,
                    'bpm' => rand(60, 100),
                    'blood_pressure' => rand(110, 140) . '/' . rand(70, 90),
                    'spo2' => rand(95, 100),
                    'temperature' => number_format(rand(366, 375) / 10, 2),
                    'notes' => 'Mesure de routine',
                    'measured_at' => Carbon::now()->subDays(10 - $i),
                ]);
            }
        }
    }
}
