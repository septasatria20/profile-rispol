<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Setting;
use App\Models\Donation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class DonasiController extends Controller
{
    public function index()
    {
        $campaigns = [
            ['id' => 1, 'name' => 'Operasional Dakwah (Infaq Umum)'],
            ['id' => 2, 'name' => 'Safari Dakwah'],
            ['id' => 3, 'name' => 'Polinema Bersholawat'],
            ['id' => 4, 'name' => 'Firma Jumat'],
        ];

        // QRIS dari settings
        $qrisImage = Setting::get('qris_image');
        $qrisPath = $qrisImage
            ? '/storage/' . $qrisImage
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png';

        // Rekening aktif
        $banks = BankAccount::where('is_active', true)
            ->get()
            ->map(function ($bank) {
                return [
                    'bank'   => $bank->bank_name,
                    'number' => $bank->account_number,
                    'holder' => $bank->account_holder,
                    'logo'   => $bank->logo ? '/storage/' . $bank->logo : null,
                ];
            })
            ->toArray();

        $paymentMethods = [
            'qris'  => $qrisPath,
            'banks' => $banks,
        ];

        // Donatur terakhir (verified)
        $donors = Donation::where('status', 'verified')
            ->latest()
            ->take(8)
            ->get()
            ->map(function ($d) {
                return [
                    'name'    => $d->name,
                    'amount'  => $d->amount,
                    'message' => $d->message,
                ];
            })
            ->toArray();

        // Poster Donasi (Multiple) - Portrait A4
        $donationPosters = [];
        for ($i = 1; $i <= 5; $i++) {
            $poster = Setting::get("donation_poster_{$i}");
            if ($poster) {
                $donationPosters[] = '/storage/' . $poster;
            }
        }

        // Fallback jika tidak ada poster
        if (empty($donationPosters)) {
            $donationPosters = [
                'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1200&auto=format&fit=crop',
            ];
        }

        // Info poster dari slider settings (opsional)
        $infoPosters = [
            Setting::get('slider_1') ? '/storage/' . Setting::get('slider_1') : null,
            Setting::get('slider_2') ? '/storage/' . Setting::get('slider_2') : null,
        ];
        $infoPosters = array_filter($infoPosters);

        return Inertia::render('Donasi', [
            'campaigns'       => $campaigns,
            'paymentMethods'  => $paymentMethods,
            'donors'          => $donors,
            'donationPosters' => $donationPosters,
            'infoPosters'     => $infoPosters,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name'          => 'required|string|max:255',
                'email'         => 'nullable|email|max:255',
                'amount'        => 'required|integer|min:10000',
                'campaign'      => 'required|string|max:255',
                'message'       => 'nullable|string',
                'payment_proof' => 'required|image|max:2048',
            ]);

            if ($request->hasFile('payment_proof')) {
                $path = $request->file('payment_proof')->store('donations', 'public');
                $validated['payment_proof'] = $path;
            }

            $validated['status'] = 'pending';

            Donation::create($validated);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Jazakumullah khairan katsiran, donasi berhasil dikirim dan sedang diverifikasi.'
                );
        } catch (ValidationException $e) {
            // biar error validasi tetap muncul di Inertia sebagai errors.*
            throw $e;
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal mengirim donasi. Silakan coba lagi.')
                ->withInput();
        }
    }
}
