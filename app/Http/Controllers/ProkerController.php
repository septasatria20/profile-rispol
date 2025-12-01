<?php

namespace App\Http\Controllers;

use App\Models\Proker;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProkerController extends Controller
{
    // Public page - untuk user
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $bidang = $request->input('bidang', 'Semua');

        // Query prokers
        $query = Proker::query();

        // Filter by bidang
        if ($bidang !== 'Semua') {
            $query->where('bidang', $bidang);
        }

        // Search by title or description
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Get results
        $prokers = $query->latest()->get();

        // Get all unique bidangs for filter
        $bidangs = ['Semua', 'Syiar', 'Mentoring', 'Humas', 'Ketakmiran', 'Kaderisasi', 'Keputrian'];

        return Inertia::render('Proker', [
            'prokers' => $prokers,
            'filters' => [
                'search' => $search,
                'bidang' => $bidang,
            ],
            'bidangs' => $bidangs,
        ]);
    }

    // Admin CRUD methods
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'bidang' => 'required|string',
            'date' => 'required|date',
            'status' => 'required|in:Aktif,Selesai',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('prokers', 'public');
            $validated['image'] = $path;
        }

        Proker::create($validated);

        return redirect()->back()->with('success', 'Program kerja berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $proker = Proker::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'bidang' => 'required|string',
            'date' => 'required|date',
            'status' => 'required|in:Aktif,Selesai',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($proker->image) {
                Storage::disk('public')->delete($proker->image);
            }
            $path = $request->file('image')->store('prokers', 'public');
            $validated['image'] = $path;
        }

        $proker->update($validated);

        return redirect()->back()->with('success', 'Program kerja berhasil diperbarui');
    }

    public function destroy($id)
    {
        $proker = Proker::findOrFail($id);

        // Delete image if exists
        if ($proker->image) {
            Storage::disk('public')->delete($proker->image);
        }

        $proker->delete();

        return redirect()->back()->with('success', 'Program kerja berhasil dihapus');
    }
}
