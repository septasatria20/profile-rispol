import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Copy, Check, Heart, CreditCard, Wallet, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Donasi({ campaigns, paymentMethods, donors, posters }) {
    // State for Poster Slider
    const [currentPoster, setCurrentPoster] = useState(0);
    
    // State for Donor Ticker
    const [currentDonor, setCurrentDonor] = useState(0);

    // State for Form
    const [form, setForm] = useState({
        campaign_id: campaigns[0]?.id || '',
        name: '',
        email: '',
        amount: '',
        message: ''
    });
    const [copied, setCopied] = useState(null);

    // Poster Auto Slide (6 seconds)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPoster((prev) => (prev + 1) % posters.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [posters.length]);

    // Donor Ticker Auto Slide (4 seconds)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDonor((prev) => (prev + 1) % donors.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [donors.length]);

    const handleCopy = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Head title="Donasi" />
            <Navbar />

            <main className="pt-24">
                {/* 1. Poster Slider Section */}
                <section className="relative w-full h-[400px] md:h-[500px] bg-slate-900 overflow-hidden">
                    {posters.map((poster, index) => (
                        <div 
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentPoster ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img src={poster} alt={`Poster ${index + 1}`} className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                        </div>
                    ))}
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
                        <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 animate-fade-in">MARI BERBAGI</span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-slide-up">Investasi Akhirat Terbaik</h1>
                        <p className="text-slate-200 text-lg max-w-2xl animate-slide-up">
                            "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji." (QS. Al-Baqarah: 261)
                        </p>
                    </div>

                    {/* Slider Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {posters.map((_, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setCurrentPoster(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentPoster ? 'w-8 bg-amber-500' : 'w-2 bg-white/50 hover:bg-white'}`}
                            />
                        ))}
                    </div>
                </section>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-12 gap-12">
                        
                        {/* 2. Donation Form (Left) */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Heart className="text-red-500 fill-red-500" /> Isi Formulir Donasi
                                </h2>
                                
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Tujuan Donasi</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {campaigns.map((camp) => (
                                                <div 
                                                    key={camp.id}
                                                    onClick={() => setForm({...form, campaign_id: camp.id})}
                                                    className={`p-3 rounded-xl border cursor-pointer transition-all ${form.campaign_id === camp.id ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold' : 'border-slate-200 hover:border-blue-300'}`}
                                                >
                                                    {camp.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                                            <input 
                                                type="text" 
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                                placeholder="Hamba Allah"
                                                value={form.name}
                                                onChange={e => setForm({...form, name: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Email (Opsional)</label>
                                            <input 
                                                type="email" 
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                                placeholder="email@contoh.com"
                                                value={form.email}
                                                onChange={e => setForm({...form, email: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Nominal Donasi (Rp)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                                            <input 
                                                type="number" 
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-bold text-lg"
                                                placeholder="0"
                                                value={form.amount}
                                                onChange={e => setForm({...form, amount: e.target.value})}
                                            />
                                        </div>
                                        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                                            {[10000, 20000, 50000, 100000, 500000].map(amt => (
                                                <button 
                                                    key={amt}
                                                    type="button"
                                                    onClick={() => setForm({...form, amount: amt})}
                                                    className="px-4 py-1.5 rounded-full border border-slate-200 text-sm font-medium hover:bg-slate-100 whitespace-nowrap"
                                                >
                                                    {formatRupiah(amt)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Doa & Harapan</label>
                                        <textarea 
                                            rows="3"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                            placeholder="Tuliskan doa atau harapan Anda..."
                                            value={form.message}
                                            onChange={e => setForm({...form, message: e.target.value})}
                                        ></textarea>
                                    </div>

                                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                                        Lanjut Pembayaran
                                    </button>
                                </form>
                            </div>

                            {/* Recent Donors Ticker */}
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 overflow-hidden relative">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Wallet className="text-emerald-500" size={20} /> Para Donatur
                                </h3>
                                
                                <div className="relative h-24">
                                    {donors.map((donor, index) => (
                                        <div 
                                            key={index}
                                            className={`absolute w-full transition-all duration-700 ease-in-out transform ${
                                                index === currentDonor 
                                                    ? 'opacity-100 translate-y-0' 
                                                    : 'opacity-0 translate-y-8'
                                            }`}
                                        >
                                            <div className="flex items-start gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
                                                    {donor.name.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-slate-800">{donor.name}</h4>
                                                        <span className="text-emerald-600 font-bold text-sm">{formatRupiah(donor.amount)}</span>
                                                    </div>
                                                    <p className="text-slate-500 text-sm mt-1 italic line-clamp-1">"{donor.message}"</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment Info (Right) */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* QRIS Card */}
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Scan QRIS</h3>
                                <p className="text-slate-500 text-sm mb-6">Mendukung semua e-wallet & mobile banking</p>
                                
                                <div className="bg-white p-4 rounded-xl border-2 border-slate-900 inline-block mb-6">
                                    <img src={paymentMethods.qris} alt="QRIS Code" className="w-48 h-48 object-contain" />
                                </div>
                                
                                <div className="flex justify-center gap-4 opacity-60 grayscale">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_OVO_purple.svg/1200px-Logo_OVO_purple.svg.png" className="h-6" alt="OVO" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1200px-Logo_dana_blue.svg.png" className="h-6" alt="DANA" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/1200px-Gopay_logo.svg.png" className="h-6" alt="GoPay" />
                                </div>
                            </div>

                            {/* Bank Transfer */}
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <CreditCard className="text-blue-600" /> Transfer Bank
                                </h3>
                                
                                <div className="space-y-4">
                                    {paymentMethods.banks.map((bank, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors bg-slate-50">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-bold text-slate-800 text-lg">{bank.bank}</span>
                                                <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded">{bank.holder}</span>
                                            </div>
                                            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                                                <span className="font-mono font-bold text-slate-700 text-lg tracking-wide">{bank.number}</span>
                                                <button 
                                                    onClick={() => handleCopy(bank.number, `bank-${idx}`)}
                                                    className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded-md transition-all"
                                                    title="Salin Nomor Rekening"
                                                >
                                                    {copied === `bank-${idx}` ? <Check size={18} /> : <Copy size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Thank You Note */}
                            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
                                <Quote className="absolute top-4 right-4 text-white/20 w-16 h-16 rotate-180" />
                                <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Jazakumullah Khairan Katsiran</h3>
                                <p className="text-blue-100 leading-relaxed relative z-10">
                                    Terima kasih atas donasi yang telah Anda berikan. Semoga Allah membalas kebaikan Anda dengan pahala yang berlipat ganda, menjadi amal jariyah, dan pembuka pintu rezeki yang berkah. Aamiin.
                                </p>
                                <div className="mt-6 flex items-center gap-3 relative z-10">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">R</div>
                                    <div>
                                        <p className="font-bold text-sm">Pengurus RISPOL</p>
                                        <p className="text-xs text-blue-200">Politeknik Negeri Malang</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
