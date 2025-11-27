<?php

namespace App\Http\Controllers;

use App\Models\Proker;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProkerController extends Controller
{
    public function index()
    {
        return Inertia::render('ProgramKerja', [
            'prokers' => Proker::where('status', 'Aktif')->orderBy('date', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'bidang' => 'required',
            'date' => 'required|date',
            'status' => 'required',
            'description' => 'nullable',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('prokers', 'public');
        }

        Proker::create($validated);
        return redirect()->back()->with('success', 'Proker berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $proker = Proker::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required',
            'bidang' => 'required',
            'date' => 'required|date',
            'status' => 'required',
            'description' => 'nullable',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('image')) {
            if ($proker->image) Storage::disk('public')->delete($proker->image);
            $validated['image'] = $request->file('image')->store('prokers', 'public');
        }

        $proker->update($validated);
        return redirect()->back()->with('success', 'Proker berhasil diupdate');
    }

    public function destroy($id)
    {
        $proker = Proker::findOrFail($id);
        if ($proker->image) Storage::disk('public')->delete($proker->image);
        $proker->delete();
        return redirect()->back()->with('success', 'Proker dihapus');
    }
}
