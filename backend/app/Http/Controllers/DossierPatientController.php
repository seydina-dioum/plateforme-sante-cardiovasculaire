<?php

namespace App\Http\Controllers;

use App\Models\DossierPatient;
use Illuminate\Http\Request;

class DossierPatientController extends Controller
{
    public function index()
    {
        return response()->json(DossierPatient::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom'              => 'required|string|max:100',
            'prenom'           => 'required|string|max:100',
            'date_naissance'   => 'required|date',
            'sexe'             => 'required|in:M,F',
            'telephone'        => 'nullable|string|max:20',
            'email'            => 'nullable|email|unique:dossier_patients',
            'antecedents_medicaux' => 'nullable|string',
        ]);

        $dossier = DossierPatient::create($validated);
        return response()->json($dossier, 201);
    }

    public function show($id)
    {
        $dossier = DossierPatient::findOrFail($id);
        return response()->json($dossier, 200);
    }

    public function update(Request $request, $id)
    {
        $dossier = DossierPatient::findOrFail($id);
        $dossier->update($request->all());
        return response()->json($dossier, 200);
    }

    public function destroy($id)
    {
        DossierPatient::findOrFail($id)->delete();
        return response()->json(['message' => 'Dossier supprimé'], 200);
    }
}