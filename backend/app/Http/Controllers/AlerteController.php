<?php

namespace App\Http\Controllers;

use App\Models\Alerte;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AlerteController extends Controller
{
    /**
     * Liste toutes les alertes
     */
    public function index(): JsonResponse
    {
        $alertes = Alerte::with('patient')
            ->orderBy('declenchee_a', 'desc')
            ->get();
        return response()->json($alertes);
    }

    /**
     * Créer une nouvelle alerte
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'patient_id'   => 'required|exists:patients,id',
            'niveau'       => 'required|in:info,warning,critique',
            'message'      => 'required|string|max:255',
            'lue'          => 'boolean',
        ]);

        $alerte = Alerte::create($validated);
        return response()->json($alerte, 201);
    }

    /**
     * Afficher une alerte spécifique
     */
    public function show(Alerte $alerte): JsonResponse
    {
        $alerte->load('patient');
        return response()->json($alerte);
    }

    /**
     * Marquer une alerte comme lue
     */
    public function update(Request $request, Alerte $alerte): JsonResponse
    {
        $validated = $request->validate([
            'lue' => 'sometimes|boolean',
            'niveau' => 'sometimes|in:info,warning,critique',
            'message' => 'sometimes|string|max:255',
        ]);

        $alerte->update($validated);
        return response()->json($alerte);
    }

    /**
     * Supprimer une alerte
     */
    public function destroy(Alerte $alerte): JsonResponse
    {
        $alerte->delete();
        return response()->json(null, 204);
    }
}
