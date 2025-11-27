<?php

namespace App\Http\Controllers;

use App\Models\Proker;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProkerController extends Controller
{
    // Public index for users
    public function index(Request $request)
    {
        $query = Proker::query()->where('status', 'Aktif');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by bidang
        if ($request->has('bidang') && $request->bidang && $request->bidang !== 'Semua') {
            $query->where('bidang', $request->bidang);
        }

        $prokers = $query->latest()->get()->map(function($proker) {
            return [
                'id' => $proker->id,
                'title' => $proker->title,
                'bidang' => $proker->bidang,
                'date' => $proker->date,
                'description' => $proker->description,
                'image' => $proker->image,
            ];
        });

        return Inertia::render('Proker', [
            'prokers' => $prokers,
            'filters' => [
                'search' => $request->search,
                'bidang' => $request->bidang,
            ],
            'bidangs' => ['Semua', 'Mentoring', 'Ketakmiran', 'Syiar', 'Humas', 'Kaderisasi', 'Keputrian']
        ]);
    }

    // Admin CRUD methods
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'bidang' => 'required|string',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('prokers', 'public');
            $validated['image'] = $path;
        }

        Proker::create($validated);

        return redirect()->route('admin.dashboard')->with('success', 'Program Kerja berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $proker = Proker::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'bidang' => 'required|string',
            'date' => 'required|date',
            'status' => 'required|string',
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

        return redirect()->route('admin.dashboard')->with('success', 'Program Kerja berhasil diperbarui');
    }

    public function destroy($id)
    {
        $proker = Proker::findOrFail($id);
        
        if ($proker->image) {
            Storage::disk('public')->delete($proker->image);
        }
        
        $proker->delete();

        return redirect()->route('admin.dashboard')->with('success', 'Program Kerja berhasil dihapus');
    }
}
