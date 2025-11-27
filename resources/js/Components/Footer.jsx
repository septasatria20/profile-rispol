import React from 'react';
import { ChevronRight, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-16 mt-20 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid md:grid-cols-12 gap-12">
                    <div className="md:col-span-5 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/50">R</div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">RISPOL</h2>
                                <p className="text-xs text-slate-400 uppercase tracking-widest">Politeknik Negeri Malang</p>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed pr-8">
                            Membangun generasi intelektual muslim yang profesional, berakhlak mulia, dan berkontribusi nyata bagi umat dan bangsa.
                        </p>
                    </div>
                    <div className="md:col-span-3">
                        <h3 className="font-bold text-lg mb-6 text-blue-400">Jelajahi</h3>
                        <ul className="space-y-4 text-slate-300">
                            {['Tentang Kami', 'Program Kerja', 'Struktur Organisasi', 'Donasi', 'Kontak'].map((item) => (
                                <li key={item} className="hover:text-white hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2">
                                    <ChevronRight size={14} className="text-blue-500" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:col-span-4">
                        <h3 className="font-bold text-lg mb-6 text-blue-400">Sekretariat</h3>
                        <div className="space-y-4 text-slate-300">
                            <div className="flex items-start gap-3">
                                <MapPin className="shrink-0 text-blue-500 mt-1" size={20} />
                                <p>Gedung AS Polinemag<br />Kesekretariatan Rispol, Ruang: 2.01</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="shrink-0 text-blue-500" size={20} />
                                <p>rispol@polinema.ac.id</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="shrink-0 text-blue-500" size={20} />
                                <p>+62 822-3130-9515</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; 2025 UKM Kerohanian Islam Politeknik Negeri Malang.</p>
                    <p className="text-slate-600">https://github.com/septasatria20</p>
                </div>
            </div>
        </footer>
    );
}
