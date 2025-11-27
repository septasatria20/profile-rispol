<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Donation;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonasiController extends Controller
{
    public function index()
    {
        $campaigns = [
            ['id' => 1, 'name' => 'Operasional Dakwah (Infaq Umum)'],
            ['id' => 2, 'name' => 'Safari Dakwah 2025'],
            ['id' => 3, 'name' => 'Polinema Bersholawat'],
            ['id' => 4, 'name' => 'Santunan Yatim & Dhuafa'],
            ['id' => 5, 'name' => 'Jumat Berkah'],
        ];

        // Get QRIS from Settings
        $qrisImage = Setting::get('qris_image');
        $qrisPath = $qrisImage ? '/storage/' . $qrisImage : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png';

        // Get Active Bank Accounts
        $banks = BankAccount::where('is_active', true)->get()->map(function($bank) {
            return [
                'bank' => $bank->bank_name,
                'number' => $bank->account_number,
                'holder' => $bank->account_holder,
                'logo' => $bank->logo ? '/storage/' . $bank->logo : null,
            ];
        });

        $paymentMethods = [
            'qris' => $qrisPath,
            'banks' => $banks->toArray(),
        ];

        // Recent Donors (verified only)
        $donors = Donation::where('status', 'verified')
            ->latest()
            ->take(8)
            ->get()
            ->map(function($d) {
                return [
                    'name' => $d->name,
                    'amount' => $d->amount,
                    'message' => $d->message,
                ];
            })
            ->toArray();

        // Info Posters
        $infoPosters = [
            Setting::get('slider_1') ? '/storage/' . Setting::get('slider_1') : 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=600&auto=format&fit=crop',
            Setting::get('slider_2') ? '/storage/' . Setting::get('slider_2') : 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop',
        ];
        $infoPosters = array_filter($infoPosters);

        $posters = [
            'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop',
        ];

        return Inertia::render('Donasi', [
            'campaigns' => $campaigns,
            'paymentMethods' => $paymentMethods,
            'donors' => $donors,
            'posters' => $posters,
            'infoPosters' => $infoPosters,
        ]);
    }
}
