import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ProkerCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'Syiar',
        date: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('prokers.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Proker" />
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                             <h2 className="text-xl font-bold text-gray-800">Tambah Program Kerja</h2>
                             <Link href={route('prokers.index')} className="text-sm text-gray-600 hover:text-gray-900">Kembali</Link>
                        </div>
                        
                        <form onSubmit={submit} className="space-y-4">
                            {/* Judul */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Judul Kegiatan</label>
                                <input 
                                    type="text" 
                                    value={data.title} 
                                    onChange={e => setData('title', e.target.value)} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                                />
                                {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title}</div>}
                            </div>

                            {/* Kategori */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                                <select 
                                    value={data.category} 
                                    onChange={e => setData('category', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="Syiar">Syiar</option>
                                    <option value="Mentoring">Mentoring</option>
                                    <option value="Ketakmiran">Ketakmiran</option>
                                    <option value="Humas">Humas</option>
                                    <option value="Keputrian">Keputrian</option>
                                    <option value="Kaderisasi">Kaderisasi</option>
                                </select>
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal Pelaksanaan</label>
                                <input 
                                    type="date" 
                                    value={data.date} 
                                    onChange={e => setData('date', e.target.value)} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                                />
                                {errors.date && <div className="text-red-600 text-sm mt-1">{errors.date}</div>}
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                                <textarea 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button disabled={processing} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}