<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GaleriController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'year'        => 'required|integer|min:2000|max:2100',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'drive_link'  => 'required|url',
            'photo_count' => 'nullable|integer|min:0',
            'thumbnail'   => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('galeri', 'public');
        }

        Galeri::create($validated);

        return back()->with('success', 'Galeri berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $galeri = Galeri::findOrFail($id);

        $validated = $request->validate([
            'year'        => 'required|integer|min:2000|max:2100',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'drive_link'  => 'required|url',
            'photo_count' => 'nullable|integer|min:0',
            'thumbnail'   => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($galeri->thumbnail) {
                Storage::disk('public')->delete($galeri->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('galeri', 'public');
        }

        $galeri->update($validated);

        return back()->with('success', 'Galeri berhasil diperbarui');
    }

    public function destroy($id)
    {
        $galeri = Galeri::findOrFail($id);

        if ($galeri->thumbnail) {
            Storage::disk('public')->delete($galeri->thumbnail);
        }

        $galeri->delete();

        return back()->with('success', 'Galeri dihapus');
    }
}
