<?php

namespace Database\Seeders;

use App\Models\DossierPatient;
use Illuminate\Database\Seeder;

class DossierPatientSeeder extends Seeder
{
    public function run(): void
    {
        DossierPatient::factory(20)->create();
    }
}