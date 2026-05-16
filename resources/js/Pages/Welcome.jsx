import { Link, Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                    <h1 className="text-3xl font-bold mb-2">RISPOL</h1>
                    <p className="text-sm text-slate-600 mb-4">Kehadiran digital RISPOL — Portal utama organisasi.</p>
                    <a href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Kunjungi Situs</a>
                </div>
            </div>
        </>
    );
}
