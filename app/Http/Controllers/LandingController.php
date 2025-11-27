<?php

namespace App\Http\Controllers;

use App\Models\Bidang;
use App\Models\Pengurus;
use App\Models\Proker;
use App\Models\Galeri;
use App\Models\Berita;
use App\Models\Setting;
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
            'sliderImages' => $sliderImages,
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
}
