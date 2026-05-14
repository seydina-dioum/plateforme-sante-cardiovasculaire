<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return response()->json(Patient::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom'              => 'required|string|max:100',
            'prenom'           => 'required|string|max:100',
            'date_naissance'   => 'required|date',
            'sexe'             => 'required|in:M,F',
            'telephone'        => 'nullable|string|max:20',
            'email'            => 'nullable|email|unique:patients',
            'antecedents_medicaux' => 'nullable|string',
            'medecin_id'       => 'nullable|exists:medecins,id',
        ]);

        $patient = Patient::create($validated);
        return response()->json($patient, 201);
    }

    public function show($id)
    {
        $patient = Patient::findOrFail($id);
        return response()->json($patient, 200);
    }

    public function update(Request $request, $id)
    {
        $patient = Patient::findOrFail($id);
        
        $validated = $request->validate([
            'nom'              => 'sometimes|required|string|max:100',
            'prenom'           => 'sometimes|required|string|max:100',
            'date_naissance'   => 'sometimes|required|date',
            'sexe'             => 'sometimes|required|in:M,F',
            'telephone'        => 'nullable|string|max:20',
            'email'            => 'nullable|email|unique:patients,email,'.$id,
            'antecedents_medicaux' => 'nullable|string',
            'medecin_id'       => 'nullable|exists:medecins,id',
        ]);

        $patient->update($validated);
        return response()->json($patient, 200);
    }

    public function destroy($id)
    {
        Patient::findOrFail($id)->delete();
        return response()->json(['message' => 'Patient supprimé'], 200);
    }
}
