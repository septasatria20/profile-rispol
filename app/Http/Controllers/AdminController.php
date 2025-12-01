<?php

namespace App\Http\Controllers;

use App\Models\Proker;
use App\Models\Berita;
use App\Models\Donation;
use App\Models\BankAccount;
use App\Models\Setting;
use App\Models\Bidang;
use App\Models\Pengurus;
use App\Models\Contact;
use App\Models\Galeri;
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
        $donations = Donation::latest()->take(10)->get();
        $bankAccounts = BankAccount::where('is_active', true)->get();
        $contacts = Contact::latest()->take(10)->get();
        
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

        $galleries = Galeri::orderBy('year', 'desc')->get();

        $bidangs = Bidang::where('is_active', true)->orderBy('order')->get();
        $pengurusInti = Pengurus::where('type', 'inti')->where('is_active', true)->orderBy('order')->get();
        $pengurusHarian = Pengurus::where('type', 'harian')->where('is_active', true)->orderBy('order')->get();
        
        // Get organization info
        $visiMisi = [
            'visi' => Setting::get('visi', ''),
            'misi' => Setting::get('misi', ''),
            'sejarah' => Setting::get('sejarah', ''),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'prokers' => $prokers,
            'beritas' => $beritas,
            'donations' => $donations,
            'contacts' => $contacts,
            'bankAccounts' => $bankAccounts,
            'galleries' => $galleries,
            'bidangs' => $bidangs,
            'pengurusInti' => $pengurusInti,
            'pengurusHarian' => $pengurusHarian,
            'visiMisi' => $visiMisi,
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

    // Bidang CRUD
    public function storeBidang(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('bidangs', 'public');
            $validated['image'] = $path;
        }

        Bidang::create($validated);

        return redirect()->back()->with('success', 'Bidang berhasil ditambahkan');
    }

    public function updateBidang(Request $request, $id)
    {
        $bidang = Bidang::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'order' => 'nullable|integer',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($bidang->image) {
                Storage::disk('public')->delete($bidang->image);
            }
            $path = $request->file('image')->store('bidangs', 'public');
            $validated['image'] = $path;
        }

        $bidang->update($validated);

        return redirect()->back()->with('success', 'Bidang berhasil diperbarui');
    }

    public function destroyBidang($id)
    {
        $bidang = Bidang::findOrFail($id);
        
        if ($bidang->image) {
            Storage::disk('public')->delete($bidang->image);
        }
        
        $bidang->delete();

        return redirect()->back()->with('success', 'Bidang berhasil dihapus');
    }

    // Pengurus CRUD
    public function storePengurus(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'nim' => 'nullable|string|max:255',
            'prodi' => 'nullable|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'type' => 'required|in:inti,harian',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('pengurus', 'public');
            $validated['photo'] = $path;
        }

        Pengurus::create($validated);

        return redirect()->back()->with('success', 'Pengurus berhasil ditambahkan');
    }

    public function updatePengurus(Request $request, $id)
    {
        $pengurus = Pengurus::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'nim' => 'nullable|string|max:255',
            'prodi' => 'nullable|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'type' => 'required|in:inti,harian',
            'order' => 'nullable|integer',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('photo')) {
            if ($pengurus->photo) {
                Storage::disk('public')->delete($pengurus->photo);
            }
            $path = $request->file('photo')->store('pengurus', 'public');
            $validated['photo'] = $path;
        }

        $pengurus->update($validated);

        return redirect()->back()->with('success', 'Pengurus berhasil diperbarui');
    }

    public function destroyPengurus($id)
    {
        $pengurus = Pengurus::findOrFail($id);
        
        if ($pengurus->photo) {
            Storage::disk('public')->delete($pengurus->photo);
        }
        
        $pengurus->delete();

        return redirect()->back()->with('success', 'Pengurus berhasil dihapus');
    }

    // Update Organization Info (Visi, Misi, Sejarah) - FIX
    public function updateOrganizationInfo(Request $request)
    {
        $validated = $request->validate([
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'sejarah' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            if ($value !== null) {
                Setting::set($key, $value);
            }
        }

        return redirect()->back()->with('success', 'Informasi organisasi berhasil diperbarui');
    }

    // Contact Management
    public function updateContactStatus(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|in:pending,replied',
        ]);

        $contact->update($validated);

        return redirect()->back()->with('success', 'Status pesan berhasil diperbarui');
    }

    public function destroyContact($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return redirect()->back()->with('success', 'Pesan berhasil dihapus');
    }

    public function login()
    {
        return Inertia::render('Admin/Login');
    }
    

    // Galeri CRUD
    public function storeGaleri(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|integer|min:2000|max:2100',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'drive_link' => 'required|url',
            'photo_count' => 'nullable|integer|min:0',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('galeris', 'public');
            $validated['thumbnail'] = $path;
        }

        Galeri::create($validated);

        return redirect()->back()->with('success', 'Arsip galeri berhasil ditambahkan');
    }

    public function updateGaleri(Request $request, $id)
    {
        $galeri = Galeri::findOrFail($id);
        
        $validated = $request->validate([
            'year' => 'required|integer|min:2000|max:2100',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'drive_link' => 'required|url',
            'photo_count' => 'nullable|integer|min:0',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($galeri->thumbnail) {
                Storage::disk('public')->delete($galeri->thumbnail);
            }
            $path = $request->file('thumbnail')->store('galeris', 'public');
            $validated['thumbnail'] = $path;
        }

        $galeri->update($validated);

        return redirect()->back()->with('success', 'Arsip galeri berhasil diperbarui');
    }

    public function destroyGaleri($id)
    {
        $galeri = Galeri::findOrFail($id);
        
        if ($galeri->thumbnail) {
            Storage::disk('public')->delete($galeri->thumbnail);
        }
        
        $galeri->delete();

        return redirect()->back()->with('Sukses', 'Arsip galeri berhasil dihapus');
    }
}
