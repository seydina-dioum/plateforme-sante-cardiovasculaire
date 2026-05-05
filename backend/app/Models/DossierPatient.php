<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DossierPatient extends Model
{
    //
    protected $fillable = [
    'nom',
    'prenom', 
    'date_naissance',
    'sexe',
    'telephone',
    'email',
    'antecedents_medicaux',
];
}
