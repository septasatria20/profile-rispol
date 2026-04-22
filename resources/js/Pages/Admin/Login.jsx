import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-stone-100 p-4 sm:p-6">
            <Head title="Admin Login" />

            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-28 -left-20 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#d6d3d120_1px,transparent_1px),linear-gradient(to_bottom,#d6d3d120_1px,transparent_1px)] bg-[size:28px_28px]" />
            </div>

            <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.45)] lg:grid-cols-[1.15fr_1fr]">
                    <aside className="hidden bg-slate-900 px-10 py-12 text-slate-100 lg:block">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 ring-1 ring-slate-700">
                                <ShieldCheck size={20} className="text-emerald-300" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Admin Console</p>
                                <h1 className="text-lg font-semibold">RISPOL Polinema</h1>
                            </div>
                        </div>

                        <div className="mt-12 space-y-5">
                            <h2 className="text-3xl font-semibold leading-tight text-white">Panel Pengelolaan Organisasi</h2>
                            <p className="max-w-sm text-sm leading-7 text-slate-300">
                                Kelola berita, program kerja, galeri, serta informasi publik secara terpusat dalam satu dashboard.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-3">
                            <div className="rounded-2xl border border-slate-700/80 bg-slate-800/70 p-4">
                                <p className="text-xs uppercase tracking-wide text-slate-400">Keamanan</p>
                                <p className="mt-1 text-sm text-slate-200">Akses ini khusus admin terdaftar.</p>
                            </div>
                            <div className="rounded-2xl border border-slate-700/80 bg-slate-800/70 p-4">
                                <p className="text-xs uppercase tracking-wide text-slate-400">Sesi</p>
                                <p className="mt-1 text-sm text-slate-200">Gunakan perangkat pribadi untuk menjaga akun tetap aman.</p>
                            </div>
                        </div>
                    </aside>

                    <main className="px-6 py-8 sm:px-10 sm:py-10">
                        <div className="mb-8 lg:hidden">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Admin Console</p>
                            <h1 className="mt-2 text-2xl font-semibold text-slate-900">RISPOL Polinema</h1>
                        </div>

                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 ring-1 ring-stone-200">
                                <img src="/logo.png" alt="RISPOL" className="h-11 w-11 object-contain" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Masuk Admin</h2>
                                <p className="text-sm text-slate-500">Kerohanian Islam Politeknik Negeri Malang</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        value={data.username}
                                        onChange={e => setData('username', e.target.value)}
                                        className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        placeholder="Masukkan username"
                                        autoFocus
                                        autoComplete="username"
                                    />
                                </div>
                                {errors.username && (
                                    <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-11 text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        placeholder="Masukkan password"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-800"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-stone-300 text-teal-700 focus:ring-teal-600"
                                />
                                Ingat saya di perangkat ini
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Memproses...' : 'Masuk ke Dashboard'}
                            </button>
                        </form>

                        <p className="mt-7 text-xs text-slate-500">
                            Dengan masuk, Anda menyetujui penggunaan sistem hanya untuk operasional resmi RISPOL.
                        </p>
                    </main>
                </div>
            </div>
        </div>
    );
}
