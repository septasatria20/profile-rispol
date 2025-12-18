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

    const menuItems = [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang Kami', href: '/tentang-kami' },
        { name: 'Program Kerja', href: '/program-kerja' },
        { name: 'Galeri', href: '/galeri' },
        { name: 'Kontak', href: '/kontak' },
        { name: 'Donasi', href: '/donasi' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 md:gap-3">
                    <img 
                        src="/logo.png" 
                        alt="RISPOL Logo" 
                        className="w-10 h-14 sm:w-12 sm:h-16 md:w-15 md:h-20 object-contain"
                    />
                    <div>
                        <h2 className="text-base sm:text-lg md:text-2xl font-bold tracking-tight text-slate-900">RISPOL</h2>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 uppercase tracking-widest leading-tight">
                            Politeknik Negeri Malang
                        </p>
                    </div>
                </Link>

                <div className="hidden md:flex gap-6 lg:gap-8 items-center">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/admin/login"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm"
                    >
                        Login Admin
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 p-2">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block py-3 px-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/admin/login"
                            className="block bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 text-center font-bold mt-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Login Admin
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
