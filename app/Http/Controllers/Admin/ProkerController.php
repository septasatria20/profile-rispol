<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Proker;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProkerController extends Controller
{
    public function index()
    {
        // Menampilkan daftar proker
        return Inertia::render('Admin/Proker/Index', [
            'prokers' => Proker::latest()->get()
        ]);
    }

    public function create()
    {
        // Menampilkan form tambah
        return Inertia::render('Admin/Proker/Create');
    }

    public function store(Request $request)
    {
        // Validasi & Simpan
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required',
            'date' => 'required|date',
            'description' => 'nullable'
        ]);

        Proker::create($request->all());

        return redirect()->route('prokers.index')->with('success', 'Proker berhasil ditambahkan');
    }

    public function edit(Proker $proker)
    {
        return Inertia::render('Admin/Proker/Edit', [
            'proker' => $proker
        ]);
    }

    public function update(Request $request, Proker $proker)
    {
        // Logika update (mirip store)
        $proker->update($request->all());
        return redirect()->route('prokers.index');
    }

    public function destroy(Proker $proker)
    {
        $proker->delete();
        return redirect()->back();
    }
}