<?php

namespace Database\Seeders;

use App\Models\Alerte;
use Illuminate\Database\Seeder;

class AlerteSeeder extends Seeder
{
    /**
     * Seed the application's database with sample alertes.
     */
    public function run(): void
    {
        $alertes = [
            [
                'patient_id' => 1,
                'niveau' => 'critique',
                'message' => 'Pression artérielle très élevée : 180/110 mmHg',
                'lue' => false,
                'declenchee_a' => now()->subHours(2),
            ],
            [
                'patient_id' => 3,
                'niveau' => 'critique',
                'message' => 'Fréquence cardiaque anormale : 145 bpm au repos',
                'lue' => false,
                'declenchee_a' => now()->subHours(5),
            ],
            [
                'patient_id' => 5,
                'niveau' => 'critique',
                'message' => 'SpO2 dangereusement basse : 88%',
                'lue' => false,
                'declenchee_a' => now()->subHour(),
            ],
            [
                'patient_id' => 2,
                'niveau' => 'warning',
                'message' => 'Pression artérielle légèrement élevée : 145/92 mmHg',
                'lue' => false,
                'declenchee_a' => now()->subHours(8),
            ],
            [
                'patient_id' => 4,
                'niveau' => 'warning',
                'message' => 'Température corporelle élevée : 38.5°C',
                'lue' => true,
                'declenchee_a' => now()->subDay(),
            ],
            [
                'patient_id' => 1,
                'niveau' => 'info',
                'message' => 'Constantes vitales normalisées après traitement',
                'lue' => true,
                'declenchee_a' => now()->subDays(2),
            ],
        ];

        foreach ($alertes as $alerte) {
            Alerte::create($alerte);
        }
    }
}
