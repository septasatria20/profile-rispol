import React from 'react';
import { ChevronRight, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-12 md:pt-16 mt-12 md:mt-20 border-t border-slate-800">
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        {/* Logo + Deskripsi */}
                        <div className="md:col-span-5 space-y-4 md:space-y-6">
                            <Link href="/" className="flex items-center gap-3">
                                <img 
                                    src="/logo.png" 
                                    alt="RISPOL Logo" 
                                    className="w-12 h-16 md:w-15 md:h-20 object-contain"
                                />
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">RISPOL</h2>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest">
                                        Politeknik Negeri Malang
                                    </p>
                                </div>
                            </Link>

                            <p className="text-slate-300 leading-relaxed text-sm md:text-base md:pr-8">
                                Membangun generasi intelektual muslim yang profesional, berakhlak mulia,
                                dan berkontribusi nyata bagi umat dan bangsa.
                            </p>
                        </div>

                        {/* Menu Jelajahi */}
                        <div className="md:col-span-3">
                            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-blue-400">Jelajahi</h3>
                            <ul className="space-y-3 md:space-y-4 text-slate-300 text-sm md:text-base">
                                <li className="hover:text-white hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2">
                                    <ChevronRight size={14} className="text-blue-500 flex-shrink-0" />
                                    <Link href="/tentang-kami">Tentang Kami</Link>
                                </li>
                                <li className="hover:text-white hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2">
                                    <ChevronRight size={14} className="text-blue-500 flex-shrink-0" />
                                    <Link href="/program-kerja">Program Kerja</Link>
                                </li>
                                <li className="hover:text-white hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2">
                                    <ChevronRight size={14} className="text-blue-500 flex-shrink-0" />
                                    <Link href="/struktur-organisasi">Struktur Organisasi</Link>
                                </li>
                                <li className="hover:text-white hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2">
                                    <ChevronRight size={14} className="text-blue-500 flex-shrink-0" />
                                    <Link href="/donasi">Donasi</Link>
                                </li>
                                <li className="hover:text-white hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2">
                                    <ChevronRight size={14} className="text-blue-500 flex-shrink-0" />
                                    <Link href="/kontak">Kontak</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Sekretariat */}
                        <div className="md:col-span-4">
                            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-blue-400">Sekretariat</h3>
                            <div className="space-y-3 md:space-y-4 text-slate-300 text-sm md:text-base">
                                <div className="flex items-start gap-3">
                                    <MapPin className="shrink-0 text-blue-500 mt-1" size={18} />
                                    <p className="text-sm md:text-base">
                                        Gedung AS Polinema<br />
                                        Kesekretariatan Rispol, Ruang: 2.01
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="shrink-0 text-blue-500" size={18} />
                                    <p className="text-sm md:text-base break-all">rispol@polinema.ac.id</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="shrink-0 text-blue-500" size={18} />
                                    <p className="text-sm md:text-base">+62 822-3130-9515</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 mt-8 md:mt-16 pt-6 md:pt-8 text-center text-slate-500 text-xs md:text-sm flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                        <p className="text-center md:text-left">&copy; 2025 UKM Kerohanian Islam Politeknik Negeri Malang.</p>
                        <p className="text-slate-600 text-xs">https://github.com/septasatria20</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
