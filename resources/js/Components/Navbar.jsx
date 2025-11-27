import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => url === path || url.startsWith(path);
    const navClass = (path) => 
        `cursor-pointer font-medium transition-colors duration-300 ${isActive(path) ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-500'}`;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">R</div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 leading-tight">RISPOL</h1>
                        <p className="text-[10px] text-slate-500 tracking-wider font-semibold">POLITEKNIK NEGERI MALANG</p>
                    </div>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    <Link href="/" className={navClass('/')}>Beranda</Link>
                    <Link href="/tentang-kami" className={navClass('/tentang-kami')}>Tentang Kami</Link>
                    <Link href="/program-kerja" className={navClass('/program-kerja')}>Program Kerja</Link>
                    <Link href="/galeri" className={navClass('/galeri')}>Galeri</Link>
                    <Link href="/kontak" className={navClass('/kontak')}>Kontak</Link>
                    <Link href="/donasi" className={navClass('/donasi')}>Donasi</Link>
                    <Link 
                        href="/admin/login"
                        className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Login Admin
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t p-4 absolute w-full shadow-lg flex flex-col gap-4 z-50">
                    <Link href="/" className="block py-2 text-slate-700">Beranda</Link>
                    <Link href="/tentang-kami" className="block py-2 text-slate-700">Tentang Kami</Link>
                    <Link href="/program-kerja" className="block py-2 text-slate-700">Program Kerja</Link>
                    <Link href="/galeri" className="block py-2 text-slate-700">Galeri</Link>
                    <Link href="/kontak" className="block py-2 text-slate-700">Kontak</Link>
                    <Link href="/admin/login" className="block py-2 text-blue-600 font-bold">Login Admin</Link>
                </div>
            )}
        </nav>
    );
}
