<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\VitalSignController;
use Illuminate\Support\Facades\Route;

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées (token obligatoire)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Routes pour les constantes vitales
Route::apiResource('vital-signs', VitalSignController::class);

// Routes spéciales pour patient
Route::get('patients/{patient}/vital-signs', [VitalSignController::class, 'patientVitalSigns']);
Route::get('patients/{patient}/vital-signs/latest/{limit}', [VitalSignController::class, 'patientLatestVitalSigns']);