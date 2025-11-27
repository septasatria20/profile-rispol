<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProkerController;
use App\Http\Controllers\DonasiController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\GaleriController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// --- PUBLIC ROUTES ---
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/tentang-kami', [LandingController::class, 'tentangKamiPage'])->name('tentang-kami');
Route::get('/program-kerja', [ProkerController::class, 'index'])->name('program-kerja');
Route::get('/galeri', [LandingController::class, 'galeriPage'])->name('galeri');
Route::get('/kontak', [LandingController::class, 'kontakPage'])->name('kontak');
Route::post('/kontak', [LandingController::class, 'storeContact'])->name('kontak.store');
Route::get('/donasi', [DonasiController::class, 'index'])->name('donasi');
Route::post('/donasi', [DonasiController::class, 'store'])->name('donasi.store');

// --- ADMIN ROUTES ---
Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminController::class, 'login'])->name('admin.login');
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    // Proker Routes
    Route::post('/prokers', [ProkerController::class, 'store'])->name('admin.prokers.store');
    Route::post('/prokers/{id}', [ProkerController::class, 'update'])->name('admin.prokers.update');
    Route::delete('/prokers/{id}', [ProkerController::class, 'destroy'])->name('admin.prokers.destroy');

    // Berita Routes
    Route::post('/berita', [AdminController::class, 'storeBerita'])->name('admin.berita.store');
    Route::post('/berita/{id}', [AdminController::class, 'updateBerita'])->name('admin.berita.update');
    Route::delete('/berita/{id}', [AdminController::class, 'destroyBerita'])->name('admin.berita.destroy');

    // Bank Routes
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

    // Galeri Routes
    Route::post('/galeri', [GaleriController::class, 'store'])->name('admin.galeri.store');
    Route::post('/galeri/{id}', [GaleriController::class, 'update'])->name('admin.galeri.update');
    Route::delete('/galeri/{id}', [GaleriController::class, 'destroy'])->name('admin.galeri.destroy');

    // Organization Info Routes
    Route::post('/organization-info', [AdminController::class, 'updateOrganizationInfo'])->name('admin.organization.update');

    // Settings Routes
    Route::post('/settings', [AdminController::class, 'updateSettings'])->name('admin.settings.update');

    // Donation Routes
    Route::post('/donations/{id}/status', [AdminController::class, 'updateDonationStatus'])->name('admin.donations.status');

    // Contact Routes
    Route::post('/contacts/{id}/status', [AdminController::class, 'updateContactStatus'])->name('admin.contacts.status');
    Route::delete('/contacts/{id}', [AdminController::class, 'destroyContact'])->name('admin.contacts.destroy');
});

require __DIR__.'/auth.php';
