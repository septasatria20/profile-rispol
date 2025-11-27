<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Only attempt to add column if table exists
        if (Schema::hasTable('prokers')) {
            Schema::table('prokers', function (Blueprint $table) {
                if (!Schema::hasColumn('prokers', 'status')) {
                    $table->string('status')->default('Aktif')->after('date');
                }
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('prokers')) {
            Schema::table('prokers', function (Blueprint $table) {
                if (Schema::hasColumn('prokers', 'status')) {
                    $table->dropColumn('status');
                }
            });
        }
    }
};
