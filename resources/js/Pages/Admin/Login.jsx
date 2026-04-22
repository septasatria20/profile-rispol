import React, { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Lock, User, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';

const SuccessToast = ({ message, onClose }) => (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 shadow-lg">
        <CheckCircle2 size={18} className="text-emerald-600" />
        <span className="text-sm font-medium">{message}</span>
        <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold uppercase tracking-wide text-emerald-700 hover:text-emerald-900"
        >
            Tutup
        </button>
    </div>
);

export default function Login({ captcha = {} }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const { flash = {} } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        captcha_answer: '',
        remember: false,
    });

    useEffect(() => {
        if (flash.success) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-stone-100 p-4 sm:p-6">
            <Head title="Admin Login" />
            {showToast && flash.success && (
                <SuccessToast message={flash.success} onClose={() => setShowToast(false)} />
            )}

            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-28 -left-20 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#d6d3d120_1px,transparent_1px),linear-gradient(to_bottom,#d6d3d120_1px,transparent_1px)] bg-[size:28px_28px]" />
            </div>

            <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-xl items-center justify-center">
                <main className="w-full rounded-3xl border border-stone-200 bg-white px-6 py-8 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.45)] sm:px-10 sm:py-10">
                    <div className="mb-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-stone-50 hover:text-slate-900"
                        >
                            <ArrowLeft size={16} />
                            Kembali
                        </Link>
                    </div>

                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 ring-1 ring-stone-200">
                            <img src="/logo.png" alt="RISPOL" className="h-11 w-11 object-contain" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-900">Masuk Admin</h1>
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

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Verifikasi Keamanan: {captcha.firstNumber ?? 0} + {captcha.secondNumber ?? 0} = ?
                            </label>
                            <input
                                type="number"
                                value={data.captcha_answer}
                                onChange={e => setData('captcha_answer', e.target.value)}
                                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                placeholder="Masukkan hasil penjumlahan"
                                inputMode="numeric"
                            />
                            {errors.captcha_answer && (
                                <p className="mt-2 text-sm text-red-600">{errors.captcha_answer}</p>
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
                </main>
            </div>
        </div>
    );
}
