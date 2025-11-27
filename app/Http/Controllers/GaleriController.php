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
            'year'        => 'required|integer',
            'title'       => 'required|string',
            'description' => 'nullable|string',
            'drive_link'  => 'required|url',
            'photo_count' => 'nullable|integer',
            'thumbnail'   => 'nullable|image'
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('galeri', 'public');
        }

        Galeri::create($validated);
        return redirect()->back()->with('success', 'Galeri berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $galeri = Galeri::findOrFail($id);
        $validated = $request->validate([
            'year'        => 'required|integer',
            'title'       => 'required|string',
            'description' => 'nullable|string',
            'drive_link'  => 'required|url',
            'photo_count' => 'nullable|integer',
            'thumbnail'   => 'nullable|image'
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($galeri->thumbnail) Storage::disk('public')->delete($galeri->thumbnail);
            $validated['thumbnail'] = $request->file('thumbnail')->store('galeri', 'public');
        }

        $galeri->update($validated);
        return redirect()->back()->with('success', 'Galeri berhasil diupdate');
    }

    public function destroy($id)
    {
        $galeri = Galeri::findOrFail($id);
        if ($galeri->thumbnail) Storage::disk('public')->delete($galeri->thumbnail);
        $galeri->delete();
        return redirect()->back()->with('success', 'Galeri dihapus');
    }
}
