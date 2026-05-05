<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vital_signs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');
            $table->integer('bpm'); // Battements par minute
            $table->string('blood_pressure'); // Format: "120/80"
            $table->integer('spo2'); // Saturation en oxygène (%)
            $table->decimal('temperature', 5, 2)->nullable(); // Température
            $table->text('notes')->nullable(); // Notes additionnelles
            $table->timestamp('measured_at'); // Quand la mesure a été prise
            $table->timestamps(); // created_at, updated_at
            // Indices pour recherche rapide
            $table->index('patient_id');
            $table->index('measured_at');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('vital_signs');
    }
};
