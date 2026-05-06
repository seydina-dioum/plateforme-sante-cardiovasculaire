<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DossierPatientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom'                  => $this->faker->lastName(),
            'prenom'               => $this->faker->firstName(),
            'date_naissance'       => $this->faker->dateTimeBetween('-80 years', '-18 years')->format('Y-m-d'),
            'sexe'                 => $this->faker->randomElement(['M', 'F']),
            'telephone'            => $this->faker->phoneNumber(),
            'email'                => $this->faker->unique()->safeEmail(),
            'antecedents_medicaux' => $this->faker->randomElement([
                'Hypertension artérielle',
                'Diabète type 2',
                'Insuffisance cardiaque',
                'Antécédents familiaux cardiovasculaires',
                null,
            ]),
        ];
    }
}