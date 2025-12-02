<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'username' => 'admin_rispol',
            'password' => Hash::make('Rispol2024!'),
            'name' => 'Administrator RISPOL',
            'email' => 'admin@rispol.polinema.ac.id',
        ]);
    }
}
