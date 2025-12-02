import React, { useState, useEffect } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, Calendar, Image as ImageIcon, MessageSquare, 
    Users, Settings, LogOut, Plus, Trash2, Edit, Search, 
    TrendingUp, DollarSign, Eye, MoreVertical, X, Save, ExternalLink, BarChart3,
    Newspaper, Youtube, Building2, CheckCircle, XCircle, Clock, AlertCircle, Check
} from 'lucide-react';

// Toast Component
const Toast = ({ message, onClose }) => (
    <div className="fixed top-4 right-4 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-left z-50 border border-slate-700">
        <div className="bg-emerald-500 rounded-full p-1">
            <Check size={14} className="text-white" />
        </div>
        <span className="font-medium text-sm">{message}</span>
        <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white"><X size={16} /></button>
    </div>
);

export default function Dashboard({ 
    stats = [], 
    prokers = [], 
    beritas = [], 
    donations = [], 
    contacts = [], 
    bankAccounts = [], 
    galleries = [], 
    bidangs = [], 
    pengurusInti = [], 
    visiMisi = {}, 
    settings = {} 
}) {
    const { flash = {} } = usePage().props;
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [showToast, setShowToast] = useState(false);

    // Show toast when flash message exists
    useEffect(() => {
        if (flash?.success) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);
    
    // --- FORMS ---
    const prokerForm = useForm({ id: '', title: '', bidang: 'Syiar', date: '', status: 'Aktif', description: '', image: null });
    const beritaForm = useForm({ id: '', title: '', content: '', published_at: '', image: null });
    const bankForm = useForm({ id: '', bank_name: '', account_number: '', account_holder: '', is_active: true, logo: null });
    const settingsForm = useForm({ 
        youtube_link: settings?.youtube_link || '', 
        hero_image: null, 
        qris_image: null, 
        mentoring_image: null, // Add this
        donation_poster_1: null,
        donation_poster_2: null,
        donation_poster_3: null,
        donation_poster_4: null,
        donation_poster_5: null,
        slider_1: null,
        slider_1_title: settings?.slider_1_title || '',
        slider_2: null,
        slider_2_title: settings?.slider_2_title || '',
        slider_3: null,
        slider_3_title: settings?.slider_3_title || ''
    });
    const bidangForm = useForm({ id: '', name: '', description: '', image: null, order: 0, is_active: true });
    const pengurusForm = useForm({ id: '', name: '', position: '', nim: '', prodi: '', photo: null, order: 0, is_active: true });
    const orgForm = useForm({ visi: visiMisi.visi || '', misi: visiMisi.misi || '', sejarah: visiMisi.sejarah || '' });
    const galeriForm = useForm({ id: '', year: new Date().getFullYear(), title: '', description: '', drive_link: '', photo_count: 0, thumbnail: null });

    // --- HANDLERS (LOGIC) ---

    // 1. Proker Logic
    const openAddProker = () => { prokerForm.reset(); setModalType('add_proker'); setShowModal(true); };
    const openEditProker = (item) => { prokerForm.setData({ id: item.id, title: item.title, bidang: item.bidang, date: item.date, status: item.status, description: item.description || '', image: null }); setModalType('edit_proker'); setShowModal(true); };
    const handleSubmitProker = (e) => {
        e.preventDefault();
        const fd = new FormData();
        Object.keys(prokerForm.data).forEach(key => { if(prokerForm.data[key] !== null) fd.append(key, prokerForm.data[key]); });
        router.post(modalType === 'add_proker' ? '/admin/prokers' : `/admin/prokers/${prokerForm.data.id}`, fd, { onSuccess: () => { setShowModal(false); prokerForm.reset(); }, forceFormData: true });
    };
    const handleDeleteProker = (id) => { if (confirm('Hapus proker ini?')) router.delete(`/admin/prokers/${id}`); };

    // 2. Berita Logic
    const openAddBerita = () => { beritaForm.reset(); setModalType('add_berita'); setShowModal(true); };
    const openEditBerita = (item) => { beritaForm.setData({ id: item.id, title: item.title, content: item.content, published_at: item.published_at, image: null }); setModalType('edit_berita'); setShowModal(true); };
    const handleSubmitBerita = (e) => {
        e.preventDefault();
        const fd = new FormData();
        Object.keys(beritaForm.data).forEach(key => { if(beritaForm.data[key] !== null) fd.append(key, beritaForm.data[key]); });
        router.post(modalType === 'add_berita' ? '/admin/berita' : `/admin/berita/${beritaForm.data.id}`, fd, { onSuccess: () => { setShowModal(false); beritaForm.reset(); }, forceFormData: true });
    };
    const handleDeleteBerita = (id) => { if (confirm('Hapus berita ini?')) router.delete(`/admin/berita/${id}`); };

    // 3. Bank Logic
    const openAddBank = () => { bankForm.reset(); setModalType('add_bank'); setShowModal(true); };
    const openEditBank = (item) => { bankForm.setData({ id: item.id, bank_name: item.bank_name, account_number: item.account_number, account_holder: item.account_holder, is_active: item.is_active, logo: null }); setModalType('edit_bank'); setShowModal(true); };
    const handleSubmitBank = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('bank_name', bankForm.data.bank_name); fd.append('account_number', bankForm.data.account_number); fd.append('account_holder', bankForm.data.account_holder); fd.append('is_active', bankForm.data.is_active ? '1' : '0');
        if (bankForm.data.logo) fd.append('logo', bankForm.data.logo);
        router.post(modalType === 'add_bank' ? '/admin/bank-accounts' : `/admin/bank-accounts/${bankForm.data.id}`, fd, { onSuccess: () => { setShowModal(false); bankForm.reset(); }, forceFormData: true });
    };
    const handleDeleteBank = (id) => { if (confirm('Hapus rekening ini?')) router.delete(`/admin/bank-accounts/${id}`); };

    // 4. Settings & Org Info Logic
    const handleSubmitSettings = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('youtube_link', settingsForm.data.youtube_link);
        if (settingsForm.data.hero_image) fd.append('hero_image', settingsForm.data.hero_image);
        if (settingsForm.data.qris_image) fd.append('qris_image', settingsForm.data.qris_image);
        if (settingsForm.data.mentoring_image) fd.append('mentoring_image', settingsForm.data.mentoring_image); // Add this
        
        // Add donation posters
        for (let i = 1; i <= 5; i++) {
            const key = `donation_poster_${i}`;
            if (settingsForm.data[key]) fd.append(key, settingsForm.data[key]);
        }
        
        // Add sliders with titles
        ['slider_1', 'slider_2', 'slider_3'].forEach(k => { 
            if(settingsForm.data[k]) fd.append(k, settingsForm.data[k]);
            // Add slider titles
            const titleKey = `${k}_title`;
            fd.append(titleKey, settingsForm.data[titleKey] || '');
        });
        
        router.post('/admin/settings', fd, { 
            forceFormData: true,
            onSuccess: () => {
                // Reset form after success
                settingsForm.reset();
            }
        });
    };
    const handleSubmitOrgInfo = (e) => {
        e.preventDefault();
        router.post('/admin/organization-info', orgForm.data, {
            onSuccess: () => {
                // Toast will show automatically
            },
            onError: (errors) => {
                console.error('Error:', errors);
            }
        });
    };

    // 5. Pengurus Logic
    const openAddPengurus = () => { 
        pengurusForm.reset(); 
        setModalType('add_pengurus'); 
        setShowModal(true); 
    };
    const openEditPengurus = (item) => {
        pengurusForm.setData({ 
            id: item.id, name: item.name, position: item.role || item.position, nim: item.nim || '', prodi: item.prodi || '', photo: null, order: item.order || 0, is_active: item.is_active ?? true 
        });
        setModalType('edit_pengurus'); setShowModal(true);
    };
    const handleSubmitPengurus = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('name', pengurusForm.data.name); 
        fd.append('role', pengurusForm.data.position);
        if(pengurusForm.data.nim) fd.append('nim', pengurusForm.data.nim); 
        if(pengurusForm.data.prodi) fd.append('prodi', pengurusForm.data.prodi);
        if(pengurusForm.data.order) fd.append('order', pengurusForm.data.order);
        if(pengurusForm.data.photo) fd.append('image', pengurusForm.data.photo);
        router.post(modalType === 'add_pengurus' ? '/admin/pengurus' : `/admin/pengurus/${pengurusForm.data.id}`, fd, { onSuccess: () => { setShowModal(false); pengurusForm.reset(); }, forceFormData: true });
    };
    const handleDeletePengurus = (id) => { if (confirm('Hapus pengurus ini?')) router.delete(`/admin/pengurus/${id}`); };

    // 6. Bidang Logic
    const openAddBidang = () => { 
        bidangForm.reset(); 
        setModalType('add_bidang'); 
        setShowModal(true); 
    };
    const openEditBidang = (item) => { 
        console.log('Editing bidang:', item); // Debug log
        bidangForm.setData({ 
            id: item.id, 
            name: item.name, 
            description: item.description || '', 
            image: null, 
            order: item.order || 0, 
            is_active: item.is_active ?? true 
        }); 
        setModalType('edit_bidang'); 
        setShowModal(true); 
    };
    const handleSubmitBidang = (e) => {
        e.preventDefault();
        console.log('Submitting bidang data:', bidangForm.data); // Debug log
        const fd = new FormData();
        fd.append('name', bidangForm.data.name); 
        fd.append('description', bidangForm.data.description || '');
        if(bidangForm.data.order) fd.append('order', bidangForm.data.order);
        if(bidangForm.data.is_active !== undefined) fd.append('is_active', bidangForm.data.is_active ? '1' : '0');
        if(bidangForm.data.image) fd.append('image', bidangForm.data.image);
        
        router.post(
            modalType === 'add_bidang' ? '/admin/bidangs' : `/admin/bidangs/${bidangForm.data.id}`, 
            fd, 
            { 
                onSuccess: () => { 
                    setShowModal(false); 
                    bidangForm.reset(); 
                },
                onError: (errors) => {
                    console.error('Error updating bidang:', errors);
                },
                forceFormData: true 
            }
        );
    };
    const handleDeleteBidang = (id) => { if (confirm('Hapus bidang ini?')) router.delete(`/admin/bidangs/${id}`); };

    // 7. Galeri Logic (FUNGSI INI YANG SEBELUMNYA HILANG)
    const openAddGaleri = () => { galeriForm.reset(); setModalType('add_galeri'); setShowModal(true); };
    const openEditGaleri = (item) => {
        galeriForm.setData({ 
            id: item.id, year: item.year, title: item.title, description: item.description || '', drive_link: item.link || item.drive_link || '', photo_count: item.count || item.photo_count || 0, thumbnail: null 
        });
        setModalType('edit_galeri'); setShowModal(true);
    };
    const handleSubmitGaleri = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('year', galeriForm.data.year); 
        fd.append('title', galeriForm.data.title); 
        fd.append('description', galeriForm.data.description); 
        fd.append('drive_link', galeriForm.data.drive_link); 
        fd.append('photo_count', galeriForm.data.photo_count);
        if(galeriForm.data.thumbnail) fd.append('thumbnail', galeriForm.data.thumbnail);
        
        router.post(modalType === 'add_galeri' ? '/admin/galeri' : `/admin/galeri/${galeriForm.data.id}`, fd, { 
            onSuccess: () => { 
                setShowModal(false); 
                galeriForm.reset(); 
            },
            onError: (errors) => {
                console.error('Error:', errors);
            },
            forceFormData: true 
        });
    };
    const handleDeleteGaleri = (id) => { if (confirm('Hapus album ini?')) router.delete(`/admin/galeri/${id}`); };

    // 8. Kontak Logic
    const handleContactStatus = (id, status) => router.post(`/admin/contacts/${id}/status`, { status });
    const handleDeleteContact = (id) => confirm('Hapus pesan?') && router.delete(`/admin/contacts/${id}`);

    // FIX: Tambahkan handler delete donation yang hilang
    const handleDeleteDonation = (id) => { 
        if (confirm('Hapus donasi ini?')) router.delete(`/admin/donations/${id}`); 
    };

    // Utils
    const handleDonationStatus = (id, status) => router.post(`/admin/donations/${id}/status`, { status });
    const handleLogout = () => router.post('/logout');

    // --- RENDER FUNCTIONS ---

    const renderDashboard = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {(stats || []).map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all hover:-translate-y-1">
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100`}>
                            {idx === 0 ? <DollarSign size={28}/> : idx === 1 ? <Eye size={28}/> : idx === 2 ? <Newspaper size={28}/> : <Calendar size={28}/>}
                        </div>
                        <div><h4 className="text-3xl font-bold text-slate-800">{stat.val}</h4><p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{stat.label}</p></div>
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><BarChart3 size={24} /></div>
                            <div><h3 className="font-bold text-lg text-slate-800">Statistik Donasi</h3><p className="text-xs text-slate-500">Overview donasi masuk tahun ini</p></div>
                        </div>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-4 px-2">
                        {[45, 60, 35, 80, 55, 90, 70, 65, 50, 75, 85, 95].map((val, i) => (
                            <div key={i} className="w-full flex flex-col items-center gap-3 group cursor-pointer">
                                <div className="w-full bg-slate-100 rounded-t-xl relative h-full flex items-end overflow-hidden">
                                    <div style={{height: `${val}%`}} className="w-full bg-blue-500 group-hover:bg-blue-600 transition-all duration-500 rounded-t-xl relative"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg text-slate-800 mb-6">Aktivitas Terbaru</h3>
                    <div className="space-y-6">
                        {donations.slice(0, 4).map((d) => (
                            <div key={d.id} className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">{d.name.charAt(0)}</div>
                                <div className="flex-1 min-w-0"><h4 className="font-bold text-slate-800 text-sm truncate">{d.name}</h4><p className="text-xs text-slate-500 truncate">Donasi</p></div>
                                <span className="font-bold text-emerald-600 text-sm">+{parseInt(d.amount).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProker = () => (
        <div className="space-y-8 animate-fade-in">
            {/* Program Kerja Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">Daftar Program Kerja</h3>
                        <p className="text-xs text-slate-500 mt-1">Program kerja yang sudah selesai dilaksanakan</p>
                    </div>
                    <button 
                        onClick={() => {
                            prokerForm.reset();
                            prokerForm.setData('status', 'Selesai');
                            setModalType('add_proker'); 
                            setShowModal(true);
                        }} 
                        className="bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-700 transition-colors"
                    >
                        <Plus size={16} /> Tambah Program Kerja
                    </button>
                </div>
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-800 font-bold">
                        <tr><th className="p-4">Judul Kegiatan</th><th className="p-4">Bidang</th><th className="p-4">Waktu</th><th className="p-4">Status</th><th className="p-4 text-right">Aksi</th></tr>
                    </thead>
                    <tbody>
                        {prokers.filter(p => p.status === 'Selesai').length > 0 ? (
                            prokers.filter(p => p.status === 'Selesai').map((item) => (
                                <tr key={item.id} className="border-b hover:bg-slate-50">
                                    <td className="p-4 font-bold">{item.title}</td>
                                    <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{item.bidang}</span></td>
                                    <td className="p-4">{item.date}</td>
                                    <td className="p-4"><span className="px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-500">Selesai</span></td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <button onClick={() => openEditProker(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit size={16} /></button>
                                        <button onClick={() => handleDeleteProker(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-400">Belum ada program kerja yang selesai.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Agenda Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">Daftar Agenda</h3>
                        <p className="text-xs text-slate-500 mt-1">Agenda kegiatan yang akan atau sedang berlangsung</p>
                    </div>
                    <button 
                        onClick={() => {
                            prokerForm.reset();
                            prokerForm.setData('status', 'Aktif');
                            setModalType('add_proker'); 
                            setShowModal(true);
                        }} 
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors"
                    >
                        <Plus size={16} /> Tambah Agenda
                    </button>
                </div>
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-800 font-bold">
                        <tr><th className="p-4">Judul Kegiatan</th><th className="p-4">Bidang</th><th className="p-4">Waktu</th><th className="p-4">Status</th><th className="p-4 text-right">Aksi</th></tr>
                    </thead>
                    <tbody>
                        {prokers.filter(p => p.status === 'Aktif').length > 0 ? (
                            prokers.filter(p => p.status === 'Aktif').map((item) => (
                                <tr key={item.id} className="border-b hover:bg-slate-50">
                                    <td className="p-4 font-bold">{item.title}</td>
                                    <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{item.bidang}</span></td>
                                    <td className="p-4">{item.date}</td>
                                    <td className="p-4"><span className="px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700">Aktif</span></td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <button onClick={() => openEditProker(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit size={16} /></button>
                                        <button onClick={() => handleDeleteProker(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-400">Belum ada agenda yang aktif.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderBerita = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Daftar Berita</h3>
                <button onClick={openAddBerita} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"><Plus size={16} /> Tambah Berita</button>
            </div>
            <div className="p-6 grid gap-4">
                {beritas.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center border-b pb-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden shrink-0">{item.image && <img src={`/storage/${item.image}`} className="w-full h-full object-cover"/>}</div>
                        <div className="flex-1"><h4 className="font-bold text-slate-800">{item.title}</h4><p className="text-xs text-slate-500">{item.published_at}</p></div>
                        <div className="flex gap-2"><button onClick={()=>openEditBerita(item)} className="text-blue-600"><Edit size={16}/></button><button onClick={()=>handleDeleteBerita(item.id)} className="text-red-600"><Trash2 size={16}/></button></div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDonasi = () => (
        <div className="space-y-8 animate-fade-in">
            {/* Pengaturan QRIS */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="font-bold text-lg text-slate-800 mb-6">Pengaturan QRIS Donasi</h3>
                <form onSubmit={handleSubmitSettings} className="flex items-end gap-4">
                    <div className="flex-1"><input type="file" onChange={e => settingsForm.setData('qris_image', e.target.files[0])} className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm" /></div>
                    <button type="submit" className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-700">Update QRIS</button>
                </form>
                {settings.qris_image && <div className="w-32 h-32 mt-4 border rounded p-2"><img src={`/storage/${settings.qris_image}`} className="w-full h-full object-contain"/></div>}
            </div>

            {/* Poster Donasi (Portrait A4) - Maksimal 5 Poster */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="font-bold text-lg text-slate-800 mb-6">Poster Halaman Donasi (Portrait A4)</h3>
                <p className="text-sm text-slate-600 mb-6">Upload maksimal 5 poster yang akan ditampilkan bergantian setiap 5 detik. Rekomendasi rasio 3:4 (misal: 1200x1600px)</p>
                
                <form onSubmit={handleSubmitSettings} className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num}>
                                <label className="block text-sm font-bold mb-2">Poster {num}</label>
                                <input 
                                    type="file" 
                                    onChange={e=>settingsForm.setData(`donation_poster_${num}`, e.target.files[0])} 
                                    className="w-full border rounded-lg p-2 text-sm"
                                    accept="image/*"
                                />
                                {settings[`donation_poster_${num}`] && (
                                    <div className="mt-3">
                                        <img 
                                            src={`/storage/${settings[`donation_poster_${num}`]}`} 
                                            className="w-full h-64 object-contain rounded border shadow-sm bg-white p-2" 
                                            alt={`Poster ${num}`} 
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button 
                        type="submit" 
                        disabled={settingsForm.processing}
                        className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 disabled:opacity-50"
                    >
                        {settingsForm.processing ? 'Menyimpan...' : 'Update Poster Donasi'}
                    </button>
                </form>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Donatur List - Lebih lebar (2 kolom dari 3) */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="font-bold text-lg text-slate-800">Daftar Donatur Masuk</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-slate-800 font-bold">
                                <tr>
                                    <th className="p-4">Nama</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Jumlah</th>
                                    <th className="p-4">Tujuan</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((item) => (
                                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                        <td className="p-4 font-medium">{item.name}</td>
                                        <td className="p-4 text-xs text-slate-500">{item.email}</td>
                                        <td className="p-4 font-bold text-emerald-600">Rp {parseInt(item.amount).toLocaleString()}</td>
                                        <td className="p-4 text-xs">{item.campaign}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                item.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 
                                                item.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                                {item.status === 'verified' ? '✓ Terverifikasi' : item.status === 'rejected' ? '✗ Ditolak' : '⏳ Pending'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {item.status === 'pending' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleDonationStatus(item.id, 'verified')} 
                                                            className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg" 
                                                            title="Verifikasi"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDonationStatus(item.id, 'rejected')} 
                                                            className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg" 
                                                            title="Tolak"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}
                                                {item.payment_proof && (
                                                    <a 
                                                        href={`/storage/${item.payment_proof}`} 
                                                        target="_blank" 
                                                        className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg" 
                                                        title="Lihat Bukti"
                                                    >
                                                        <Eye size={18} />
                                                    </a>
                                                )}
                                                <button 
                                                    onClick={() => handleDeleteDonation(item.id)} 
                                                    className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg" 
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {donations.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-slate-400">Belum ada donasi masuk.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Rekening Bank - Lebih kecil (1 kolom dari 3) */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex justify-between mb-4">
                        <h3 className="font-bold text-lg">Rekening Bank</h3>
                        <button onClick={openAddBank} className="text-blue-600 hover:text-blue-700">
                            <Plus size={20}/>
                        </button>
                    </div>
                    <div className="space-y-3">
                        {bankAccounts.map(b => (
                            <div key={b.id} className="flex flex-col border p-3 rounded-lg hover:border-blue-200 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-bold text-slate-900">{b.bank_name}</div>
                                    <div className="flex gap-2">
                                        <button onClick={()=>openEditBank(b)} className="text-blue-600 hover:text-blue-700">
                                            <Edit size={14}/>
                                        </button>
                                        <button onClick={()=>handleDeleteBank(b.id)} className="text-red-600 hover:text-red-700">
                                            <Trash2 size={14}/>
                                        </button>
                                    </div>
                                </div>
                                <div className="text-sm text-slate-600">{b.account_number}</div>
                                <div className="text-xs text-slate-500 mt-1">{b.account_holder}</div>
                            </div>
                        ))}
                        {bankAccounts.length === 0 && (
                            <div className="text-center text-slate-400 py-4 text-sm">
                                Belum ada rekening bank
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderKontak = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100"><h3 className="font-bold text-lg text-slate-800">Pesan Masuk</h3></div>
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-800 font-bold"><tr><th className="p-4">Nama</th><th className="p-4">Pesan</th><th className="p-4">Status</th><th className="p-4 text-right">Aksi</th></tr></thead>
                <tbody>
                    {contacts.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-slate-50">
                            <td className="p-4 font-medium">{item.name}<div className="text-xs text-slate-400">{item.email}</div></td>
                            <td className="p-4 max-w-xs truncate">{item.message}</td>
                            <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'replied' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>{item.status === 'replied' ? 'Dibalas' : 'Pending'}</span></td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    {item.status === 'pending' && <button onClick={() => handleContactStatus(item.id, 'replied')} className="text-emerald-600"><CheckCircle size={18} /></button>}
                                    <button onClick={() => handleDeleteContact(item.id)} className="text-red-600"><Trash2 size={18} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderTentangKami = () => (
        <div className="space-y-8 animate-fade-in">
            {/* Visi Misi Sejarah */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="font-bold text-lg text-slate-800 mb-6">Informasi Organisasi</h3>
                <form onSubmit={handleSubmitOrgInfo} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Visi</label>
                        <textarea 
                            value={orgForm.data.visi} 
                            onChange={e => orgForm.setData('visi', e.target.value)} 
                            className="w-full border rounded-lg p-2" 
                            rows="3"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Misi (Pisahkan dengan enter/baris baru)</label>
                        <textarea 
                            value={orgForm.data.misi} 
                            onChange={e => orgForm.setData('misi', e.target.value)} 
                            className="w-full border rounded-lg p-2" 
                            rows="5"
                            placeholder="Misi pertama&#10;Misi kedua&#10;Misi ketiga"
                        ></textarea>
                        <p className="text-xs text-slate-500 mt-1">Tip: Tulis setiap misi di baris terpisah</p>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Sejarah</label>
                        <textarea 
                            value={orgForm.data.sejarah} 
                            onChange={e => orgForm.setData('sejarah', e.target.value)} 
                            className="w-full border rounded-lg p-2" 
                            rows="6"
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        disabled={orgForm.processing} 
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
                    >
                        {orgForm.processing ? 'Menyimpan...' : 'Simpan Informasi'}
                    </button>
                </form>
            </div>

            {/* BIDANG & PENGURUS */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-lg">Bidang</h3><button onClick={openAddBidang} className="bg-blue-600 text-white p-2 rounded-lg"><Plus size={16}/></button></div>
                    <div className="space-y-4">{bidangs.map(b => (
                        <div key={b.id} className="flex justify-between items-center border p-3 rounded-lg">
                            <div><div className="font-bold">{b.name}</div><div className="text-xs text-slate-500">{b.description}</div></div>
                            <div className="flex gap-2"><button onClick={()=>openEditBidang(b)} className="text-blue-600"><Edit size={14}/></button><button onClick={()=>handleDeleteBidang(b.id)} className="text-red-600"><Trash2 size={14}/></button></div>
                        </div>
                    ))}</div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-lg">Pengurus</h3><button onClick={openAddPengurus} className="bg-purple-600 text-white p-2 rounded-lg"><Plus size={16}/></button></div>
                    <div className="space-y-4">{pengurusInti.map(p => (
                        <div key={p.id} className="flex justify-between items-center border p-3 rounded-lg">
                            <div className="flex items-center gap-3"><div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden">{p.photo && <img src={`/storage/${p.photo}`} className="w-full h-full object-cover"/>}</div><div><div className="font-bold">{p.name}</div><div className="text-xs text-slate-500">{p.position || p.role}</div></div></div>
                            <div className="flex gap-2"><button onClick={()=>openEditPengurus(p)} className="text-blue-600"><Edit size={14}/></button><button onClick={()=>handleDeletePengurus(p.id)} className="text-red-600"><Trash2 size={14}/></button></div>
                        </div>
                    ))}</div>
                </div>
            </div>
        </div>
    );

    const renderPengaturan = () => (
        <div className="space-y-8 animate-fade-in">
            {/* Pengaturan Umum */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="font-bold text-lg text-slate-800 mb-6">Pengaturan Umum</h3>
                <form onSubmit={handleSubmitSettings} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Youtube Link</label>
                        <input 
                            type="text" 
                            value={settingsForm.data.youtube_link} 
                            onChange={e=>settingsForm.setData('youtube_link', e.target.value)} 
                            className="w-full border rounded-lg p-2"
                            placeholder="https://youtube.com/embed/..."
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold mb-2">Hero Image</label>
                        <input 
                            type="file" 
                            onChange={e=>settingsForm.setData('hero_image', e.target.files[0])} 
                            className="w-full border rounded-lg p-2"
                            accept="image/*"
                        />
                        {settings.hero_image && (
                            <div className="mt-2">
                                <img src={`/storage/${settings.hero_image}`} className="w-40 h-24 object-cover rounded border" alt="Hero" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Gambar Section Mentoring</label>
                        <p className="text-xs text-slate-500 mb-2">Gambar untuk section Website Mentoring Polinema di homepage</p>
                        <input 
                            type="file" 
                            onChange={e=>settingsForm.setData('mentoring_image', e.target.files[0])} 
                            className="w-full border rounded-lg p-2"
                            accept="image/*"
                        />
                        {settings.mentoring_image && (
                            <div className="mt-2">
                                <img src={`/storage/${settings.mentoring_image}`} className="w-40 h-24 object-cover rounded border" alt="Mentoring" />
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        disabled={settingsForm.processing}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
                    >
                        {settingsForm.processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                    </button>
                </form>
            </div>

            {/* Pengaturan Slider Images */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="font-bold text-lg text-slate-800 mb-6">Slider Homepage (3 Gambar)</h3>
                <form onSubmit={handleSubmitSettings} className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Slider 1 */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Slider 1</label>
                            <input 
                                type="file" 
                                onChange={e=>settingsForm.setData('slider_1', e.target.files[0])} 
                                className="w-full border rounded-lg p-2 text-sm mb-2"
                                accept="image/*"
                            />
                            <input 
                                type="text" 
                                placeholder="Title Slider 1"
                                value={settingsForm.data.slider_1_title}
                                onChange={e=>settingsForm.setData('slider_1_title', e.target.value)}
                                className="w-full border rounded-lg p-2 text-sm"
                            />
                            {settings.slider_1 && (
                                <div className="mt-2">
                                    <img 
                                        src={`/storage/${settings.slider_1}`} 
                                        className="w-full h-40 object-cover rounded border" 
                                        alt="Slider 1" 
                                    />
                                    <p className="text-xs text-slate-600 mt-1 font-medium">{settings.slider_1_title || 'Belum ada title'}</p>
                                </div>
                            )}
                        </div>

                        {/* Slider 2 */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Slider 2</label>
                            <input 
                                type="file" 
                                onChange={e=>settingsForm.setData('slider_2', e.target.files[0])} 
                                className="w-full border rounded-lg p-2 text-sm mb-2"
                                accept="image/*"
                            />
                            <input 
                                type="text" 
                                placeholder="Title Slider 2"
                                value={settingsForm.data.slider_2_title}
                                onChange={e=>settingsForm.setData('slider_2_title', e.target.value)}
                                className="w-full border rounded-lg p-2 text-sm"
                            />
                            {settings.slider_2 && (
                                <div className="mt-2">
                                    <img 
                                        src={`/storage/${settings.slider_2}`} 
                                        className="w-full h-40 object-cover rounded border" 
                                        alt="Slider 2" 
                                    />
                                    <p className="text-xs text-slate-600 mt-1 font-medium">{settings.slider_2_title || 'Belum ada title'}</p>
                                </div>
                            )}
                        </div>

                        {/* Slider 3 */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Slider 3</label>
                            <input 
                                type="file" 
                                onChange={e=>settingsForm.setData('slider_3', e.target.files[0])} 
                                className="w-full border rounded-lg p-2 text-sm mb-2"
                                accept="image/*"
                            />
                            <input 
                                type="text" 
                                placeholder="Title Slider 3"
                                value={settingsForm.data.slider_3_title}
                                onChange={e=>settingsForm.setData('slider_3_title', e.target.value)}
                                className="w-full border rounded-lg p-2 text-sm"
                            />
                            {settings.slider_3 && (
                                <div className="mt-2">
                                    <img 
                                        src={`/storage/${settings.slider_3}`} 
                                        className="w-full h-40 object-cover rounded border" 
                                        alt="Slider 3" 
                                    />
                                    <p className="text-xs text-slate-600 mt-1 font-medium">{settings.slider_3_title || 'Belum ada title'}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={settingsForm.processing}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50"
                    >
                        {settingsForm.processing ? 'Menyimpan...' : 'Update Slider Images'}
                    </button>
                </form>
            </div>
        </div>
    );

    const renderGaleri = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Arsip Galeri</h3>
                <button 
                    onClick={openAddGaleri} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-bold hover:bg-blue-700"
                >
                    <Plus size={16} /> Tambah Album
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 font-bold text-slate-800">
                        <tr>
                            <th className="p-4">Tahun</th>
                            <th className="p-4">Judul</th>
                            <th className="p-4">Link Drive</th>
                            <th className="p-4">Jumlah Foto</th>
                            <th className="p-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {galleries.map((g) => (
                            <tr key={g.id} className="border-b hover:bg-slate-50">
                                <td className="p-4 font-bold">{g.year}</td>
                                <td className="p-4">{g.title}</td>
                                <td className="p-4">
                                    <a
                                        href={g.link || g.drive_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
                                    >
                                        <ExternalLink size={14} /> Buka Drive
                                    </a>
                                </td>
                                <td className="p-4 text-sm">
                                    {g.photo_count || g.count || 0} foto
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openEditGaleri(g)}
                                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteGaleri(g.id)}
                                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                                            title="Hapus"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {galleries.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-400">
                                    Belum ada data galeri.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );


    const MENU_ITEMS = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, render: renderDashboard },
        { id: 'proker', label: 'Program Kerja', icon: Calendar, render: renderProker },
        { id: 'berita', label: 'Berita', icon: Newspaper, render: renderBerita },
        { id: 'donasi', label: 'Donasi & Rekening', icon: DollarSign, render: renderDonasi },
        { id: 'kontak', label: 'Pesan Masuk', icon: MessageSquare, render: renderKontak },
        { id: 'tentang-kami', label: 'Tentang Kami', icon: Users, render: renderTentangKami },
        { id: 'galeri', label: 'Galeri', icon: ImageIcon, render: renderGaleri },
        { id: 'pengaturan', label: 'Pengaturan', icon: Settings, render: renderPengaturan },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
            <Head title="Admin Dashboard" />
            {showToast && <Toast message="Operasi berhasil!" onClose={() => setShowToast(false)} />}
            
            <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
                {/* FIX: Ganti icon dengan logo */}
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <img 
                        src="/logo.png" 
                        alt="RISPOL Logo" 
                        className="w-10 h-10 object-contain rounded-lg bg-white p-1"
                    />
                    <span className="font-bold text-lg">ADMIN RISPOL</span>
                </div>
                
                <nav className="flex-1 p-4 space-y-1">{MENU_ITEMS.map(item => (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-600 shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}><item.icon size={18} /><span className="text-sm font-medium">{item.label}</span></button>))}</nav>
                <div className="p-4 border-t border-slate-800"><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/20"><LogOut size={18}/><span className="text-sm">Keluar</span></button></div>
            </aside>

            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8"><h2 className="text-2xl font-bold capitalize">{activeTab.replace('-', ' ')}</h2><div className="text-sm text-slate-500">Administrator</div></header>
                {MENU_ITEMS.find(item => item.id === activeTab)?.render()}
            </main>

            {/* MODALS */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto animate-slide-up">
                        <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                            <h3 className="font-bold capitalize">{modalType.replace(/_/g, ' ')}</h3>
                            <button onClick={() => setShowModal(false)}><X size={20}/></button>
                        </div>
                        
                        {/* PROKER MODAL - FIX: Close select tag properly */}
                        {(modalType.includes('proker')) && (
                            <form onSubmit={handleSubmitProker} className="p-6 space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Judul" 
                                    className="w-full border p-2 rounded" 
                                    value={prokerForm.data.title} 
                                    onChange={e=>prokerForm.setData('title',e.target.value)} 
                                    required
                                />
                                <input 
                                    type="date" 
                                    className="w-full border p-2 rounded" 
                                    value={prokerForm.data.date} 
                                    onChange={e=>prokerForm.setData('date',e.target.value)} 
                                    required
                                />
                                <select 
                                    className="w-full border p-2 rounded" 
                                    value={prokerForm.data.bidang} 
                                    onChange={e=>prokerForm.setData('bidang',e.target.value)}
                                >
                                    <option>Syiar</option>
                                    <option>Mentoring</option>
                                    <option>Humas</option>
                                    <option>Ketakmiran</option>
                                    <option>Kaderisasi</option>
                                    <option>Keputrian</option>
                                </select>
                                <textarea 
                                    placeholder="Deskripsi" 
                                    className="w-full border p-2 rounded" 
                                    rows="3" 
                                    value={prokerForm.data.description} 
                                    onChange={e=>prokerForm.setData('description',e.target.value)}
                                ></textarea>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Upload Gambar</label>
                                    <input 
                                        type="file" 
                                        onChange={e=>prokerForm.setData('image',e.target.files[0])} 
                                        className="w-full border p-2 rounded"
                                        accept="image/*"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={prokerForm.processing}
                                    className="w-full bg-blue-600 text-white py-2 rounded font-bold disabled:opacity-50"
                                >
                                    {prokerForm.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </form>
                        )}
                        
                        {(modalType.includes('berita')) && <form onSubmit={handleSubmitBerita} className="p-6 space-y-4"><input type="text" placeholder="Judul" className="w-full border p-2 rounded" value={beritaForm.data.title} onChange={e=>beritaForm.setData('title',e.target.value)} required/><textarea placeholder="Konten" className="w-full border p-2 rounded" rows="4" value={beritaForm.data.content} onChange={e=>beritaForm.setData('content',e.target.value)} required></textarea><input type="date" className="w-full border p-2 rounded" value={beritaForm.data.published_at} onChange={e=>beritaForm.setData('published_at',e.target.value)} required/><input type="file" onChange={e=>beritaForm.setData('image',e.target.files[0])}/><button className="w-full bg-blue-600 text-white py-2 rounded font-bold">Simpan</button></form>}
                        
                        {(modalType.includes('bank')) && <form onSubmit={handleSubmitBank} className="p-6 space-y-4"><input type="text" placeholder="Bank" className="w-full border p-2 rounded" value={bankForm.data.bank_name} onChange={e=>bankForm.setData('bank_name',e.target.value)} required/><input type="text" placeholder="No Rek" className="w-full border p-2 rounded" value={bankForm.data.account_number} onChange={e=>bankForm.setData('account_number',e.target.value)} required/><input type="text" placeholder="Atas Nama" className="w-full border p-2 rounded" value={bankForm.data.account_holder} onChange={e=>bankForm.setData('account_holder',e.target.value)} required/><button className="w-full bg-blue-600 text-white py-2 rounded font-bold">Simpan</button></form>}
                        
                        {(modalType.includes('bidang')) && (
                            <form onSubmit={handleSubmitBidang} className="p-6 space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Nama Bidang" 
                                    className="w-full border p-2 rounded" 
                                    value={bidangForm.data.name} 
                                    onChange={e=>bidangForm.setData('name',e.target.value)} 
                                    required
                                />
                                <textarea 
                                    placeholder="Deskripsi" 
                                    className="w-full border p-2 rounded" 
                                    rows="4" 
                                    value={bidangForm.data.description} 
                                    onChange={e=>bidangForm.setData('description',e.target.value)} 
                                    required
                                ></textarea>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Upload Logo/Gambar Bidang</label>
                                    <input 
                                        type="file" 
                                        onChange={e=>bidangForm.setData('image',e.target.files[0])}
                                        className="w-full border p-2 rounded"
                                        accept="image/*"
                                    />
                                    {modalType === 'edit_bidang' && (
                                        <p className="text-xs text-slate-500 mt-1">Kosongkan jika tidak ingin mengubah gambar</p>
                                    )}
                                </div>
                                <button 
                                    type="submit"
                                    disabled={bidangForm.processing}
                                    className="w-full bg-blue-600 text-white py-2 rounded font-bold disabled:opacity-50"
                                >
                                    {bidangForm.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </form>
                        )}
                        
                        {(modalType.includes('pengurus')) && <form onSubmit={handleSubmitPengurus} className="p-6 space-y-4"><input type="text" placeholder="Nama" className="w-full border p-2 rounded" value={pengurusForm.data.name} onChange={e=>pengurusForm.setData('name',e.target.value)} required/><input type="text" placeholder="Jabatan" className="w-full border p-2 rounded" value={pengurusForm.data.position} onChange={e=>pengurusForm.setData('position',e.target.value)} required/><input type="file" onChange={e=>pengurusForm.setData('photo',e.target.files[0])}/><button className="w-full bg-blue-600 text-white py-2 rounded font-bold">Simpan</button></form>}

                       {(modalType.includes('galeri')) && <form onSubmit={handleSubmitGaleri} className="p-6 space-y-4"><input type="number" placeholder="Tahun" className="w-full border p-2 rounded" value={galeriForm.data.year} onChange={e=>galeriForm.setData('year',e.target.value)} required/><input type="text" placeholder="Judul Album" className="w-full border p-2 rounded" value={galeriForm.data.title} onChange={e=>galeriForm.setData('title',e.target.value)} required/><input type="text" placeholder="Link Drive" className="w-full border p-2 rounded" value={galeriForm.data.drive_link} onChange={e=>galeriForm.setData('drive_link',e.target.value)} required/><button className="w-full bg-blue-600 text-white py-2 rounded font-bold">Simpan</button></form>}
                    </div>
                </div>
            )}
        </div>
    );
}