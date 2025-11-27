import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { CheckCircle, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const PENGURUS_INTI = [
  { name: 'Nasywa Asilah', role: 'Controller 1', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop' },
  { name: 'Rachel Makbul D.', role: 'Controller 2', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop' },
  { name: 'Hansen Tanjaya S.', role: 'Treasurer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
];

const PENGURUS_HARIAN = [
  { name: 'M. Irsyad Ramadhan', role: 'Dept. Keilmuan', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
  { name: 'Viola Valentina', role: 'Dept. Adkesma', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' },
  { name: 'Raisha Zaharani A.', role: 'Dept. Pengmas', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop' },
  { name: 'Dwi Septa', role: 'Dept. PSDM', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop' },
  { name: 'Siti Aminah', role: 'Dept. Medinfo', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
];

const BIDANG_DATA = [
  { id: 1, name: 'Mentoring', image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop', desc: 'Membimbing mahasiswa dalam pendalaman nilai-nilai Islam.' },
  { id: 2, name: 'Ketakmiran', image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop', desc: 'Memakmurkan masjid kampus dengan aktivitas ibadah.' },
  { id: 3, name: 'Syiar', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop', desc: 'Menyebarkan dakwah kreatif melalui event dan media.' },
  { id: 4, name: 'Humas', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop', desc: 'Jembatan komunikasi RISPOL dengan pihak luar.' },
  { id: 5, name: 'Kaderisasi', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop', desc: 'Sistem regenerasi organisasi untuk masa depan.' },
  { id: 6, name: 'Keputrian', image: 'https://images.unsplash.com/photo-1526233267232-262e33d0628e?q=80&w=600&auto=format&fit=crop', desc: 'Wadah aktualisasi diri khusus mahasiswi muslimah.' },
];

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

    return (
        <section className={`py-20 lg:py-32 ${bgColor} relative overflow-hidden`}>
             {/* Background Grid Pattern */}
            <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 gap-4 opacity-5 blur-sm scale-110 pointer-events-none">
                {members.slice(0, 16).map((m, i) => (
                    <div key={i} className="w-full aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${m.img})` }}></div>
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
                                            <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                        </div>
                                        <h3 className={`font-serif text-2xl font-bold mt-6 ${textColor === 'text-white' ? 'text-white' : 'text-slate-900'}`}>{p.name}</h3>
                                        <p className={`${textColor === 'text-white' ? 'text-slate-300' : 'text-slate-600'} text-lg mt-1`}>{p.role}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {totalSlides > 1 && (
                        <>
                            <button onClick={prev} className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-900 p-3 rounded-full shadow-md transition z-20">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={next} className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-900 p-3 rounded-full shadow-md transition z-20">
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default function TentangKami() {
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
                                Kami adalah Unit Kegiatan Mahasiswa (UKM) Kerohanian Islam di Politeknik Negeri Malang, wadah untuk mendalami Islam dan menebar manfaat bagi sesama.
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
                                        "Terwujudnya RISPOL sebagai UKM Islam yang profesional, inspiratif, dan kontributif dalam membentuk insan akademis yang berakhlak mulia dan bermanfaat bagi umat."
                                    </p>
                                </div>
                                
                                <div>
                                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-8">Misi Kami</h2>
                                    <div className="grid md:grid-cols-3 gap-6 text-left">
                                        {['Menyelenggarakan pembinaan keislaman yang intensif dan komprehensif.', 'Menjadi pusat syiar Islam yang kreatif dan inovatif di lingkungan kampus.', 'Memberikan pelayanan dan pengabdian kepada mahasiswa dan masyarakat.'].map((item, i) => (
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
                    members={PENGURUS_INTI} 
                    bgColor="bg-slate-900" 
                    textColor="text-white" 
                    cardBorderColor="border-slate-700"
                />

                {/* Pengurus Harian Slider */}
                <TeamCarousel 
                    title="" 
                    subtitle="Pengurus Harian" 
                    members={PENGURUS_HARIAN} 
                    bgColor="bg-slate-50" 
                    textColor="text-slate-900" 
                    cardBorderColor="border-slate-200"
                />

                {/* Bidang Grid */}
                <section className="py-20 lg:py-32 bg-white border-t border-slate-100">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">Bidang Kami</h2>
                            <p className="text-slate-600 text-lg mt-4 leading-relaxed">Enam pilar utama yang menggerakkan roda dakwah dan pelayanan di RISPOL.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
                            {BIDANG_DATA.map((bidang) => (
                                <div key={bidang.id} className="group block rounded-2xl shadow-xl overflow-hidden bg-slate-900 relative cursor-pointer h-80">
                                    <img src={bidang.image} alt={bidang.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60" />
                                    
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
