import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import {
    Copy,
    Check,
    Heart,
    CreditCard,
    Wallet,
    Quote,
    AlertCircle,
    QrCode,
} from 'lucide-react';

// Toast / popup sederhana (atas kanan)
const Toast = ({ type = 'success', message, onClose }) => {
    if (!message) return null;

    const isSuccess = type === 'success';

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-xl text-sm">
            <div
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    isSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}
            >
                {isSuccess ? <Check size={16} /> : <AlertCircle size={16} />}
            </div>
            <span className="max-w-xs text-slate-700">{message}</span>
            <button
                onClick={onClose}
                className="ml-2 text-slate-400 hover:text-slate-700"
            >
                ✕
            </button>
        </div>
    );
};

export default function Donasi({
    campaigns = [],
    paymentMethods = { qris: null, banks: [] },
    donors = [],
    donationPosters = [], // Multiple posters untuk slider di bawah
    infoPosters = [],
}) {
    const { flash = {} } = usePage().props;

    // Step wizard: 1 = isi data, 2 = pilih metode + upload bukti
    const [step, setStep] = useState(1);

    // Slider poster donasi & donatur
    const [currentDonationPoster, setCurrentDonationPoster] = useState(0);
    const [currentDonor, setCurrentDonor] = useState(0);

    // Tab metode pembayaran: 'qris' | 'bank'
    const [paymentTab, setPaymentTab] = useState('qris');

    const [copied, setCopied] = useState(null);

    // Toast state
    const [toast, setToast] = useState({ type: 'success', message: '' });

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        transform,
    } = useForm({
        name: '',
        email: '',
        amount: '',
        campaign: campaigns.length ? campaigns[0].name : '',
        message: '',
        payment_proof: null,
    });

    // Munculkan toast saat ada flash dari server
    useEffect(() => {
        if (flash.success) {
            setToast({ type: 'success', message: flash.success });
        } else if (flash.error) {
            setToast({ type: 'error', message: flash.error });
        }
    }, [flash.success, flash.error]);

    // Auto slide donation posters (bagian bawah)
    useEffect(() => {
        if (!donationPosters || donationPosters.length <= 1) return;
        const timer = setInterval(
            () => setCurrentDonationPoster((prev) => (prev + 1) % donationPosters.length),
            5000 // 5 detik
        );
        return () => clearInterval(timer);
    }, [donationPosters]);

    // Auto slide donor
    useEffect(() => {
        if (!donors.length) return;
        const timer = setInterval(
            () => setCurrentDonor((prev) => (prev + 1) % donors.length),
            4000
        );
        return () => clearInterval(timer);
    }, [donors.length]);

    const getVisibleDonors = () => {
    if (!donors || donors.length === 0) return [];

    const visible = [];
    const maxVisible = Math.min(3, donors.length);

    for (let i = 0; i < maxVisible; i++) {
        const idx = (currentDonor + i) % donors.length;
        visible.push(donors[idx]);
    }

    return visible;
};


    const handleCopy = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatRupiah = (number) => {
        if (!number) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    const handleNextStep = () => {
        // Cek minimal nama & nominal sebelum lanjut
        if (!data.name || !data.amount) {
            setToast({
                type: 'error',
                message: 'Isi minimal nama dan nominal donasi terlebih dahulu ya 🙂',
            });
            return;
        }
        setStep(2); // GANTI view ke langkah 2 (form langkah 1 hilang)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kirim info metode pembayaran (opsional, tidak divalidasi di backend)
        transform((formData) => ({
            ...formData,
            payment_method: paymentTab,
        }));

        post('/donasi', {
            onSuccess: () => {
                reset();
                setStep(1);
                setPaymentTab('qris');
            },
            forceFormData: true,
        });
    };

    const banks = paymentMethods.banks || [];
    const qrisSrc =
        paymentMethods.qris ||
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png';

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
            <Head title="Donasi" />
            <Navbar />

            {/* Toast popup */}
            <Toast
                type={toast.type}
                message={toast.message}
                onClose={() => setToast({ ...toast, message: '' })}
            />

            <main className="pt-20 md:pt-24 flex-1">
                {/* Hero / Poster dengan Text Overlay */}
                <section className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden bg-slate-900">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1200&auto=format&fit=crop"
                            alt="Donasi RISPOL"
                            className="h-full w-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>

                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
                        <span className="mb-3 md:mb-4 rounded-full bg-amber-500 px-3 md:px-4 py-1 text-xs md:text-sm font-bold text-white">
                            MARI BERBAGI
                        </span>
                        <h1 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-6xl font-serif font-bold text-white leading-tight">
                            Investasi Akhirat Terbaik
                        </h1>
                        <p className="max-w-2xl text-sm md:text-base lg:text-lg text-slate-200 px-4">
                            "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti
                            sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada
                            seratus biji." (QS. Al-Baqarah: 261)
                        </p>
                    </div>
                </section>

                <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
                    <div className="max-w-6xl mx-auto">
                        {/* ATAS: Form Donasi (Kiri) + Poster A4 (Kanan) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                            {/* KIRI: Form Donasi (Step 1 atau Step 2) */}
                            <div className="w-full">
                                {step === 1 ? (
                                    // LANGKAH 1: Form Donasi
                                    <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 md:p-8 shadow-xl h-full">
                                        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div>
                                                <h2 className="flex items-center gap-2 text-lg md:text-2xl font-bold text-slate-900">
                                                    <span className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                                        1
                                                    </span>
                                                    Isi Data Donasi
                                                </h2>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Langkah 1: Isi data diri dan nominal donasi.
                                                </p>
                                            </div>
                                        </div>

                                        <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                                            {/* Tujuan Donasi */}
                                            <div>
                                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                                    Tujuan Donasi
                                                </label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                                                    {campaigns.map((camp) => (
                                                        <button
                                                            key={camp.id}
                                                            type="button"
                                                            onClick={() => setData('campaign', camp.name)}
                                                            className={`rounded-lg md:rounded-xl border p-2.5 md:p-3 text-left text-xs md:text-sm transition-all ${
                                                                data.campaign === camp.name
                                                                    ? 'border-blue-500 bg-blue-50 font-bold text-blue-700'
                                                                    : 'border-slate-200 hover:border-blue-300'
                                                            }`}
                                                        >
                                                            {camp.name}
                                                        </button>
                                                    ))}
                                                </div>
                                                {errors.campaign && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.campaign}</p>
                                                )}
                                            </div>

                                            {/* Nama & Email */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                                <div>
                                                    <label className="mb-2 block text-sm font-bold text-slate-700">
                                                        Nama Lengkap
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        className="w-full rounded-lg md:rounded-xl border border-slate-200 px-3 md:px-4 py-2.5 md:py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                        placeholder="Hamba Allah"
                                                    />
                                                    {errors.name && (
                                                        <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-bold text-slate-700">
                                                        Email (Opsional)
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        className="w-full rounded-lg md:rounded-xl border border-slate-200 px-3 md:px-4 py-2.5 md:py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                        placeholder="email@contoh.com"
                                                    />
                                                    {errors.email && (
                                                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Nominal */}
                                            <div>
                                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                                    Nominal Donasi (Rp)
                                                </label>
                                                <div className="relative">
                                                    <span className="pointer-events-none absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                                                        Rp
                                                    </span>
                                                    <input
                                                        type="number"
                                                        value={data.amount}
                                                        onChange={(e) => setData('amount', e.target.value)}
                                                        className="w-full rounded-lg md:rounded-xl border border-slate-200 px-3 md:px-4 py-2.5 md:py-3 pl-10 md:pl-12 text-base md:text-lg font-bold outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                        placeholder="0"
                                                        min="10000"
                                                    />
                                                </div>
                                                {errors.amount && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.amount}</p>
                                                )}
                                                <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                                    {[10000, 20000, 50000, 100000, 500000].map((amt) => (
                                                        <button
                                                            key={amt}
                                                            type="button"
                                                            onClick={() => setData('amount', amt)}
                                                            className="whitespace-nowrap rounded-full border border-slate-200 px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium hover:bg-slate-100 flex-shrink-0"
                                                        >
                                                            {formatRupiah(amt)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Doa */}
                                            <div>
                                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                                    Doa & Harapan
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    className="w-full rounded-lg md:rounded-xl border border-slate-200 px-3 md:px-4 py-2.5 md:py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Tuliskan doa atau harapan Anda..."
                                                />
                                                {errors.message && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleNextStep}
                                                className="flex w-full items-center justify-center gap-2 rounded-lg md:rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700"
                                            >
                                                Lanjut ke Metode Pembayaran
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    // LANGKAH 2: Metode Pembayaran + Bukti
                                    <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 md:p-8 shadow-xl h-full">
                                        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div>
                                                <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold text-slate-900">
                                                    <span className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                                                        2
                                                    </span>
                                                    Pilih Metode Pembayaran
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Langkah 2: Pilih metode, lakukan transfer, lalu upload bukti transfer.
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="text-xs text-blue-600 hover:underline self-start sm:self-auto"
                                            >
                                                ← Kembali
                                            </button>
                                        </div>

                                        {/* Tabs */}
                                        <div className="mb-6 inline-flex rounded-full bg-slate-100 p-1 w-full sm:w-auto">
                                            <button
                                                type="button"
                                                onClick={() => setPaymentTab('qris')}
                                                className={`flex items-center justify-center gap-2 rounded-full px-3 md:px-4 py-2 text-xs font-semibold transition-all flex-1 sm:flex-initial ${
                                                    paymentTab === 'qris'
                                                        ? 'bg-white text-blue-600 shadow-sm'
                                                        : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                            >
                                                <QrCode size={16} />
                                                <span>QRIS</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPaymentTab('bank')}
                                                className={`ml-1 flex items-center justify-center gap-2 rounded-full px-3 md:px-4 py-2 text-xs font-semibold transition-all flex-1 sm:flex-initial ${
                                                    paymentTab === 'bank'
                                                        ? 'bg-white text-blue-600 shadow-sm'
                                                        : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                            >
                                                <CreditCard size={16} />
                                                <span>Transfer Bank</span>
                                            </button>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                            {/* Konten sesuai tab */}
                                            {paymentTab === 'qris' && (
                                                <div className="text-center">
                                                    <h4 className="mb-2 text-base font-bold text-slate-900">
                                                        Scan QRIS
                                                    </h4>
                                                    <p className="mb-4 text-xs text-slate-500 px-2">
                                                        Gunakan aplikasi e-wallet atau mobile banking untuk memindai kode QR di bawah ini.
                                                    </p>
                                                    <div className="inline-block rounded-xl border-2 border-slate-900 bg-white p-3 md:p-4">
                                                        <img
                                                            src={qrisSrc}
                                                            alt="QRIS Code"
                                                            className="h-40 w-40 md:h-48 md:w-48 object-contain"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {paymentTab === 'bank' && (
                                                <div>
                                                    <h4 className="mb-2 text-base font-bold text-slate-900">
                                                        Transfer ke Rekening
                                                    </h4>
                                                    <p className="mb-4 text-xs text-slate-500">
                                                        Pilih salah satu rekening dan lakukan transfer sesuai nominal.
                                                    </p>

                                                    {banks.length === 0 && (
                                                        <p className="text-sm text-slate-500">Rekening donasi belum diatur.</p>
                                                    )}

                                                    <div className="space-y-3 md:space-y-4">
                                                        {banks.map((bank, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="rounded-xl border border-slate-200 bg-slate-50 p-3 md:p-4 transition-colors hover:border-blue-300"
                                                            >
                                                                <div className="mb-2 flex items-center justify-between flex-wrap gap-2">
                                                                    <span className="text-base md:text-lg font-bold text-slate-800">
                                                                        {bank.bank}
                                                                    </span>
                                                                    <span className="rounded bg-slate-200 px-2 py-1 text-xs font-bold text-slate-600">
                                                                        {bank.holder}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2 md:p-3 gap-2">
                                                                    <span className="font-mono text-sm md:text-lg font-bold tracking-wide text-slate-700 break-all">
                                                                        {bank.number}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleCopy(bank.number, `bank-${idx}`)}
                                                                        className="rounded-md p-1.5 text-blue-600 transition-all hover:bg-blue-50 hover:text-blue-800 flex-shrink-0"
                                                                        title="Salin"
                                                                    >
                                                                        {copied === `bank-${idx}` ? (
                                                                            <Check size={18} />
                                                                        ) : (
                                                                            <Copy size={18} />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Upload bukti transfer */}
                                            <div>
                                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                                    Upload Bukti Transfer *
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setData('payment_proof', e.target.files[0])}
                                                    className="w-full rounded-lg border border-slate-200 px-3 md:px-4 py-2.5 md:py-3 text-sm outline-none focus:border-blue-500"
                                                    accept="image/*"
                                                    required
                                                />
                                                {errors.payment_proof && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.payment_proof}</p>
                                                )}
                                                <p className="mt-1 text-xs text-slate-400">
                                                    Format: JPG/PNG, maksimal 2MB.
                                                </p>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="flex w-full items-center justify-center gap-2 rounded-lg md:rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700 disabled:opacity-60"
                                            >
                                                <Heart size={18} />
                                                {processing ? 'Mengirim Donasi...' : 'Kirim Donasi'}
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>

                            {/* KANAN: Slider Poster A4 Donasi */}
                            <div className="w-full lg:sticky lg:top-24 lg:self-start">
                                {donationPosters && donationPosters.length > 0 && (
                                    <div className="flex justify-center">
                                        <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-slate-100 bg-white shadow-xl w-full max-w-md lg:max-w-xl">
                                            <div className="relative w-full" style={{ paddingBottom: '133.33%' }}>
                                                {donationPosters.map((poster, index) => (
                                                    <div
                                                        key={index}
                                                        className={`absolute inset-0 transition-opacity duration-1000 ${
                                                            index === currentDonationPoster ? 'opacity-100' : 'opacity-0'
                                                        }`}
                                                    >
                                                        <img
                                                            src={poster}
                                                            alt={`Poster Donasi ${index + 1}`}
                                                            className="absolute inset-0 w-full h-full object-contain bg-white p-2"
                                                        />
                                                    </div>
                                                ))}

                                                {donationPosters.length > 1 && (
                                                    <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
                                                        {donationPosters.map((_, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => setCurrentDonationPoster(idx)}
                                                                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                                                                    idx === currentDonationPoster
                                                                        ? 'w-6 md:w-8 bg-amber-500'
                                                                        : 'w-1.5 md:w-2 bg-slate-400/50 hover:bg-slate-600'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* BAWAH: Para Donatur (Kiri) + Jazakumullah (Kanan) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                            {/* KIRI BAWAH: Para Donatur */}
                            <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-xl min-h-[300px]">
                                <h3 className="mb-4 flex items-center gap-2 text-base md:text-lg font-bold text-slate-800">
                                    <Wallet className="text-emerald-500" size={20} /> Para Donatur
                                </h3>

                                {(!donors || donors.length === 0) && (
                                    <p className="text-sm text-slate-500">Belum ada donasi yang ditampilkan.</p>
                                )}

                                {donors && donors.length > 0 && (
                                    <div className="space-y-3 transition-all duration-500">
                                        {getVisibleDonors().map((donor, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 md:gap-4 rounded-lg md:rounded-xl border border-slate-100 bg-slate-50 p-3 md:p-4"
                                            >
                                                <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs md:text-sm font-bold text-blue-600">
                                                    {donor.name.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h4 className="text-sm font-bold text-slate-800 truncate">
                                                            {donor.name}
                                                        </h4>
                                                        <span className="text-xs md:text-sm font-bold text-emerald-600 whitespace-nowrap">
                                                            {new Intl.NumberFormat('id-ID', {
                                                                style: 'currency',
                                                                currency: 'IDR',
                                                                minimumFractionDigits: 0,
                                                            }).format(donor.amount)}
                                                        </span>
                                                    </div>
                                                    {donor.message && (
                                                        <p className="mt-1 line-clamp-2 text-xs italic text-slate-500">
                                                            "{donor.message}"
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* KANAN BAWAH: Jazakumullah Khairan */}
                            <div className="flex h-full justify-start">
                                <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 p-5 sm:p-6 text-white shadow-xl w-full min-h-[300px] flex flex-col justify-between">
                                    <div>
                                        <Quote className="absolute right-3 md:right-4 top-3 md:top-4 h-12 w-12 md:h-16 md:w-16 rotate-180 text-white/20" />
                                        <h3 className="relative z-10 mb-3 md:mb-4 text-xl md:text-2xl font-serif font-bold">
                                            Jazakumullah Khairan Katsiran
                                        </h3>
                                        <p className="relative z-10 leading-relaxed text-blue-100 text-sm md:text-base">
                                            Terima kasih atas donasi yang telah Anda berikan. Semoga Allah
                                            membalas kebaikan Anda dengan pahala yang berlipat ganda, menjadi
                                            amal jariyah, dan pembuka pintu rezeki yang berkah. Aamiin.
                                        </p>
                                    </div>
                                    <div className="relative z-10 mt-4 md:mt-6 flex items-center gap-3">
                                        <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/20 font-bold text-sm">
                                            R
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Pengurus RISPOL</p>
                                            <p className="text-xs text-blue-200">Politeknik Negeri Malang</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Hide scrollbar on mobile */}
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
