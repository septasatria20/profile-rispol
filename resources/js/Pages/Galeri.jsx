import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Image as ImageIcon, Calendar, ArrowRight } from 'lucide-react';

const GALERI_DATA = [
  { year: 2025, title: 'Dokumentasi Kegiatan 2025', desc: 'Kumpulan foto-foto kegiatan RISPOL di tahun 2025.', count: '20 Foto' },
  { year: 2024, title: 'Dokumentasi Kegiatan 2024', desc: 'Kumpulan foto-foto kegiatan RISPOL di tahun 2024.', count: '77 Foto' },
  { year: 2023, title: 'Dokumentasi Kegiatan 2023', desc: 'Arsip kegiatan tahun 2023.', count: '45 Foto' },
  { year: 2022, title: 'Dokumentasi Kegiatan 2022', desc: 'Jejak langkah kebangkitan kegiatan offline.', count: '60 Foto' },
];

export default function Galeri() {
    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-blue-500 selection:text-white">
            <Head title="Galeri" />
            <Navbar />
            
            {/* Header Section with Gradient */}
            <div className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 animate-fade-in">Jejak Langkah RISPOL</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto animate-slide-up">
                        Menyimpan kenangan dan momen berharga dalam setiap perjalanan dakwah kami.
                    </p>
                </div>
            </div>

            <div className="pb-32 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="relative space-y-16 pl-8 md:pl-0">
                        {/* Decorative Gradient Line */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-blue-600/50 to-transparent md:-translate-x-1/2"></div>

                        {GALERI_DATA.map((item, idx) => (
                            <div key={idx} className={`relative flex flex-col md:flex-row items-center md:justify-between group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                
                                {/* Timeline Dot */}
                                <div className="absolute -left-[11px] md:left-1/2 md:-translate-x-1/2 w-6 h-6 bg-slate-950 border-4 border-blue-600 rounded-full z-10 shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:scale-125 transition-transform duration-300"></div>

                                {/* Card */}
                                <div className={`w-full md:w-[45%] bg-slate-900 border border-slate-800 rounded-2xl p-1 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20 group-hover:-translate-y-2`}>
                                    <div className="bg-slate-900/50 p-6 rounded-xl h-full relative overflow-hidden">
                                        {/* Background Glow */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                        
                                        <div className="flex justify-between items-start mb-6 relative z-10">
                                            <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-2">
                                                <Calendar size={14} /> {item.year}
                                            </span>
                                            <div className="flex items-center text-xs text-slate-400 font-medium bg-slate-800 px-3 py-1 rounded-full">
                                                <ImageIcon size={14} className="mr-1.5 text-blue-400" /> {item.count}
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-2xl font-serif font-bold text-white mb-3 relative z-10">{item.title}</h3>
                                        <p className="text-slate-400 text-sm mb-8 leading-relaxed relative z-10">
                                            {item.desc}
                                        </p>
                                        
                                        <button className="w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-slate-700 hover:border-blue-500">
                                            Lihat Album <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                {/* Spacer for layout balance */}
                                <div className="hidden md:block w-[45%]"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
