import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Search, Calendar, ArrowRight, Filter } from 'lucide-react';

export default function Proker({ prokers, filters, bidangs }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedBidang, setSelectedBidang] = useState(filters.bidang || 'Semua');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/program-kerja', { search, bidang: selectedBidang }, { preserveState: true });
    };

    const handleFilter = (bidang) => {
        setSelectedBidang(bidang);
        router.get('/program-kerja', { search, bidang }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Head title="Program Kerja" />
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-20 bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6 animate-fade-in">Program Kerja</h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-slide-up">
                            Berbagai kegiatan dan agenda dakwah yang kami persembahkan untuk civitas akademika Polinema dan masyarakat umum.
                        </p>
                    </div>
                </section>

                {/* Filter & Search Section */}
                <section className="py-12 container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                        {/* Filter Buttons */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {bidangs.map((bidang) => (
                                <button
                                    key={bidang}
                                    onClick={() => handleFilter(bidang)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                        selectedBidang === bidang
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-600'
                                    }`}
                                >
                                    {bidang}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative w-full md:w-72">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari program kerja..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            />
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        </form>
                    </div>

                    {/* Proker Grid */}
                    {prokers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                            {prokers.map((proker) => (
                                <div key={proker.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={proker.image ? `/storage/${proker.image}` : 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop'}
                                            alt={proker.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-blue-600 shadow-sm">
                                            {proker.bidang}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-3">
                                            <Calendar size={16} className="text-amber-500" />
                                            {proker.date}
                                        </div>
                                        <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {proker.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                            {proker.description}
                                        </p>
                                        <button className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2">
                                            Detail Kegiatan <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <Filter size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700">Tidak ada program kerja ditemukan</h3>
                            <p className="text-slate-500 mt-2">Coba ubah kata kunci pencarian atau filter kategori.</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
