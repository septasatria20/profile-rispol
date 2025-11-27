import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ProkerIndex({ auth, prokers }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Proker" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-2xl font-bold">Daftar Program Kerja</h2>
                            <Link href={route('prokers.create')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                + Tambah Proker
                            </Link>
                        </div>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="p-3">Judul</th>
                                    <th className="p-3">Kategori</th>
                                    <th className="p-3">Tanggal</th>
                                    <th className="p-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prokers.map((proker) => (
                                    <tr key={proker.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{proker.title}</td>
                                        <td className="p-3"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{proker.category}</span></td>
                                        <td className="p-3">{proker.date}</td>
                                        <td className="p-3 flex gap-2">
                                            <Link href={route('prokers.edit', proker.id)} className="text-yellow-600 hover:text-yellow-800">Edit</Link>
                                            <Link href={route('prokers.destroy', proker.id)} method="delete" as="button" className="text-red-600 hover:text-red-800" confirm="Yakin hapus?">Hapus</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
