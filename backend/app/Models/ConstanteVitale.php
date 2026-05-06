<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstanteVitale extends Model
{
    protected $fillable = [
        'patient_id',
        'frequence_cardiaque',
        'tension_systolique',
        'tension_diastolique',
        'saturation_oxygene',
        'mesure_a'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}