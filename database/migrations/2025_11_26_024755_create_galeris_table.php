<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('galeris')) {
            Schema::create('galeris', function (Blueprint $table) {
                $table->id();
                $table->year('year');
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('drive_link');
                $table->integer('photo_count')->default(0);
                $table->string('thumbnail')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('galeris');
    }
};
