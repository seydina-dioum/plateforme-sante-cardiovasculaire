<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alerte extends Model
{
    protected $fillable = [
        'patient_id',
        'niveau',
        'message',
        'lue',
        'declenchee_a'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}