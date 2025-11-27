import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Image as ImageIcon, Calendar, ArrowRight } from 'lucide-react';

// Fallback kalau belum ada data di DB
const FALLBACK_GALERI = [
    {
        year: 2025,
        title: 'Dokumentasi Kegiatan 2025',
        desc: 'Kumpulan foto-foto kegiatan RISPOL di tahun 2025.',
        count: '20 Foto',
        link: '#',
    },
    {
        year: 2024,
        title: 'Dokumentasi Kegiatan 2024',
        desc: 'Kumpulan foto-foto kegiatan RISPOL di tahun 2024.',
        count: '77 Foto',
        link: '#',
    },
];

export default function Galeri({ galeris = [] }) {
    // Normalisasi data dari backend
    const albums =
        galeris && galeris.length > 0
            ? galeris.map((g) => ({
                  id: g.id,
                  year: g.year,
                  title: g.title,
                  desc:
                      g.description ||
                      'Dokumentasi kegiatan RISPOL pada tahun ini.',
                  count: g.photo_count
                      ? `${g.photo_count} Foto`
                      : null,
                  link: g.drive_link,
                  thumbnail: g.thumbnail
                      ? `/storage/${g.thumbnail}`
                      : null,
              }))
            : FALLBACK_GALERI;

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-blue-500 selection:text-white">
            <Head title="Galeri" />
            <Navbar />

            {/* Header Section with Gradient */}
            <div className="relative overflow-hidden px-4 pb-20 pt-32">
                <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="mb-6 animate-fade-in text-4xl font-serif font-bold text-white md:text-5xl">
                        Jejak Langkah RISPOL
                    </h1>
                    <p className="mx-auto max-w-2xl animate-slide-up text-lg text-slate-400">
                        Menyimpan kenangan dan momen berharga dalam setiap
                        perjalanan dakwah kami.
                    </p>
                </div>
            </div>

            <div className="px-4 pb-32">
                <div className="mx-auto max-w-5xl">
                    <div className="relative space-y-16 pl-8 md:pl-0">
                        {/* Decorative Gradient Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-blue-600/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

                        {albums.map((item, idx) => (
                            <div
                                key={item.id ?? idx}
                                className={`group relative flex flex-col items-center md:flex-row md:justify-between ${
                                    idx % 2 === 0
                                        ? 'md:flex-row-reverse'
                                        : ''
                                }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute -left-[11px] z-10 h-6 w-6 rounded-full border-4 border-blue-600 bg-slate-950 shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-transform duration-300 group-hover:scale-125 md:left-1/2 md:-translate-x-1/2" />

                                {/* Card */}
                                <div
                                    className={`w-full md:w-[45%] rounded-2xl border border-slate-800 bg-slate-900 p-1 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20`}
                                >
                                    <div className="relative h-full rounded-xl bg-slate-900/50 p-6 overflow-hidden">
                                        {/* Background Glow */}
                                        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

                                        <div className="relative z-10 mb-6 flex items-start justify-between">
                                            <span className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/20 px-4 py-1.5 text-sm font-bold text-blue-400">
                                                <Calendar size={14} />{' '}
                                                {item.year}
                                            </span>
                                            <div className="flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
                                                <ImageIcon
                                                    size={14}
                                                    className="mr-1.5 text-blue-400"
                                                />{' '}
                                                {item.count ?? 'Album'}
                                            </div>
                                        </div>

                                        <h3 className="relative z-10 mb-3 text-2xl font-serif font-bold text-white">
                                            {item.title}
                                        </h3>
                                        <p className="relative z-10 mb-4 text-sm leading-relaxed text-slate-400">
                                            {item.desc}
                                        </p>

                                        {/* Link Drive sebagai badge kecil dengan "shadow" */}
                                        {item.link && (
                                            <p className="relative z-10 mb-4 break-all rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-[11px] text-slate-400 shadow-inner">
                                                {item.link}
                                            </p>
                                        )}

                                        {item.link ? (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/btn relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-3 font-bold text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-600"
                                            >
                                                Lihat Album{' '}
                                                <ArrowRight
                                                    size={18}
                                                    className="transition-transform group-hover/btn:translate-x-1"
                                                />
                                            </a>
                                        ) : (
                                            <button
                                                type="button"
                                                disabled
                                                className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-800/70 py-3 text-sm font-bold text-slate-500"
                                            >
                                                Album belum tersedia
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Spacer for layout balance */}
                                <div className="hidden w-[45%] md:block" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
