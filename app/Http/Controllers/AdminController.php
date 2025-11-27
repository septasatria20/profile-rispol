<?php

namespace App\Http\Controllers;

use App\Models\Proker;
use App\Models\Berita;
use App\Models\Donation;
use App\Models\BankAccount;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function dashboard()
    {
        $prokerCount = Proker::where('status', 'Aktif')->count();
        $totalDonations = Donation::where('status', 'verified')->sum('amount');
        $pendingDonations = Donation::where('status', 'pending')->count();
        $totalBerita = Berita::count();

        $stats = [
            ['label' => 'Total Donasi', 'val' => 'Rp ' . number_format($totalDonations / 1000000, 1) . 'M', 'icon' => 'DollarSign', 'color' => 'bg-emerald-500'],
            ['label' => 'Donasi Pending', 'val' => (string)$pendingDonations, 'icon' => 'Eye', 'color' => 'bg-orange-500'],
            ['label' => 'Total Berita', 'val' => (string)$totalBerita, 'icon' => 'MessageSquare', 'color' => 'bg-blue-500'],
            ['label' => 'Proker Aktif', 'val' => (string)$prokerCount, 'icon' => 'Calendar', 'color' => 'bg-purple-500']
        ];

        $prokers = Proker::latest()->get();
        $beritas = Berita::latest()->take(10)->get();
        $donations = Donation::latest()->where('status', 'verified')->take(5)->get();
        $bankAccounts = BankAccount::where('is_active', true)->get();
        
        // Settings
        $heroImage = Setting::get('hero_image');
        $youtubeLink = Setting::get('youtube_link', 'https://www.youtube.com/embed/PqasWO3d-jc');
        $qrisImage = Setting::get('qris_image');

        // Slider Images for Home (max 3)
        $sliderImages = [
            Setting::get('slider_1'),
            Setting::get('slider_2'),
            Setting::get('slider_3'),
        ];
        $sliderImages = array_filter($sliderImages); // Remove null values

        $galleries = [
            ['id' => 1, 'year' => 2025, 'title' => 'Dokumentasi Kegiatan 2025', 'count' => '20 Foto', 'link' => 'https://drive.google.com/drive/folders/xxx'],
            ['id' => 2, 'year' => 2024, 'title' => 'Dokumentasi Kegiatan 2024', 'count' => '77 Foto', 'link' => 'https://drive.google.com/drive/folders/yyy'],
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'prokers' => $prokers,
            'beritas' => $beritas,
            'donations' => $donations,
            'bankAccounts' => $bankAccounts,
            'galleries' => $galleries,
            'settings' => [
                'hero_image' => $heroImage,
                'youtube_link' => $youtubeLink,
                'qris_image' => $qrisImage,
                'slider_images' => $sliderImages,
            ],
        ]);
    }

    // Berita CRUD
    public function storeBerita(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'published_at' => 'required|date',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('berita', 'public');
            $validated['image'] = $path;
        }

        Berita::create($validated);

        return redirect()->back()->with('success', 'Berita berhasil ditambahkan');
    }

    public function updateBerita(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'published_at' => 'required|date',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            if ($berita->image) {
                Storage::disk('public')->delete($berita->image);
            }
            $path = $request->file('image')->store('berita', 'public');
            $validated['image'] = $path;
        }

        $berita->update($validated);

        return redirect()->back()->with('success', 'Berita berhasil diperbarui');
    }

    public function destroyBerita($id)
    {
        $berita = Berita::findOrFail($id);
        
        if ($berita->image) {
            Storage::disk('public')->delete($berita->image);
        }
        
        $berita->delete();

        return redirect()->back()->with('success', 'Berita berhasil dihapus');
    }

    // Bank Account CRUD
    public function storeBankAccount(Request $request)
    {
        $validated = $request->validate([
            'bank_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'account_holder' => 'required|string|max:255',
            'logo' => 'nullable|image|max:1024',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('banks', 'public');
            $validated['logo'] = $path;
        }

        BankAccount::create($validated);

        return redirect()->back()->with('success', 'Rekening berhasil ditambahkan');
    }

    public function updateBankAccount(Request $request, $id)
    {
        $bank = BankAccount::findOrFail($id);
        
        $validated = $request->validate([
            'bank_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'account_holder' => 'required|string|max:255',
            'is_active' => 'required|boolean',
            'logo' => 'nullable|image|max:1024',
        ]);

        if ($request->hasFile('logo')) {
            if ($bank->logo) {
                Storage::disk('public')->delete($bank->logo);
            }
            $path = $request->file('logo')->store('banks', 'public');
            $validated['logo'] = $path;
        }

        $bank->update($validated);

        return redirect()->back()->with('success', 'Rekening berhasil diperbarui');
    }

    public function destroyBankAccount($id)
    {
        $bank = BankAccount::findOrFail($id);
        
        if ($bank->logo) {
            Storage::disk('public')->delete($bank->logo);
        }
        
        $bank->delete();

        return redirect()->back()->with('success', 'Rekening berhasil dihapus');
    }

    // Settings Update
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'youtube_link' => 'nullable|url',
            'hero_image' => 'nullable|image|max:2048',
            'qris_image' => 'nullable|image|max:2048',
            'slider_1' => 'nullable|image|max:2048',
            'slider_2' => 'nullable|image|max:2048',
            'slider_3' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('hero_image')) {
            $oldImage = Setting::get('hero_image');
            if ($oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
            $path = $request->file('hero_image')->store('settings', 'public');
            Setting::set('hero_image', $path);
        }

        if ($request->hasFile('qris_image')) {
            $oldImage = Setting::get('qris_image');
            if ($oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
            $path = $request->file('qris_image')->store('settings', 'public');
            Setting::set('qris_image', $path);
        }

        // Slider Images
        for ($i = 1; $i <= 3; $i++) {
            $key = "slider_{$i}";
            if ($request->hasFile($key)) {
                $oldImage = Setting::get($key);
                if ($oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
                $path = $request->file($key)->store('settings/sliders', 'public');
                Setting::set($key, $path);
            }
        }

        if ($request->youtube_link) {
            Setting::set('youtube_link', $request->youtube_link);
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui');
    }

    // Donation Status Update
    public function updateDonationStatus(Request $request, $id)
    {
        $donation = Donation::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|in:pending,verified,rejected',
        ]);

        $donation->update($validated);

        return redirect()->back()->with('success', 'Status donasi berhasil diperbarui');
    }

    public function login()
    {
        return Inertia::render('Admin/Login');
    }
}
