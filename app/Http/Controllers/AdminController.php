<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\BankAccount;
use App\Models\Bidang;
use App\Models\Pengurus;
use App\Models\Setting;
use App\Models\Donation;
use App\Models\Contact;
use App\Models\Proker;
use App\Models\Galeri;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function login()
    {
        return Inertia::render('Auth/Login');
    }

    public function dashboard()
    {
        $stats = [
            ['label' => 'Total Donasi', 'val' => 'Rp ' . number_format(Donation::where('status', 'verified')->sum('amount'), 0, ',', '.'), 'color' => 'bg-emerald-500'],
            ['label' => 'Total Views', 'val' => '12.5K', 'color' => 'bg-blue-500'],
            ['label' => 'Berita', 'val' => Berita::count(), 'color' => 'bg-purple-500'],
            ['label' => 'Proker', 'val' => Proker::count(), 'color' => 'bg-orange-500'],
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'prokers' => Proker::orderBy('date', 'desc')->get(),
            'beritas' => Berita::latest()->get(),
            'donations' => Donation::latest()->get(),
            'contacts' => Contact::latest()->get(),
            'bankAccounts' => BankAccount::all(),
            'galleries' => Galeri::orderBy('year', 'desc')->get(),
            'bidangs' => Bidang::orderBy('order')->get(),
            'pengurusInti' => Pengurus::where('type', 'inti')->orderBy('order')->get(),
            'pengurusHarian' => Pengurus::where('type', 'harian')->orderBy('order')->get(),
            'visiMisi' => [
                'visi' => Setting::get('visi'),
                'misi' => Setting::get('misi'),
                'sejarah' => Setting::get('sejarah'),
            ],
            'settings' => [
                'youtube_link' => Setting::get('youtube_link'),
                'qris_image' => Setting::get('qris_image'),
                'hero_image' => Setting::get('hero_image'),
            ]
        ]);
    }

    // --- BERITA ---
    public function storeBerita(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'published_at' => 'required|date',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('berita', 'public');
        }

        Berita::create($validated);
        return redirect()->back()->with('success', 'Berita berhasil ditambahkan');
    }

    public function updateBerita(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'published_at' => 'required|date',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('image')) {
            if ($berita->image) Storage::disk('public')->delete($berita->image);
            $validated['image'] = $request->file('image')->store('berita', 'public');
        }

        $berita->update($validated);
        return redirect()->back()->with('success', 'Berita berhasil diupdate');
    }

    public function destroyBerita($id)
    {
        $berita = Berita::findOrFail($id);
        if ($berita->image) Storage::disk('public')->delete($berita->image);
        $berita->delete();
        return redirect()->back()->with('success', 'Berita dihapus');
    }

    // --- BANK ACCOUNTS ---
    public function storeBankAccount(Request $request)
    {
        $validated = $request->validate([
            'bank_name' => 'required',
            'account_number' => 'required',
            'account_holder' => 'required',
            'is_active' => 'boolean'
        ]);
        
        if ($request->hasFile('logo')) {
             $validated['logo'] = $request->file('logo')->store('banks', 'public');
        }

        BankAccount::create($validated);
        return redirect()->back()->with('success', 'Rekening berhasil ditambahkan');
    }

    public function updateBankAccount(Request $request, $id)
    {
        $bank = BankAccount::findOrFail($id);
        $validated = $request->validate([
            'bank_name' => 'required',
            'account_number' => 'required',
            'account_holder' => 'required',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('logo')) {
             if ($bank->logo) Storage::disk('public')->delete($bank->logo);
             $validated['logo'] = $request->file('logo')->store('banks', 'public');
        }

        $bank->update($validated);
        return redirect()->back()->with('success', 'Rekening berhasil diupdate');
    }

    public function destroyBankAccount($id)
    {
        BankAccount::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Rekening dihapus');
    }

    // --- BIDANG ---
    public function storeBidang(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'image' => 'nullable|image',
            'order' => 'nullable|integer'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('bidang', 'public');
        }

        Bidang::create($validated);
        return redirect()->back()->with('success', 'Bidang berhasil ditambahkan');
    }

    public function updateBidang(Request $request, $id)
    {
        $bidang = Bidang::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'image' => 'nullable|image',
            'order' => 'nullable|integer'
        ]);

        if ($request->hasFile('image')) {
            if ($bidang->image) Storage::disk('public')->delete($bidang->image);
            $validated['image'] = $request->file('image')->store('bidang', 'public');
        }

        $bidang->update($validated);
        return redirect()->back()->with('success', 'Bidang berhasil diupdate');
    }

    public function destroyBidang($id)
    {
        $bidang = Bidang::findOrFail($id);
        if ($bidang->image) Storage::disk('public')->delete($bidang->image);
        $bidang->delete();
        return redirect()->back()->with('success', 'Bidang dihapus');
    }

    // --- PENGURUS ---
    public function storePengurus(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'role' => 'required',
            'type' => 'required|in:inti,harian',
            'nim' => 'nullable',
            'prodi' => 'nullable',
            'image' => 'nullable|image',
            'order' => 'nullable|integer'
        ]);

        $data = [
            'name' => $validated['name'],
            'position' => $validated['role'],
            'type' => $validated['type'],
            'nim' => $validated['nim'] ?? null,
            'prodi' => $validated['prodi'] ?? null,
            'order' => $validated['order'] ?? 0,
        ];

        if ($request->hasFile('image')) {
            $data['photo'] = $request->file('image')->store('pengurus', 'public');
        }

        Pengurus::create($data);
        return redirect()->back()->with('success', 'Pengurus berhasil ditambahkan');
    }

    public function updatePengurus(Request $request, $id)
    {
        $pengurus = Pengurus::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required',
            'role' => 'required',
            'type' => 'required',
            'nim' => 'nullable',
            'prodi' => 'nullable',
            'image' => 'nullable|image',
            'order' => 'nullable|integer'
        ]);

        $data = [
            'name' => $validated['name'],
            'position' => $validated['role'],
            'type' => $validated['type'],
            'nim' => $validated['nim'] ?? null,
            'prodi' => $validated['prodi'] ?? null,
            'order' => $validated['order'] ?? 0,
        ];

        if ($request->hasFile('image')) {
            if ($pengurus->photo) Storage::disk('public')->delete($pengurus->photo);
            $data['photo'] = $request->file('image')->store('pengurus', 'public');
        }

        $pengurus->update($data);
        return redirect()->back()->with('success', 'Pengurus berhasil diupdate');
    }

    public function destroyPengurus($id)
    {
        $pengurus = Pengurus::findOrFail($id);
        if ($pengurus->photo) Storage::disk('public')->delete($pengurus->photo);
        $pengurus->delete();
        return redirect()->back()->with('success', 'Pengurus dihapus');
    }

    // --- ORGANIZATION INFO ---
    public function updateOrganizationInfo(Request $request)
    {
        $request->validate([
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'sejarah' => 'nullable|string',
        ]);

        Setting::set('visi', $request->visi);
        Setting::set('misi', $request->misi);
        Setting::set('sejarah', $request->sejarah);

        return redirect()->back()->with('success', 'Informasi organisasi diupdate');
    }

    // --- SETTINGS ---
    public function updateSettings(Request $request)
    {
        if ($request->has('youtube_link')) {
            Setting::set('youtube_link', $request->youtube_link);
        }

        if ($request->hasFile('hero_image')) {
            $path = $request->file('hero_image')->store('settings', 'public');
            Setting::set('hero_image', $path);
        }

        if ($request->hasFile('qris_image')) {
            $path = $request->file('qris_image')->store('settings', 'public');
            Setting::set('qris_image', $path);
        }
        
        foreach(['slider_1', 'slider_2', 'slider_3'] as $slider) {
            if ($request->hasFile($slider)) {
                $path = $request->file($slider)->store('sliders', 'public');
                Setting::set($slider, $path);
            }
        }

        return redirect()->back()->with('success', 'Pengaturan diupdate');
    }

    // --- DONATIONS ---
    public function updateDonationStatus(Request $request, $id)
    {
        $donation = Donation::findOrFail($id);
        $donation->update(['status' => $request->status]);
        return redirect()->back()->with('success', 'Status donasi diupdate');
    }

    public function destroyDonation($id)
    {
        $donation = Donation::findOrFail($id);
        if ($donation->payment_proof) Storage::disk('public')->delete($donation->payment_proof);
        $donation->delete();
        return redirect()->back()->with('success', 'Donasi dihapus');
    }

    // --- CONTACTS ---
    public function updateContactStatus(Request $request, $id)
    {
        Contact::findOrFail($id)->update(['status' => $request->status]);
        return redirect()->back()->with('success', 'Status pesan diupdate');
    }

    public function destroyContact($id)
    {
        Contact::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Pesan dihapus');
    }
}
