<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProkerController;
use App\Http\Controllers\DonasiController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LandingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// --- MOCK DATA ---
$bidangs = [
    [ 
        'id' => 1, 
        'name' => 'Mentoring', 
        'image' => 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop',
        'description' => 'Membimbing mahasiswa dalam pendalaman nilai-nilai Islam melalui kelompok kecil.',
        'divisions' => [['name' => 'Kurikulum'], ['name' => 'Trainer'], ['name' => 'Database Mentee']]
    ],
    [ 
        'id' => 2, 
        'name' => 'Ketakmiran', 
        'image' => 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop',
        'description' => 'Memakmurkan masjid kampus dengan aktivitas ibadah dan menjaga kenyamanan jamaah.',
        'divisions' => [['name' => 'Kebersihan'], ['name' => 'Peribadatan'], ['name' => 'Kajian']]
    ],
    [ 
        'id' => 3, 
        'name' => 'Syiar', 
        'image' => 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop',
        'description' => 'Menyebarkan dakwah kreatif melalui event besar, media sosial, dan konten digital.',
        'divisions' => [['name' => 'Multimedia'], ['name' => 'EO'], ['name' => 'Jurnalistik']]
    ],
    [ 
        'id' => 4, 
        'name' => 'Humas', 
        'image' => 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop',
        'description' => 'Jembatan komunikasi RISPOL dengan birokrasi, ormawa lain, dan masyarakat.',
        'divisions' => [['name' => 'Internal'], ['name' => 'External'], ['name' => 'Medpart']]
    ],
    [ 
        'id' => 5, 
        'name' => 'Kaderisasi', 
        'image' => 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop',
        'description' => 'Sistem regenerasi organisasi untuk mencetak pemimpin dakwah masa depan.',
        'divisions' => [['name' => 'Recruitment'], ['name' => 'Upgrading'], ['name' => 'Monitoring']]
    ],
    [ 
        'id' => 6, 
        'name' => 'Keputrian', 
        'image' => 'https://images.unsplash.com/photo-1526233267232-262e33d0628e?q=80&w=600&auto=format&fit=crop',
        'description' => 'Wadah aktualisasi diri khusus mahasiswi muslimah dalam berkarya.',
        'divisions' => [['name' => 'Jarmus'], ['name' => 'Kemuslimahan'], ['name' => 'Kreativitas']]
    ],
];

$news = [
    ['id' => 1, 'title' => 'Open Recruitment Pengurus Baru RISPOL 2025', 'published_at' => '20 Nov 2024', 'image' => 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop'],
    ['id' => 2, 'title' => 'Kajian Akbar: Membangun Jiwa Rabbani', 'published_at' => '18 Nov 2024', 'image' => 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=400&auto=format&fit=crop'],
    ['id' => 3, 'title' => 'RISPOL Berbagi: Santunan Anak Yatim', 'published_at' => '15 Nov 2024', 'image' => 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop'],
];

// --- PUBLIC ROUTES ---
Route::get('/', function () use ($bidangs, $news) {
    return Inertia::render('Home', [
        'bidangs' => $bidangs,
        'prokers' => [],
        'news' => $news,
    ]);
})->name('home');

Route::get('/tentang-kami', function () {
    return Inertia::render('TentangKami');
})->name('tentang-kami');

Route::get('/program-kerja', [ProkerController::class, 'index'])->name('program-kerja');

Route::get('/galeri', function () {
    return Inertia::render('Galeri');
})->name('galeri');

Route::get('/kontak', function () {
    return Inertia::render('Kontak');
})->name('kontak');

Route::get('/donasi', [DonasiController::class, 'index'])->name('donasi');

// --- ADMIN ROUTES ---
Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminController::class, 'login'])->name('admin.login');
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    // Proker Routes (Update uses POST for file upload)
    Route::post('/prokers', [ProkerController::class, 'store'])->name('admin.prokers.store');
    Route::post('/prokers/{id}', [ProkerController::class, 'update'])->name('admin.prokers.update');
    Route::delete('/prokers/{id}', [ProkerController::class, 'destroy'])->name('admin.prokers.destroy');

    // Berita Routes (Update uses POST for file upload)
    Route::post('/berita', [AdminController::class, 'storeBerita'])->name('admin.berita.store');
    Route::post('/berita/{id}', [AdminController::class, 'updateBerita'])->name('admin.berita.update');
    Route::delete('/berita/{id}', [AdminController::class, 'destroyBerita'])->name('admin.berita.destroy');

    // Bank Account Routes
    Route::post('/bank-accounts', [AdminController::class, 'storeBankAccount'])->name('admin.banks.store');
    Route::post('/bank-accounts/{id}', [AdminController::class, 'updateBankAccount'])->name('admin.banks.update');
    Route::delete('/bank-accounts/{id}', [AdminController::class, 'destroyBankAccount'])->name('admin.banks.destroy');

    // Bidang Routes
    Route::post('/bidangs', [AdminController::class, 'storeBidang'])->name('admin.bidangs.store');
    Route::post('/bidangs/{id}', [AdminController::class, 'updateBidang'])->name('admin.bidangs.update');
    Route::delete('/bidangs/{id}', [AdminController::class, 'destroyBidang'])->name('admin.bidangs.destroy');

    // Pengurus Routes
    Route::post('/pengurus', [AdminController::class, 'storePengurus'])->name('admin.pengurus.store');
    Route::post('/pengurus/{id}', [AdminController::class, 'updatePengurus'])->name('admin.pengurus.update');
    Route::delete('/pengurus/{id}', [AdminController::class, 'destroyPengurus'])->name('admin.pengurus.destroy');

    // Organization Info Routes
    Route::post('/organization-info', [AdminController::class, 'updateOrganizationInfo'])->name('admin.organization.update');

    // Settings Routes
    Route::post('/settings', [AdminController::class, 'updateSettings'])->name('admin.settings.update');

    // Donation Routes
    Route::post('/donations/{id}/status', [AdminController::class, 'updateDonationStatus'])->name('admin.donations.status');
});

require __DIR__.'/auth.php';
