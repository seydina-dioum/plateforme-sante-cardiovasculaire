<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'medecin_id',
        'nom',
        'prenom',
        'date_naissance',
        'sexe',
        'telephone',
        'email'
    ];

    public function medecin()
    {
        return $this->belongsTo(Medecin::class);
    }

    public function constantes()
    {
        return $this->hasMany(ConstanteVitale::class);
    }

    public function alertes()
    {
        return $this->hasMany(Alerte::class);
    }
}