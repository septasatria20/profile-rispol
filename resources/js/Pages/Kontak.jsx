import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Phone, User, Share2 } from 'lucide-react';

export default function Kontak() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/kontak', {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 animate-fade-in">
            <Head title="Kontak" />
            <Navbar />

            <div className="pt-24 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-slate-500">
                            We would love to hear from you
                        </p>
                    </div>

                    {/* Notifikasi sukses */}
                    {flash?.success && (
                        <div className="max-w-3xl mx-auto mb-6">
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-sm">
                                {flash.success}
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl">
                        {/* Kolom kiri: info kontak */}
                        <div className="p-10 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold mb-6">
                                    Informasi Kontak
                                </h2>
                                <p className="text-slate-300 mb-12">
                                    Jangan ragu untuk menghubungi kami. Tim kami
                                    siap membantu menjawab pertanyaan seputar
                                    RISPOL.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-blue-400">
                                            <Phone />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">
                                                Humas (Informasi)
                                            </h3>
                                            <p className="text-slate-400 font-mono">
                                                0822-3130-9515
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-emerald-400">
                                            <User />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">
                                                Mentoring Keagamaan
                                            </h3>
                                            <p className="text-slate-400 font-mono">
                                                0896-8290-1717
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-orange-400">
                                            <Share2 />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">
                                                Litbang (Inventaris)
                                            </h3>
                                            <p className="text-slate-400 font-mono">
                                                0895-3370-44145
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
                        </div>

                        {/* Kolom kanan: form kontak */}
                        <div className="p-10">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                                Kirim Pesan
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">
                                            Nama
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="Nama Anda"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">
                                            Email (Opsional)
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="contoh@rohispolinema.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Nomor WhatsApp / Telepon (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="08xx..."
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Pesan
                                    </label>
                                    <textarea
                                        rows="4"
                                        className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="Tulis pesan Anda disini..."
                                        value={data.message}
                                        onChange={(e) =>
                                            setData('message', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {processing
                                        ? 'Mengirim...'
                                        : 'Kirim Sekarang'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
