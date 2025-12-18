import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { ChevronRight, Play, CheckCircle, ArrowRight, ChevronLeft, X } from 'lucide-react';

export default function Home({ bidangs, prokers, news, heroImage, sliderImages = [], sliderTitles = [], youtubeLink, mentoringImage }) {
    // Slider State - Use dynamic slider images from backend
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedBerita, setSelectedBerita] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Default slider if no images from backend
    const GALLERY_SLIDER = sliderImages.length > 0 
        ? sliderImages.map((img, idx) => ({ 
            id: idx + 1, 
            image: `/storage/${img}`, 
            title: sliderTitles[idx] || `Dokumentasi Kegiatan ${idx + 1}` 
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

    const openBeritaModal = (berita) => {
        setSelectedBerita(berita);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeBeritaModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
        setTimeout(() => setSelectedBerita(null), 300);
    };

    const handleShareBerita = async () => {
        const shareData = {
            title: selectedBerita.title,
            text: `Baca berita terbaru dari RISPOL: ${selectedBerita.title}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert('Link berhasil disalin ke clipboard!');
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    };

    return (
        <div className="min-h-screen font-sans text-slate-800 bg-slate-50 selection:bg-blue-200 animate-fade-in overflow-hidden">
            <Head>
                <title>Beranda - RISPOL | Kerohanian Islam Politeknik Negeri Malang</title>
                <meta name="description" content="Kerohanian Islam Politeknik Negeri Malang - Wadah pembinaan karakter, ukhuwah islamiyah, dan pengembangan potensi mahasiswa muslim di Polinema." />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content="RISPOL - Kerohanian Islam Politeknik Negeri Malang" />
                <meta property="og:description" content="Satu-satunya organisasi Islam di Polinema. Bersama menebar manfaat di kampus." />
                <meta property="og:image" content={heroImage ? `${window.location.origin}/storage/${heroImage}` : `${window.location.origin}/images/rispol-og.jpg`} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={window.location.href} />
                <meta property="twitter:title" content="RISPOL - Kerohanian Islam Politeknik Negeri Malang" />
                <meta property="twitter:description" content="Satu-satunya organisasi Islam di Polinema. Bersama menebar manfaat di kampus." />
                <meta property="twitter:image" content={heroImage ? `${window.location.origin}/storage/${heroImage}` : `${window.location.origin}/images/rispol-og.jpg`} />
            </Head>

            <Navbar />

            <main>
                {/* 1. Hero Section */}
                <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden bg-slate-50">
                    {/* Background Blobs Animation */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 animate-blob"></div>
                        <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-emerald-100/50 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4 animate-blob animation-delay-2000"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10 w-full">
                        <div className="space-y-6 md:space-y-8 animate-slide-right">
                            <div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-4">
                                    Satu Satunya <br />
                                    Organisasi <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-serif italic">Islam</span> <br />
                                    di Polinema.
                                </h1>
                                <div className="h-1.5 md:h-2 w-24 md:w-32 bg-blue-600 rounded-full"></div>
                            </div>
                            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-lg">
                                Kerohanian Islam Politeknik hadir sebagai wadah pembinaan karakter, ukhuwah islamiyah, dan pengembangan potensi mahasiswa muslim di Politeknik Negeri Malang.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                <Link href="/program-kerja" className="group bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 text-sm md:text-base">
                                    Lihat Program <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30"><ChevronRight size={16} /></div>
                                </Link>
                                <Link href="/tentang-kami" className="px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-slate-700 border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all text-center text-sm md:text-base">
                                    Tentang Kami
                                </Link>
                            </div>
                        </div>
                        
                        {/* Image Hero - Hide on mobile */}
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

                {/* 2. Video Profile Section */}
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-slate-100 aspect-video bg-black">
                            <iframe 
                                className="w-full h-full"
                                src={youtubeLink || "https://www.youtube.com/embed/PqasWO3d-jc?si=4jp2XqGF9bvKORhs"} 
                                title="Profil RISPOL" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900">Wajah Dakwah Kampus</h2>
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                                Mengenal lebih dalam tentang semangat, visi, dan aktivitas Kerohanian Islam Politeknik Negeri Malang melalui lensa visual.
                            </p>
                            <a href="https://www.youtube.com/watch?v=PqasWO3d-jc" target="_blank" rel="noreferrer" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all text-sm md:text-base">
                                Tonton di YouTube <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* 2.5 Slider Section */}
                <section className="py-10 md:py-16 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">
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

                {/* 3. Bidang Section */}
                <section id="bidang" className="py-16 md:py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 md:mb-16">
                            <span className="text-blue-600 font-bold tracking-widest text-xs md:text-sm uppercase">Struktur Organisasi</span>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mt-2 mb-3 md:mb-4">Kenali Bidang RISPOL</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base px-4">Arahkan kursor pada kartu untuk melihat deskripsi bidang.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                            {bidangs && bidangs.map((bidang) => (
                                <div key={bidang.id} className="group h-96 perspective w-full cursor-pointer">
                                    <div className="relative w-full h-full duration-700 preserve-3d flip-card-inner">
                                        {/* Front Side */}
                                        <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white">
                                            {bidang.image ? (
                                                <div className="relative w-full h-full bg-white p-6 flex items-center justify-center">
                                                    <img src={`/storage/${bidang.image}`} alt={bidang.name} className="w-full h-full object-contain" />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent">
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
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Informasi & Berita</h2>
                                <p className="text-slate-500 mt-2 text-sm md:text-base">Update terkini kegiatan RISPOL</p>
                            </div>
                            <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all text-sm">
                                Lihat Semua <ArrowRight size={16} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                            {news && news.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer"
                                    onClick={() => openBeritaModal(item)}
                                >
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
                                        <button className="text-sm text-slate-500 font-medium hover:text-slate-800 flex items-center gap-1">
                                            Baca Selengkapnya <ChevronRight size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section Website Mentoring */}
                <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                                {/* Image Side */}
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                    <div className="relative bg-white p-4 rounded-3xl shadow-2xl">
                                        <img 
                                            src={mentoringImage ? `/storage/${mentoringImage}` : "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800"} 
                                            alt="Mentoring Polinema"
                                            className="w-full h-80 object-cover rounded-2xl"
                                        />
                                        <div className="absolute inset-4 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent rounded-2xl flex items-end p-8">
                                            <div className="text-white">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                                    <span className="text-sm font-bold">Program Wajib</span>
                                                </div>
                                                <h4 className="font-serif text-2xl font-bold">Portal Mentoring</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="space-y-6">
                                    <div>
                                        <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                                            Mentoring Keagamaan
                                        </span>
                                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                            Website Mentoring Polinema
                                        </h2>
                                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                            Sistem Informasi dan Pusat Layanan Mentoring Keagamaan Politeknik Negeri Malang. Kelola janji temu, penggantian, dan monitoring penugasan mentoringmu dengan mudah melalui platform digital kami.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <h4 className="font-bold text-slate-800">Janji Temu Semaumu</h4>
                                                <p className="text-sm text-slate-600">Ambil sertifikat mentoring dengan waktu pilihan</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <h4 className="font-bold text-slate-800">Ganti Sertifikatmu yang hilang</h4>
                                                <p className="text-sm text-slate-600">Penggantian sertifikat dengan Surat Keterangan/Kehilangan</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <h4 className="font-bold text-slate-800">Monitoring dan Ganti Progresmu yang kurang</h4>
                                                <p className="text-sm text-slate-600">Pantau penugasan dan progres mentoring Anda</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <a 
                                            href="https://simentorpolinema.com" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 group"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            Kunjungi Website Mentoring
                                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Modal Detail Berita */}
            {isModalOpen && selectedBerita && (
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={closeBeritaModal}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                        style={{ zIndex: 10000 }}
                    >
                        {/* Modal Header with Image */}
                        <div className="relative h-72 overflow-hidden rounded-t-3xl">
                            <img
                                src={selectedBerita.image ? `/storage/${selectedBerita.image}` : 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop'}
                                alt={selectedBerita.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            
                            <button
                                onClick={closeBeritaModal}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
                            >
                                <X size={20} className="text-slate-700" />
                            </button>
                            
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                                        Berita
                                    </div>
                                    <span className="text-white/90 text-sm font-medium">{selectedBerita.published_at}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                                    {selectedBerita.title}
                                </h2>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                                    {selectedBerita.content}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6 border-t border-slate-100 mt-8">
                                <button 
                                    onClick={closeBeritaModal}
                                    className="flex-1 py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                                >
                                    Tutup
                                </button>
                                <button 
                                    onClick={handleShareBerita}
                                    className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                >
                                    Bagikan Berita <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-slide-right { animation: slideRight 0.8s ease-out forwards; }
                .animate-slide-left { animation: slideLeft 0.8s ease-out forwards; }
                .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                
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
                @keyframes fadeIn { 
                    from { opacity: 0; } 
                    to { opacity: 1; } 
                }
            `}</style>
        </div>
    );
}