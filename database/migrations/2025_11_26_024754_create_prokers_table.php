<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('prokers')) {
            Schema::create('prokers', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('bidang'); // Syiar, Mentoring, etc.
                $table->date('date');
                $table->string('status')->default('Aktif'); // Aktif, Selesai
                $table->text('description')->nullable();
                $table->string('image')->nullable();
                $table->timestamps();
            });
        } else {
            Schema::table('prokers', function (Blueprint $table) {
                if (!Schema::hasColumn('prokers', 'bidang')) {
                    $table->string('bidang')->after('title');
                }
                if (!Schema::hasColumn('prokers', 'status')) {
                    $table->string('status')->default('Aktif')->after('date');
                }
                if (!Schema::hasColumn('prokers', 'description')) {
                    $table->text('description')->nullable()->after('status');
                }
                if (!Schema::hasColumn('prokers', 'image')) {
                    $table->string('image')->nullable()->after('description');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prokers');
    }
};
