<?php

namespace App\Http\Controllers;

use App\Models\Bidang;
use App\Models\Pengurus;
use App\Models\Proker;
use App\Models\Galeri;
use App\Models\Berita;
use App\Models\Setting;
use App\Models\Contact;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        // Get slider images
        $sliderImages = array_filter([
            Setting::get('slider_1'),
            Setting::get('slider_2'),
            Setting::get('slider_3'),
        ]);
        
        // Get slider titles
        $sliderTitles = [
            Setting::get('slider_1_title', 'Dokumentasi Kegiatan 1'),
            Setting::get('slider_2_title', 'Dokumentasi Kegiatan 2'),
            Setting::get('slider_3_title', 'Dokumentasi Kegiatan 3'),
        ];

        return Inertia::render('Home', [
            // Mengirim data ke props React
            'bidangs' => Bidang::where('is_active', true)->orderBy('order')->get(),
            'pengurusInti' => Pengurus::where('type', 'inti')->where('is_active', true)->orderBy('order')->get(),
            'pengurusHarian' => Pengurus::where('type', 'harian')->where('is_active', true)->orderBy('order')->get(),
            'news' => Berita::latest()->take(3)->get(),
            'prokers' => Proker::where('status', 'Aktif')->orderBy('date', 'desc')->get(),
            'galeris' => Galeri::orderBy('year', 'desc')->get(),
            'heroImage' => Setting::get('hero_image'),
            'youtubeLink' => Setting::get('youtube_link'),
            'sliderImages' => array_values($sliderImages), // Re-index array
            'sliderTitles' => $sliderTitles, // Add this line
            'visiMisi' => [
                'visi' => Setting::get('visi', ''),
                'misi' => Setting::get('misi', ''),
                'sejarah' => Setting::get('sejarah', ''),
            ],
        ]);
    }
    
    public function storeMessage(Request $request) 
    {
        // Validasi dan simpan pesan kontak
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required'
        ]);
        
        // Simpan ke database (pastikan model Pesan sudah dibuat)
        // Pesan::create($request->all());
        
        return redirect()->back()->with('success', 'Pesan terkirim!');
    }

    public function kontakPage()
    {
        return Inertia::render('Kontak');
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string',
        ]);

        Contact::create($validated);

        return redirect()->back()->with('success', 'Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.');
    }

    public function donasiPage()
    {
        $bankAccounts = BankAccount::where('is_active', true)->get();
        $qrisImage = Setting::get('qris_image');

        return Inertia::render('Donasi', [
            'bankAccounts' => $bankAccounts,
            'qrisImage' => $qrisImage,
        ]);
    }

    public function storeDonation(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'amount' => 'required|numeric|min:10000',
            'campaign' => 'required|string|max:255',
            'message' => 'nullable|string',
            'payment_proof' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('payment_proof')) {
            $path = $request->file('payment_proof')->store('donations', 'public');
            $validated['payment_proof'] = $path;
        }

        \App\Models\Donation::create($validated);

        return redirect()->back()->with('success', 'Terima kasih atas donasi Anda! Kami akan memverifikasi pembayaran Anda segera.');
    }

    public function tentangKamiPage()
    {
        $bidangs = Bidang::where('is_active', true)->orderBy('order')->get();
        $pengurusInti = Pengurus::where('type', 'inti')->where('is_active', true)->orderBy('order')->get();
        $pengurusHarian = Pengurus::where('type', 'harian')->where('is_active', true)->orderBy('order')->get();
        
        $visiMisi = [
            'visi' => Setting::get('visi', ''),
            'misi' => Setting::get('misi', ''),
            'sejarah' => Setting::get('sejarah', ''),
        ];

        return Inertia::render('TentangKami', [
            'bidangs' => $bidangs,
            'pengurusInti' => $pengurusInti,
            'pengurusHarian' => $pengurusHarian,
            'visiMisi' => $visiMisi,
        ]);
    }

    // ADDED: Galeri Page Method
    public function galeriPage()
    {
        $galeris = Galeri::orderBy('year', 'desc')->get();
        return Inertia::render('Galeri', [
            'galeris' => $galeris
        ]);
    }
}
