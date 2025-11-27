<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proker;
use Carbon\Carbon;

class ProkerSeeder extends Seeder
{
    public function run(): void
    {
        $prokers = [
            [
                'title' => 'RISPOL Islamic Fair 2024',
                'bidang' => 'Syiar',
                'date' => Carbon::parse('2024-10-15'),
                'status' => 'Aktif',
                'description' => 'Event besar tahunan yang berisi lomba, seminar, dan bazar islami untuk seluruh mahasiswa Polinema.',
            ],
            [
                'title' => 'Mentoring Akbar',
                'bidang' => 'Mentoring',
                'date' => Carbon::parse('2024-08-20'),
                'status' => 'Selesai',
                'description' => 'Pembukaan kegiatan mentoring agama Islam untuk mahasiswa baru sebagai sarana pengenalan lingkungan kampus.',
            ],
            [
                'title' => 'Kajian Rutin Dhuha',
                'bidang' => 'Ketakmiran',
                'date' => Carbon::parse('2024-12-06'),
                'status' => 'Aktif',
                'description' => 'Kajian singkat ba\'da sholat dhuha untuk mengisi rohani di pagi hari sebelum memulai aktivitas perkuliahan.',
            ],
        ];

        foreach ($prokers as $proker) {
            Proker::create($proker);
        }
    }
}
