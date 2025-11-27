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

export default function Dashboard({ stats = [], prokers = [], beritas = [], donations = [], bankAccounts = [], galleries = [], bidangs = [], pengurusInti = [], pengurusHarian = [], visiMisi = {}, settings = {} }) {
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
    
    // Form handling for Proker
    const prokerForm = useForm({
        id: '',
        title: '',
        bidang: 'Syiar',
        date: '',
        status: 'Aktif',
        description: '',
        image: null,
    });

    // Form for Berita
    const beritaForm = useForm({
        id: '',
        title: '',
        content: '',
        published_at: '',
        image: null,
    });

    // Form for Bank Account
    const bankForm = useForm({
        id: '',
        bank_name: '',
        account_number: '',
        account_holder: '',
        is_active: true,
        logo: null,
    });

    // Form for Settings
    const settingsForm = useForm({
        youtube_link: settings?.youtube_link || '',
        hero_image: null,
        qris_image: null,
        slider_1: null,
        slider_2: null,
        slider_3: null,
    });

    // Form for Bidang
    const bidangForm = useForm({
        id: '',
        name: '',
        description: '',
        image: null,
        order: 0,
        is_active: true,
    });

    // Form for Pengurus
    const pengurusForm = useForm({
        id: '',
        name: '',
        position: '',
        nim: '',
        prodi: '',
        photo: null,
        type: 'inti',
        order: 0,
        is_active: true,
    });

    // Form for Organization Info
    const orgForm = useForm({
        visi: visiMisi.visi || '',
        misi: visiMisi.misi || '',
        sejarah: visiMisi.sejarah || '',
    });

    // --- HANDLERS ---

    const openAddProker = () => {
        prokerForm.reset();
        setModalType('add_proker');
        setShowModal(true);
    };

    const openEditProker = (item) => {
        prokerForm.setData({
            id: item.id,
            title: item.title,
            bidang: item.bidang,
            date: item.date,
            status: item.status,
            description: item.description || '',
            image: null,
        });
        setModalType('edit_proker');
        setShowModal(true);
    };

    const handleSubmitProker = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', prokerForm.data.title);
        formData.append('bidang', prokerForm.data.bidang);
        formData.append('date', prokerForm.data.date);
        formData.append('description', prokerForm.data.description);
        formData.append('status', prokerForm.data.status);
        
        if (prokerForm.data.image) {
            formData.append('image', prokerForm.data.image);
        }

        if (modalType === 'add_proker') {
            router.post('/admin/prokers', formData, {
                onSuccess: () => { setShowModal(false); prokerForm.reset(); },
                forceFormData: true,
            });
        } else {
            // FIX: Use POST without _method: PUT for file uploads to avoid 405
            router.post(`/admin/prokers/${prokerForm.data.id}`, formData, {
                onSuccess: () => { setShowModal(false); prokerForm.reset(); },
                forceFormData: true,
            });
        }
    };

    const handleDeleteProker = (id) => {
        if (confirm('Yakin hapus proker ini?')) router.delete(`/admin/prokers/${id}`);
    };

    // Berita Handlers
    const openAddBerita = () => {
        beritaForm.reset();
        setModalType('add_berita');
        setShowModal(true);
    };

    const openEditBerita = (item) => {
        beritaForm.setData({
            id: item.id,
            title: item.title,
            content: item.content,
            published_at: item.published_at,
            image: null,
        });
        setModalType('edit_berita');
        setShowModal(true);
    };

    const handleSubmitBerita = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', beritaForm.data.title);
        formData.append('content', beritaForm.data.content);
        formData.append('published_at', beritaForm.data.published_at);
        
        if (beritaForm.data.image) {
            formData.append('image', beritaForm.data.image);
        }

        if (modalType === 'add_berita') {
            router.post('/admin/berita', formData, {
                onSuccess: () => { setShowModal(false); beritaForm.reset(); },
                forceFormData: true,
            });
        } else {
            router.post(`/admin/berita/${beritaForm.data.id}`, formData, {
                onSuccess: () => { setShowModal(false); beritaForm.reset(); },
                forceFormData: true,
            });
        }
    };

    const handleDeleteBerita = (id) => {
        if (confirm('Yakin hapus berita ini?')) router.delete(`/admin/berita/${id}`);
    };

    // Bank Handlers
    const openAddBank = () => {
        bankForm.reset();
        setModalType('add_bank');
        setShowModal(true);
    };

    const openEditBank = (item) => {
        bankForm.setData({
            id: item.id,
            bank_name: item.bank_name,
            account_number: item.account_number,
            account_holder: item.account_holder,
            is_active: item.is_active,
            logo: null,
        });
        setModalType('edit_bank');
        setShowModal(true);
    };

    const handleSubmitBank = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bank_name', bankForm.data.bank_name);
        formData.append('account_number', bankForm.data.account_number);
        formData.append('account_holder', bankForm.data.account_holder);
        formData.append('is_active', bankForm.data.is_active ? '1' : '0');
        
        if (bankForm.data.logo) {
            formData.append('logo', bankForm.data.logo);
        }

        if (modalType === 'add_bank') {
            router.post('/admin/bank-accounts', formData, {
                onSuccess: () => { setShowModal(false); bankForm.reset(); },
                forceFormData: true,
            });
        } else {
            router.post(`/admin/bank-accounts/${bankForm.data.id}`, formData, {
                onSuccess: () => { setShowModal(false); bankForm.reset(); },
                forceFormData: true,
            });
        }
    };

    const handleDeleteBank = (id) => {
        if (confirm('Yakin hapus rekening ini?')) router.delete(`/admin/bank-accounts/${id}`);
    };

    // Settings Handler
    const handleSubmitSettings = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('youtube_link', settingsForm.data.youtube_link);
        
        if (settingsForm.data.hero_image) formData.append('hero_image', settingsForm.data.hero_image);
        if (settingsForm.data.qris_image) formData.append('qris_image', settingsForm.data.qris_image);
        if (settingsForm.data.slider_1) formData.append('slider_1', settingsForm.data.slider_1);
        if (settingsForm.data.slider_2) formData.append('slider_2', settingsForm.data.slider_2);
        if (settingsForm.data.slider_3) formData.append('slider_3', settingsForm.data.slider_3);

        router.post('/admin/settings', formData, {
            forceFormData: true,
        });
    };

    // --- TAMBAHAN FUNGSI YANG HILANG ---
    const handleSubmitOrgInfo = (e) => {
        e.preventDefault();
        // Menggunakan route settings untuk menyimpan visi, misi, sejarah
        router.post('/admin/settings', {
            visi: orgForm.data.visi,
            misi: orgForm.data.misi,
            sejarah: orgForm.data.sejarah,
        }, {
            preserveScroll: true,
        });
    };

    // --- PENGURUS HANDLERS ---
    const openAddPengurus = () => {
        // Reset form tapi pertahankan type (inti/harian) jika sudah diset tombol
        const currentType = pengurusForm.data.type; 
        pengurusForm.reset();
        pengurusForm.setData('type', currentType);
        setModalType('add_pengurus');
        setShowModal(true);
    };

    const openEditPengurus = (item) => {
        pengurusForm.setData({
            id: item.id,
            name: item.name,
            position: item.role || item.position, // Handle perbedaan nama field jika ada
            nim: item.nim || '',
            prodi: item.prodi || '',
            photo: null,
            type: item.type,
            order: item.order || 0,
            is_active: item.is_active !== undefined ? item.is_active : true,
        });
        setModalType('edit_pengurus');
        setShowModal(true);
    };

    const handleSubmitPengurus = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', pengurusForm.data.name);
        formData.append('role', pengurusForm.data.position); // Mapping position ke role di DB
        formData.append('type', pengurusForm.data.type);
        // Tambahkan field opsional jika ada di database migration
        if (pengurusForm.data.nim) formData.append('nim', pengurusForm.data.nim);
        if (pengurusForm.data.prodi) formData.append('prodi', pengurusForm.data.prodi);
        
        if (pengurusForm.data.photo) {
            formData.append('image', pengurusForm.data.photo); // Mapping photo ke image di DB
        }

        const routeName = modalType === 'add_pengurus' ? '/admin/pengurus' : `/admin/pengurus/${pengurusForm.data.id}`;
        router.post(routeName, formData, {
            onSuccess: () => { setShowModal(false); pengurusForm.reset(); },
            forceFormData: true,
        });
    };

    const handleDeletePengurus = (id) => {
        if (confirm('Hapus pengurus ini?')) router.delete(`/admin/pengurus/${id}`);
    };

    // --- BIDANG HANDLERS ---
    const openAddBidang = () => {
        bidangForm.reset();
        setModalType('add_bidang');
        setShowModal(true);
    };

    const openEditBidang = (item) => {
        bidangForm.setData({
            id: item.id,
            name: item.name,
            description: item.description,
            image: null,
            order: item.order || 0,
            is_active: item.is_active !== undefined ? item.is_active : true,
        });
        setModalType('edit_bidang');
        setShowModal(true);
    };

    const handleSubmitBidang = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', bidangForm.data.name);
        formData.append('description', bidangForm.data.description);
        if (bidangForm.data.image) {
            formData.append('image', bidangForm.data.image);
        }

        const routeName = modalType === 'add_bidang' ? '/admin/bidang' : `/admin/bidang/${bidangForm.data.id}`;
        router.post(routeName, formData, {
            onSuccess: () => { setShowModal(false); bidangForm.reset(); },
            forceFormData: true,
        });
    };

    const handleDeleteBidang = (id) => {
        if (confirm('Hapus bidang ini?')) router.delete(`/admin/bidang/${id}`);
    };

    const handleDonationStatus = (id, status) => {
        router.post(`/admin/donations/${id}/status`, { status });
    };

    const handleLogout = () => {
        router.visit('/');
    };

    const getIcon = (iconName) => {
        const icons = { DollarSign, Eye, MessageSquare, Calendar };
        return icons[iconName] || LayoutDashboard;
    };

    // --- RENDER FUNCTIONS ---

    const renderDashboard = () => (
        <div className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {(stats || []).map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all hover:-translate-y-1">
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100`}>
                            {idx === 0 && <DollarSign size={28} />}
                            {idx === 1 && <Eye size={28} />}
                            {idx === 2 && <Newspaper size={28} />}
                            {idx === 3 && <Calendar size={28} />}
                        </div>
                        <div>
                            <h4 className="text-3xl font-bold text-slate-800">{stat.val}</h4>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800">Statistik Donasi</h3>
                                <p className="text-xs text-slate-500">Overview donasi masuk tahun ini</p>
                            </div>
                        </div>
                        <select className="bg-slate-50 border border-slate-200 rounded-lg text-sm px-4 py-2 outline-none focus:border-blue-500 font-medium text-slate-600">
                            <option>Tahun 2024</option>
                            <option>Tahun 2023</option>
                        </select>
                    </div>
                    
                    <div className="h-64 flex items-end justify-between gap-4 px-2">
                        {[45, 60, 35, 80, 55, 90, 70, 65, 50, 75, 85, 95].map((val, i) => (
                            <div key={i} className="w-full flex flex-col items-center gap-3 group cursor-pointer">
                                <div className="w-full bg-slate-100 rounded-t-xl relative h-full flex items-end overflow-hidden">
                                    <div 
                                        className="w-full bg-blue-500 group-hover:bg-blue-600 transition-all duration-500 rounded-t-xl relative" 
                                        style={{ height: `${val}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {val}%
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">{['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg text-slate-800 mb-6">Aktivitas Terbaru</h3>
                    <div className="space-y-6">
                        {donations.slice(0, 4).map((d) => (
                            <div key={d.id} className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                    {d.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 text-sm truncate">{d.name}</h4>
                                    <p className="text-xs text-slate-500 truncate">Donasi {d.campaign}</p>
                                </div>
                                <span className="font-bold text-emerald-600 text-sm">+{d.amount/1000}k</span>
                            </div>
                        ))}
                        <button onClick={() => setActiveTab('donasi')} className="w-full py-3 text-sm text-blue-600 font-bold bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors mt-2">
                            Lihat Detail Donasi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProker = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Daftar Program Kerja</h3>
                <button 
                    onClick={openAddProker}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} /> Tambah Proker
                </button>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-800 font-bold">
                    <tr>
                        <th className="p-4">Judul Kegiatan</th>
                        <th className="p-4">Bidang</th>
                        <th className="p-4">Waktu</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {prokers.map((item) => (
                        <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                            <td className="p-4 font-medium text-slate-800">{item.title}</td>
                            <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{item.bidang}</span></td>
                            <td className="p-4">{item.date}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => openEditProker(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteProker(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {prokers.length === 0 && (
                        <tr>
                            <td colSpan="5" className="p-8 text-center text-slate-400">Belum ada data program kerja.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const renderBerita = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Daftar Berita</h3>
                <button 
                    onClick={openAddBerita}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} /> Tambah Berita
                </button>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-800 font-bold">
                    <tr>
                        <th className="p-4">Judul</th>
                        <th className="p-4">Tanggal Publikasi</th>
                        <th className="p-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {beritas.map((item) => (
                        <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                            <td className="p-4 font-medium text-slate-800">{item.title}</td>
                            <td className="p-4">{item.published_at}</td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => openEditBerita(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteBerita(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {beritas.length === 0 && (
                        <tr>
                            <td colSpan="3" className="p-8 text-center text-slate-400">Belum ada berita.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const renderDonasi = () => (
        <div className="space-y-8 animate-fade-in">
            {/* QRIS Settings Section (Moved here) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-start gap-6">
                    <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-800 mb-2">Pengaturan QRIS Donasi</h3>
                        <p className="text-slate-500 text-sm mb-6">Upload gambar QRIS terbaru untuk ditampilkan di halaman donasi publik.</p>
                        
                        <form onSubmit={handleSubmitSettings} className="flex items-end gap-4">
                            <div className="flex-1">
                                <input 
                                    type="file" 
                                    onChange={e => settingsForm.setData('qris_image', e.target.files[0])}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm" 
                                />
                            </div>
                            <button type="submit" disabled={settingsForm.processing} className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 text-sm">
                                {settingsForm.processing ? 'Menyimpan...' : 'Update QRIS'}
                            </button>
                        </form>
                    </div>
                    {settings.qris_image && (
                        <div className="w-32 h-32 border-2 border-slate-100 rounded-xl p-2 bg-white shrink-0">
                            <img src={`/storage/${settings.qris_image}`} alt="QRIS" className="w-full h-full object-contain" />
                        </div>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Donatur List */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="font-bold text-lg text-slate-800">Daftar Donatur Masuk</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-slate-800 font-bold">
                                <tr>
                                    <th className="p-4">Nama</th>
                                    <th className="p-4">Jumlah</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((item) => (
                                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                        <td className="p-4 font-medium">{item.name}</td>
                                        <td className="p-4 font-bold text-emerald-600">Rp {item.amount.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                item.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 
                                                item.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                                {item.status === 'verified' ? 'OK' : item.status === 'rejected' ? 'Tolak' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {item.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleDonationStatus(item.id, 'verified')} className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg" title="Verifikasi"><CheckCircle size={18} /></button>
                                                        <button onClick={() => handleDonationStatus(item.id, 'rejected')} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg" title="Tolak"><XCircle size={18} /></button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bank Accounts */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-800">Rekening Bank</h3>
                        <button onClick={openAddBank} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"><Plus size={20} /></button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {bankAccounts.map((item) => (
                            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-800">{item.bank_name}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${item.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.is_active ? 'Aktif' : 'Nonaktif'}</span>
                                    </div>
                                    <p className="font-mono text-sm text-slate-600">{item.account_number}</p>
                                    <p className="text-xs text-slate-400">{item.account_holder}</p>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => openEditBank(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteBank(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTentangKami = () => (
        <div className="space-y-8 animate-fade-in">
            {/* Visi Misi Sejarah */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="font-bold text-lg text-slate-800 mb-6">Informasi Organisasi</h3>
                <form onSubmit={handleSubmitOrgInfo} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Visi</label>
                        <textarea 
                            value={orgForm.data.visi}
                            onChange={e => orgForm.setData('visi', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none" 
                            rows="3"
                            placeholder="Masukkan visi organisasi..."
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Misi</label>
                        <textarea 
                            value={orgForm.data.misi}
                            onChange={e => orgForm.setData('misi', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none" 
                            rows="5"
                            placeholder="Masukkan misi organisasi..."
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Sejarah</label>
                        <textarea 
                            value={orgForm.data.sejarah}
                            onChange={e => orgForm.setData('sejarah', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none" 
                            rows="6"
                            placeholder="Masukkan sejarah organisasi..."
                        ></textarea>
                    </div>
                    <button type="submit" disabled={orgForm.processing} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50">
                        {orgForm.processing ? 'Menyimpan...' : 'Simpan Informasi'}
                    </button>
                </form>
            </div>

            {/* Bidang Management */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-800">Manajemen Bidang</h3>
                    <button 
                        onClick={openAddBidang}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={16} /> Tambah Bidang
                    </button>
                </div>
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-800 font-bold">
                        <tr>
                            <th className="p-4">Nama Bidang</th>
                            <th className="p-4">Deskripsi</th>
                            <th className="p-4">Urutan</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bidangs.map((item) => (
                            <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                <td className="p-4 font-medium text-slate-800">{item.name}</td>
                                <td className="p-4 max-w-xs truncate">{item.description}</td>
                                <td className="p-4">{item.order}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {item.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => openEditBidang(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit size={16} /></button>
                                        <button onClick={() => handleDeleteBidang(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pengurus Management */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Pengurus Inti */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-800">Pengurus Inti</h3>
                        <button 
                            onClick={() => { pengurusForm.setData('type', 'inti'); openAddPengurus(); }}
                            className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {pengurusInti.map((item) => (
                            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                                        {item.photo ? (
                                            <img src={`/storage/${item.photo}`} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">{item.name.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{item.name}</h4>
                                        <p className="text-sm text-slate-500">{item.position}</p>
                                        {item.nim && <p className="text-xs text-slate-400">{item.nim} - {item.prodi}</p>}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => openEditPengurus(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => handleDeletePengurus(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pengurus Harian */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-800">Pengurus Harian</h3>
                        <button 
                            onClick={() => { pengurusForm.setData('type', 'harian'); openAddPengurus(); }}
                            className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {pengurusHarian.map((item) => (
                            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                                        {item.photo ? (
                                            <img src={`/storage/${item.photo}`} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">{item.name.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{item.name}</h4>
                                        <p className="text-sm text-slate-500">{item.position}</p>
                                        {item.nim && <p className="text-xs text-slate-400">{item.nim} - {item.prodi}</p>}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => openEditPengurus(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => handleDeletePengurus(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPengaturan = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="font-bold text-lg text-slate-800 mb-6">Pengaturan Beranda & Video</h3>
                <form onSubmit={handleSubmitSettings} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Link Video YouTube</label>
                        <input 
                            type="url" 
                            value={settingsForm.data.youtube_link}
                            onChange={e => settingsForm.setData('youtube_link', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none" 
                            placeholder="https://www.youtube.com/embed/..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Gambar Hero Utama (Beranda)</label>
                        <input 
                            type="file" 
                            onChange={e => settingsForm.setData('hero_image', e.target.files[0])}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none" 
                        />
                        {settings.hero_image && (
                            <div className="mt-2">
                                <img src={`/storage/${settings.hero_image}`} alt="Preview" className="h-32 rounded-lg object-cover border" />
                            </div>
                        )}
                    </div>

                    <div className="border-t pt-6">
                        <h4 className="font-bold text-slate-800 mb-4">Slider Galeri (Max 3 Gambar)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map(num => (
                                <div key={num} className="space-y-3">
                                    <label className="text-sm font-medium text-slate-600">Slide {num}</label>
                                    <input 
                                        type="file" 
                                        onChange={e => settingsForm.setData(`slider_${num}`, e.target.files[0])}
                                        className="w-full text-xs text-slate-500" 
                                    />
                                    {settings.slider_images && settings.slider_images[num - 1] && (
                                        <img src={`/storage/${settings.slider_images[num - 1]}`} alt={`Slider ${num}`} className="w-full h-24 rounded-lg object-cover border" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" disabled={settingsForm.processing} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50">
                        {settingsForm.processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                    </button>
                </form>
            </div>
        </div>
    );

    const renderGaleri = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Arsip Galeri Tahunan</h3>
                <button 
                    onClick={() => { setModalType('add_gallery'); setShowModal(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} /> Tambah Arsip
                </button>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-800 font-bold">
                    <tr>
                        <th className="p-4">Tahun</th>
                        <th className="p-4">Judul Album</th>
                        <th className="p-4">Jumlah Foto</th>
                        <th className="p-4">Link Drive</th>
                        <th className="p-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {galleries.map((item) => (
                        <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                            <td className="p-4 font-bold text-slate-800">{item.year}</td>
                            <td className="p-4 font-medium">{item.title}</td>
                            <td className="p-4">{item.count}</td>
                            <td className="p-4 text-blue-600">
                                <a href={item.link} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                                    Link Drive <ExternalLink size={12} />
                                </a>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit size={16} /></button>
                                    <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const MENU_ITEMS = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, render: renderDashboard },
        { id: 'proker', label: 'Program Kerja', icon: Calendar, render: renderProker },
        { id: 'berita', label: 'Berita', icon: Newspaper, render: renderBerita },
        { id: 'donasi', label: 'Donasi & Rekening', icon: DollarSign, render: renderDonasi },
        { id: 'tentang-kami', label: 'Tentang Kami', icon: Users, render: renderTentangKami },
        { id: 'galeri', label: 'Galeri & Arsip', icon: ImageIcon, render: renderGaleri },
        { id: 'pengaturan', label: 'Pengaturan', icon: Settings, render: renderPengaturan },
    ];

    return (
        <div className="flex h-screen bg-slate-50 animate-fade-in font-sans text-slate-800">
            <Head title="Admin Dashboard" />
            
            {/* Toast Notification */}
            {showToast && <Toast message="Operasi berhasil dilakukan!" onClose={() => setShowToast(false)} />}

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">R</div>
                    <span className="font-bold text-lg tracking-wide">RISPOL ADMIN</span>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    {MENU_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium text-sm">Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm">
                    <h2 className="text-xl font-bold capitalize">{activeTab.replace('-', ' ')}</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-800">Admin Super</p>
                            <p className="text-xs text-slate-500">Administrator</p>
                        </div>
                        <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" alt="Admin" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    {MENU_ITEMS.find(item => item.id === activeTab)?.render()}
                </main>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-800">
                                {modalType === 'add_proker' ? 'Tambah Program Kerja' : 
                                 modalType === 'edit_proker' ? 'Edit Program Kerja' :
                                 modalType === 'add_berita' ? 'Tambah Berita' :
                                 modalType === 'edit_berita' ? 'Edit Berita' :
                                 modalType === 'add_bank' ? 'Tambah Rekening' :
                                 modalType === 'edit_bank' ? 'Edit Rekening' :
                                 modalType === 'add_bidang' ? 'Tambah Bidang' :
                                 modalType === 'edit_bidang' ? 'Edit Bidang' :
                                 modalType === 'add_pengurus' ? 'Tambah Pengurus' :
                                 modalType === 'edit_pengurus' ? 'Edit Pengurus' :
                                 modalType === 'add_gallery' ? 'Tambah Arsip Galeri' : 'Edit Data'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                        </div>
                        
                        {/* PROKER FORM */}
                        {(modalType === 'add_proker' || modalType === 'edit_proker') && (
                            <form onSubmit={handleSubmitProker} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Judul Kegiatan</label>
                                    <input 
                                        type="text" 
                                        value={prokerForm.data.title}
                                        onChange={e => prokerForm.setData('title', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none" 
                                        placeholder="Contoh: Kajian Akbar" 
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Bidang</label>
                                        <select 
                                            value={prokerForm.data.bidang}
                                            onChange={e => prokerForm.setData('bidang', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                        >
                                            <option>Syiar</option>
                                            <option>Mentoring</option>
                                            <option>Ketakmiran</option>
                                            <option>Humas</option>
                                            <option>Kaderisasi</option>
                                            <option>Keputrian</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal</label>
                                        <input 
                                            type="date" 
                                            value={prokerForm.data.date}
                                            onChange={e => prokerForm.setData('date', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none" 
                                        />
                                    </div>
                                </div>
                                {modalType === 'edit_proker' && (
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                                        <select 
                                            value={prokerForm.data.status}
                                            onChange={e => prokerForm.setData('status', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                        >
                                            <option>Aktif</option>
                                            <option>Selesai</option>
                                        </select>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Deskripsi</label>
                                    <textarea 
                                        value={prokerForm.data.description}
                                        onChange={e => prokerForm.setData('description', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none" 
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Upload Gambar</label>
                                    <input 
                                        type="file" 
                                        onChange={e => prokerForm.setData('image', e.target.files[0])}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none" 
                                    />
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-slate-600 font-bold hover:bg-slate-100">Batal</button>
                                    <button type="submit" disabled={prokerForm.processing} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50">
                                        <Save size={16} /> {prokerForm.processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* BERITA FORM */}
                        {(modalType === 'add_berita' || modalType === 'edit_berita') && (
                            <form onSubmit={handleSubmitBerita} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Judul Berita</label>
                                    <input 
                                        type="text" 
                                        value={beritaForm.data.title}
                                        onChange={e => beritaForm.setData('title', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Konten</label>
                                    <textarea 
                                        value={beritaForm.data.content}
                                        onChange={e => beritaForm.setData('content', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Tanggal Publikasi</label>
                                    <input 
                                        type="date" 
                                        value={beritaForm.data.published_at}
                                        onChange={e => beritaForm.setData('published_at', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Gambar</label>
                                    <input 
                                        type="file" 
                                        onChange={e => beritaForm.setData('image', e.target.files[0])}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                    />
                                </div>
                                <div className="pt-4 border-t flex justify-end gap-3">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg font-bold hover:bg-slate-100">Batal</button>
                                    <button type="submit" disabled={beritaForm.processing} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700">
                                        {beritaForm.processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* BANK FORM */}
                        {(modalType === 'add_bank' || modalType === 'edit_bank') && (
                            <form onSubmit={handleSubmitBank} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Nama Bank</label>
                                    <input 
                                        type="text" 
                                        value={bankForm.data.bank_name}
                                        onChange={e => bankForm.setData('bank_name', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        placeholder="BSI / BRI / BCA"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Nomor Rekening</label>
                                    <input 
                                        type="text" 
                                        value={bankForm.data.account_number}
                                        onChange={e => bankForm.setData('account_number', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Nama Pemilik</label>
                                    <input 
                                        type="text" 
                                        value={bankForm.data.account_holder}
                                        onChange={e => bankForm.setData('account_holder', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        required
                                    />
                                </div>
                                {modalType === 'edit_bank' && (
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            checked={bankForm.data.is_active}
                                            onChange={e => bankForm.setData('is_active', e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Aktif</label>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-bold mb-1">Logo Bank (Opsional)</label>
                                    <input 
                                        type="file" 
                                        onChange={e => bankForm.setData('logo', e.target.files[0])}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                    />
                                </div>
                                <div className="pt-4 border-t flex justify-end gap-3">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg font-bold hover:bg-slate-100">Batal</button>
                                    <button type="submit" disabled={bankForm.processing} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700">
                                        {bankForm.processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* BIDANG FORM */}
                        {(modalType === 'add_bidang' || modalType === 'edit_bidang') && (
                            <form onSubmit={handleSubmitBidang} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Nama Bidang</label>
                                    <input 
                                        type="text" 
                                        value={bidangForm.data.name}
                                        onChange={e => bidangForm.setData('name', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Deskripsi</label>
                                    <textarea 
                                        value={bidangForm.data.description}
                                        onChange={e => bidangForm.setData('description', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Urutan</label>
                                        <input 
                                            type="number" 
                                            value={bidangForm.data.order}
                                            onChange={e => bidangForm.setData('order', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        />
                                    </div>
                                    {modalType === 'edit_bidang' && (
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                checked={bidangForm.data.is_active}
                                                onChange={e => bidangForm.setData('is_active', e.target.checked)}
                                                className="w-4 h-4"
                                            />
                                            <label className="text-sm font-medium">Aktif</label>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Gambar Bidang</label>
                                    <input 
                                        type="file" 
                                        onChange={e => bidangForm.setData('image', e.target.files[0])}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                    />
                                </div>
                                <div className="pt-4 border-t flex justify-end gap-3">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg font-bold hover:bg-slate-100">Batal</button>
                                    <button type="submit" disabled={bidangForm.processing} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700">
                                        {bidangForm.processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* PENGURUS FORM */}
                        {(modalType === 'add_pengurus' || modalType === 'edit_pengurus') && (
                            <form onSubmit={handleSubmitPengurus} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Nama</label>
                                        <input 
                                            type="text" 
                                            value={pengurusForm.data.name}
                                            onChange={e => pengurusForm.setData('name', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Jabatan</label>
                                        <input 
                                            type="text" 
                                            value={pengurusForm.data.position}
                                            onChange={e => pengurusForm.setData('position', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">NIM</label>
                                        <input 
                                            type="text" 
                                            value={pengurusForm.data.nim}
                                            onChange={e => pengurusForm.setData('nim', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Program Studi</label>
                                        <input 
                                            type="text" 
                                            value={pengurusForm.data.prodi}
                                            onChange={e => pengurusForm.setData('prodi', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Tipe</label>
                                        <select 
                                            value={pengurusForm.data.type}
                                            onChange={e => pengurusForm.setData('type', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        >
                                            <option value="inti">Pengurus Inti</option>
                                            <option value="harian">Pengurus Harian</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Urutan</label>
                                        <input 
                                            type="number" 
                                            value={pengurusForm.data.order}
                                            onChange={e => pengurusForm.setData('order', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                        />
                                    </div>
                                </div>
                                {modalType === 'edit_pengurus' && (
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            checked={pengurusForm.data.is_active}
                                            onChange={e => pengurusForm.setData('is_active', e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Aktif</label>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-bold mb-1">Foto</label>
                                    <input 
                                        type="file" 
                                        onChange={e => pengurusForm.setData('photo', e.target.files[0])}
                                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500 outline-none" 
                                    />
                                </div>
                                <div className="pt-4 border-t flex justify-end gap-3">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg font-bold hover:bg-slate-100">Batal</button>
                                    <button type="submit" disabled={pengurusForm.processing} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700">
                                        {pengurusForm.processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}