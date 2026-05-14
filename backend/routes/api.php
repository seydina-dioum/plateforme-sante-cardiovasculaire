<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\VitalSignController;
use App\Http\Controllers\AlerteController;

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées (token obligatoire)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // CRUD patients
    Route::apiResource('patients', PatientController::class);

    // Constantes vitales
    Route::apiResource('vital-signs', VitalSignController::class);
    Route::get('patients/{patient}/vital-signs', [VitalSignController::class, 'patientVitalSigns']);
    Route::get('patients/{patient}/vital-signs/latest/{limit}', [VitalSignController::class, 'patientLatestVitalSigns']);

    // Alertes
    Route::apiResource('alertes', AlerteController::class);
});