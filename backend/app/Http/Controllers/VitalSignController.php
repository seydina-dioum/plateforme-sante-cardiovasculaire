<?php
namespace App\Http\Controllers;
use App\Models\VitalSign;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
class VitalSignController extends Controller
{
    /**
     * Liste toutes les constantes vitales
     */
    public function index(): JsonResponse
    {
        $vitalSigns = VitalSign::with('patient')
            ->orderBy('measured_at', 'desc')
            ->paginate(20);
        return response()->json($vitalSigns);
    }
    /**
     * Créer une nouvelle constante vitale
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'bpm' => 'required|integer|min:30|max:250',
            'blood_pressure' => 'required|string|regex:/^\d{2,3}\/\d{2,3}$/',
            'spo2' => 'required|integer|min:70|max:100',
            'temperature' => 'nullable|numeric|min:34|max:43',
            'notes' => 'nullable|string|max:500',
            'measured_at' => 'required|date_format:Y-m-d H:i:s',
        ]);
        $vitalSign = VitalSign::create($validated);
        return response()->json($vitalSign, 201);
    }
    /**
     * Afficher une constante vitale spécifique
     */
    public function show(VitalSign $vitalSign): JsonResponse
    {
        $vitalSign->load('patient');
        return response()->json($vitalSign);
    }
    /**
     * Mettre à jour une constante vitale
     */
    public function update(Request $request, VitalSign $vitalSign): JsonResponse
    {
        $validated = $request->validate([
            'patient_id' => 'sometimes|required|exists:patients,id',
            'bpm' => 'sometimes|required|integer|min:30|max:250',
            'blood_pressure' => 'sometimes|required|string|regex:/^\d{2,3}\/\d{2,3}$/',
            'spo2' => 'sometimes|required|integer|min:70|max:100',
            'temperature' => 'nullable|numeric|min:34|max:43',
            'notes' => 'nullable|string|max:500',
            'measured_at' => 'sometimes|required|date_format:Y-m-d H:i:s',
        ]);
        $vitalSign->update($validated);
        return response()->json($vitalSign);
    }
    /**
     * Supprimer une constante vitale
     */
    public function destroy(VitalSign $vitalSign): JsonResponse
    {
        $vitalSign->delete();
        return response()->json(null, 204);
    }
    /**
     * Récupérer les constantes vitales d'un patient spécifique
     * GET /api/patients/{patient}/vital-signs
     */
    public function patientVitalSigns(Patient $patient): JsonResponse
    {
        $vitalSigns = $patient->vitalSigns()
            ->orderBy('measured_at', 'desc')
            ->get();
        return response()->json($vitalSigns);
    }
    /**
     * Récupérer les dernières N constantes vitales d'un patient
     * GET /api/patients/{patient}/vital-signs/latest/{limit}
     */
    public function patientLatestVitalSigns(Patient $patient, int $limit = 10): JsonResponse
    {
        $vitalSigns = $patient->vitalSigns()
            ->orderBy('measured_at', 'desc')
            ->limit($limit)
            ->get();
        return response()->json($vitalSigns);
    }
}
