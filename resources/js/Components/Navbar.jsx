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
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    <img 
                        src="/logo.png" 
                        alt="RISPOL Logo" 
                        className="w-15 h-20 object-contain"
                    />
                    <span className="font-bold text-xl text-slate-900"></span>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/admin/login"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-bold"
                    >
                        Login Admin
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block py-2 text-slate-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/donasi"
                            className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            Donasi
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
