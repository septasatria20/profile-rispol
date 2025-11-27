import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { ChevronRight, Play, CheckCircle, ArrowRight, ChevronLeft } from 'lucide-react';

export default function Home({ bidangs, prokers, news, heroImage, sliderImages = [], youtubeLink }) {
    // Slider State - Use dynamic slider images from backend
    const [currentSlide, setCurrentSlide] = useState(0);

    // Default slider if no images from backend
    const GALLERY_SLIDER = sliderImages.length > 0 
        ? sliderImages.map((img, idx) => ({ 
            id: idx + 1, 
            image: `/storage/${img}`, 
            title: `Dokumentasi Kegiatan ${idx + 1}` 
        }))
        : [
            { id: 1, image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop', title: 'Foto Bersama Pengurus 2024' },
            { id: 2, image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop', title: 'Kegiatan Mentoring Akbar' },
            { id: 3, image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop', title: 'Rapat Kerja Wilayah' },
        ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % GALLERY_SLIDER.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % GALLERY_SLIDER.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + GALLERY_SLIDER.length) % GALLERY_SLIDER.length);

    return (
        <div className="min-h-screen font-sans text-slate-800 bg-slate-50 selection:bg-blue-200 animate-fade-in overflow-hidden">
            <Head title="Beranda" />
            <Navbar />

            <main>
                {/* 1. Hero Section */}
                <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
                    {/* Background Blobs Animation */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 animate-blob"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4 animate-blob animation-delay-2000"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="space-y-8 animate-slide-right">
                            <div>
                                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-4">
                                    Satu Satunya <br />
                                    Organisasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-serif italic">Islam</span> <br />
                                    di Polinema.
                                </h1>
                                <div className="h-2 w-32 bg-blue-600 rounded-full"></div>
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                                Kerohanian Islam Politeknik Negeri Malang hadir sebagai wadah pembinaan karakter, ukhuwah islamiyah, dan pengembangan potensi mahasiswa muslim di Politeknik Negeri Malang.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/program-kerja" className="group bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-3">
                                    Lihat Program <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30"><ChevronRight size={16} /></div>
                                </Link>
                                <Link href="/tentang-kami" className="px-8 py-4 rounded-full font-bold text-slate-700 border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all">
                                    Tentang Kami
                                </Link>
                            </div>
                        </div>
                        
                        {/* Image Hero with Frame - Dynamic from Backend */}
                        <div className="relative hidden md:block animate-slide-left">
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700 border-8 border-white">
                                <img 
                                    src={heroImage ? `/storage/${heroImage}` : "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop"} 
                                    alt="Kegiatan Rispol" 
                                    className="w-full h-[500px] object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <p className="font-bold text-xl mb-1">Ukhuwah Islamiyah</p>
                                        <p className="text-sm text-slate-300">Bersama menebar manfaat di kampus.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Dots Pattern */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 opacity-20" style={{backgroundImage: 'radial-gradient(#2563EB 2px, transparent 2px)', backgroundSize: '12px 12px'}}></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 opacity-20" style={{backgroundImage: 'radial-gradient(#059669 2px, transparent 2px)', backgroundSize: '12px 12px'}}></div>
                        </div>
                    </div>
                </section>

                {/* 2. Video Profile Section - Dynamic YouTube Link */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 aspect-video bg-black">
                            <iframe 
                                className="w-full h-full"
                                src={youtubeLink || "https://www.youtube.com/embed/PqasWO3d-jc?si=4jp2XqGF9bvKORhs"} 
                                title="Profil RISPOL" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-4xl font-serif font-bold text-slate-900">Wajah Dakwah Kampus</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Mengenal lebih dalam tentang semangat, visi, dan aktivitas Kerohanian Islam Politeknik Negeri Malang melalui lensa visual. Temukan inspirasi di setiap kegiatan kami.
                            </p>
                            <a href="https://www.youtube.com/watch?v=PqasWO3d-jc" target="_blank" rel="noreferrer" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                                Tonton di YouTube <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* 2.5 New Slider Section - Dynamic from Backend */}
                <section className="py-16 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                            {GALLERY_SLIDER.map((slide, index) => (
                                <div 
                                    key={slide.id}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8 md:p-12">
                                        <h3 className="text-white text-2xl md:text-4xl font-bold mb-2">{slide.title}</h3>
                                        <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Navigation Buttons */}
                            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100">
                                <ChevronRight size={24} />
                            </button>

                            {/* Indicators */}
                            <div className="absolute bottom-6 right-6 flex gap-2">
                                {GALLERY_SLIDER.map((_, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-white/50 hover:bg-white'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Bidang Section (Flip Cards) */}
                <section id="bidang" className="py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">Struktur Organisasi</span>
                            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Kenali Bidang RISPOL</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">Arahkan kursor pada kartu untuk melihat deskripsi bidang.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {bidangs && bidangs.map((bidang) => (
                                <div key={bidang.id} className="group h-80 perspective w-full cursor-pointer">
                                    <div className="relative w-full h-full duration-700 preserve-3d flip-card-inner">
                                        {/* Front Side */}
                                        <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white">
                                            {bidang.image ? (
                                                <img src={`/storage/${bidang.image}`} alt={bidang.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
                                            <div className="absolute bottom-6 left-6">
                                                <h3 className="text-2xl font-bold text-white">{bidang.name}</h3>
                                                <div className="h-1 w-12 bg-blue-500 rounded-full mt-2"></div>
                                            </div>
                                        </div>

                                        {/* Back Side */}
                                        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-xl bg-slate-900 p-8 flex flex-col justify-center items-center text-center border-2 border-blue-600">
                                            <h3 className="text-2xl font-bold text-white mb-3">{bidang.name}</h3>
                                            <p className="text-slate-300 text-sm mb-6 leading-relaxed">{bidang.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. News & Updates */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">Informasi & Berita</h2>
                                <p className="text-slate-500 mt-2">Update terkini kegiatan RISPOL</p>
                            </div>
                            <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">Lihat Semua <ArrowRight size={16} /></button>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {news && news.map((item) => (
                                <div key={item.id} className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all">
                                    <div className="h-48 overflow-hidden">
                                        <img 
                                            src={item.image ? `/storage/${item.image}` : 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop'} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-xs font-bold text-blue-600 mb-2 block">{item.published_at}</span>
                                        <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{item.title}</h3>
                                        <button className="text-sm text-slate-500 font-medium hover:text-slate-800 flex items-center gap-1">Baca Selengkapnya <ChevronRight size={12} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            
            {/* Global CSS Styles for Animations */}
            <style jsx global>{`
                .perspective {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
                .group:hover .flip-card-inner {
                    transform: rotateY(180deg);
                }
                
                @keyframes slideRight {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideLeft {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-slide-right { animation: slideRight 0.8s ease-out forwards; }
                .animate-slide-left { animation: slideLeft 0.8s ease-out forwards; }
                
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
