<?php

namespace App\Http\Controllers;

use App\Models\Proker;
use App\Models\Bidang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProkerController extends Controller
{
    // Public Page
    public function index(Request $request)
    {
        $query = Proker::query()->where('status', 'Aktif');

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->has('bidang') && $request->bidang !== 'Semua') {
            $query->where('bidang', $request->bidang);
        }

        $prokers = $query->latest('date')->get();
        
        // Get list of bidangs for filter
        $bidangs = ['Semua', ...Bidang::where('is_active', true)->pluck('name')->toArray()];

        return Inertia::render('Proker', [
            'prokers' => $prokers,
            'bidangs' => $bidangs,
            'filters' => $request->only(['search', 'bidang']),
        ]);
    }

    // Admin: Store
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'bidang' => 'required|string',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'status' => 'required|in:Aktif,Selesai',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('prokers', 'public');
        }

        Proker::create($validated);

        return redirect()->back()->with('success', 'Program kerja berhasil ditambahkan');
    }

    // Admin: Update
    public function update(Request $request, $id)
    {
        $proker = Proker::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'bidang' => 'required|string',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'status' => 'required|in:Aktif,Selesai',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($proker->image) {
                Storage::disk('public')->delete($proker->image);
            }
            $validated['image'] = $request->file('image')->store('prokers', 'public');
        }

        $proker->update($validated);

        return redirect()->back()->with('success', 'Program kerja berhasil diperbarui');
    }

    // Admin: Destroy
    public function destroy($id)
    {
        $proker = Proker::findOrFail($id);
        if ($proker->image) {
            Storage::disk('public')->delete($proker->image);
        }
        $proker->delete();
        return redirect()->back()->with('success', 'Program kerja berhasil dihapus');
    }
}


