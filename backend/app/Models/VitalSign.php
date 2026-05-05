<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class VitalSign extends Model
{
    protected $fillable = [
        'patient_id',
        'bpm',
        'blood_pressure',
        'spo2',
        'temperature',
        'notes',
        'measured_at',
    ];
    protected $casts = [
        'measured_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'temperature' => 'decimal:2',
    ];
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }
}
