import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Phone, User, Share2 } from 'lucide-react';

export default function Kontak() {
    return (
        <div className="min-h-screen bg-slate-50 animate-fade-in">
            <Head title="Kontak" />
            <Navbar />
            
            <div className="pt-24 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Get in Touch</h1>
                        <p className="text-lg text-slate-500">We would love to hear from you</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl">
                        <div className="p-10 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
                                <p className="text-slate-300 mb-12">
                                    Jangan ragu untuk menghubungi kami. Tim kami siap membantu menjawab pertanyaan seputar RISPOL.
                                </p>
                                
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-blue-400">
                                            <Phone />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Humas (Informasi)</h3>
                                            <p className="text-slate-400 font-mono">0822-3130-9515</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-emerald-400">
                                            <User />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Mentoring Keagamaan</h3>
                                            <p className="text-slate-400 font-mono">0896-8290-1717</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-orange-400">
                                            <Share2 />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Litbang (Inventaris)</h3>
                                            <p className="text-slate-400 font-mono">0895-3370-44145</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
                        </div>

                        <div className="p-10">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Kirim Pesan</h2>
                            <form className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">Nama</label>
                                        <input type="text" className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Nama Anda" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">Email</label>
                                        <input type="email" className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="email@contoh.com" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Subjek</label>
                                    <input type="text" className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Perihal pesan" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Pesan</label>
                                    <textarea rows="4" className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Tulis pesan Anda disini..."></textarea>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                                    Kirim Sekarang
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
