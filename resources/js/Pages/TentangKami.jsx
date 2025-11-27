import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { CheckCircle, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const TeamCarousel = ({ title, subtitle, members, bgColor, textColor, cardBorderColor }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = 3;
    const totalSlides = Math.ceil(members.length / itemsPerSlide);

    useEffect(() => {
        if (totalSlides <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(timer);
    }, [totalSlides]);

    const next = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

    if (members.length === 0) return null;

    return (
        <section className={`py-20 lg:py-32 ${bgColor} relative overflow-hidden`}>
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 gap-4 opacity-5 blur-sm scale-110 pointer-events-none">
                {members.slice(0, 16).map((m, i) => (
                    <div key={i} className="w-full aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${m.photo ? `/storage/${m.photo}` : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300'})` }}></div>
                ))}
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    {title && <h2 className={`font-serif text-3xl md:text-4xl font-bold ${textColor === 'text-white' ? 'text-white' : 'text-slate-900'}`}>{title}</h2>}
                    <p className={`font-sans text-2xl font-semibold mt-2 ${textColor === 'text-white' ? 'text-slate-400' : 'text-blue-600'}`}>{subtitle}</p>
                </div>

                <div className="relative overflow-hidden">
                    <div 
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                            <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4">
                                {members.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((p, i) => (
                                    <div key={i} className="flex flex-col items-center text-center group">
                                        <div className={`relative w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 ${cardBorderColor} transition-transform duration-500 group-hover:-translate-y-2`}>
                                            <img 
                                                src={p.photo ? `/storage/${p.photo}` : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300'} 
                                                alt={p.name} 
                                                className="w-full h-full object-cover" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                        </div>
                                        <h3 className={`font-serif text-2xl font-bold mt-6 ${textColor === 'text-white' ? 'text-white' : 'text-slate-900'}`}>{p.name}</h3>
                                        <p className={`${textColor === 'text-white' ? 'text-slate-300' : 'text-slate-600'} text-lg mt-1`}>{p.position}</p>
                                        {p.nim && <p className={`text-sm ${textColor === 'text-white' ? 'text-slate-400' : 'text-slate-500'}`}>{p.nim} - {p.prodi}</p>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {totalSlides > 1 && (
                        <>
                            <button onClick={prev} className="absolute left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-900 p-3 rounded-full shadow-md transition z-20">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={next} className="absolute right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-900 p-3 rounded-full shadow-md transition z-20">
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default function TentangKami({ visiMisi = {}, bidangs = [], pengurusInti = [], pengurusHarian = [] }) {
    // Parse misi menjadi array jika dalam format string dengan line breaks
    const misiArray = visiMisi.misi ? visiMisi.misi.split('\n').filter(m => m.trim()) : [
        'Menyelenggarakan pembinaan keislaman yang intensif dan komprehensif.',
        'Menjadi pusat syiar Islam yang kreatif dan inovatif di lingkungan kampus.',
        'Memberikan pelayanan dan pengabdian kepada mahasiswa dan masyarakat.'
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            <Head title="Tentang Kami" />
            <Navbar />
            
            <main>
                {/* Hero / Intro */}
                <section className="py-20 lg:py-32 bg-slate-50 overflow-hidden pt-32 border-b border-slate-200">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto">
                            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">Tentang Kami</h1>
                            <p className="text-lg text-slate-600 mt-6 leading-relaxed">
                                {visiMisi.sejarah || 'Kami adalah Unit Kegiatan Mahasiswa (UKM) Kerohanian Islam di Politeknik Negeri Malang, wadah untuk mendalami Islam dan menebar manfaat bagi sesama.'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Visi Misi Section */}
                <section className="py-20 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-5xl mx-auto text-center">
                            <div className="animate-slide-up space-y-16">
                                <div>
                                    <span className="font-sans text-blue-600 font-bold uppercase tracking-wider text-sm">Who We Are</span>
                                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mt-3">Visi Kami</h2>
                                    <p className="text-slate-600 text-xl mt-6 leading-relaxed max-w-3xl mx-auto">
                                        {visiMisi.visi || '"Terwujudnya RISPOL sebagai UKM Islam yang profesional, inspiratif, dan kontributif dalam membentuk insan akademis yang berakhlak mulia dan bermanfaat bagi umat."'}
                                    </p>
                                </div>
                                
                                <div>
                                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-8">Misi Kami</h2>
                                    <div className="grid md:grid-cols-3 gap-6 text-left">
                                        {misiArray.slice(0, 3).map((item, i) => (
                                            <div key={i} className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow hover:border-blue-200">
                                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                                    <CheckCircle size={20} />
                                                </div>
                                                <p className="text-slate-700 text-lg leading-relaxed">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pengurus Inti Slider */}
                <TeamCarousel 
                    title="Our Team" 
                    subtitle="Pengurus Inti" 
                    members={pengurusInti} 
                    bgColor="bg-slate-900" 
                    textColor="text-white" 
                    cardBorderColor="border-slate-700"
                />

                {/* Pengurus Harian Slider */}
                <TeamCarousel 
                    title="" 
                    subtitle="Pengurus Harian" 
                    members={pengurusHarian} 
                    bgColor="bg-slate-50" 
                    textColor="text-slate-900" 
                    cardBorderColor="border-slate-200"
                />

                {/* Bidang Grid - Dynamic from Database */}
                <section className="py-20 lg:py-32 bg-white border-t border-slate-100">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">Bidang Kami</h2>
                            <p className="text-slate-600 text-lg mt-4 leading-relaxed">Enam pilar utama yang menggerakkan roda dakwah dan pelayanan di RISPOL.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
                            {bidangs.map((bidang) => (
                                <div key={bidang.id} className="group block rounded-2xl shadow-xl overflow-hidden bg-slate-900 relative cursor-pointer h-80">
                                    <img 
                                        src={bidang.image ? `/storage/${bidang.image}` : 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600'} 
                                        alt={bidang.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60" 
                                    />
                                    
                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center z-10">
                                        <span className="font-sans text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">Bidang</span>
                                        <h3 className="font-serif text-4xl font-bold text-white mb-6">{bidang.name}</h3>
                                        
                                        <div className="inline-flex items-center gap-2 text-white font-bold border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                                            Selengkapnya <ArrowRight size={16} />
                                        </div>
                                    </div>
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/30 pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
