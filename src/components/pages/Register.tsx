import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Lock, User, GraduationCap, Users, Globe, Phone, Building2, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Page } from '../../App';

interface RegisterProps {
  onNavigate: (page: Page) => void;
  onSwitchToSignIn: () => void;
}

type UserType = 'mahasiswa' | 'alumni' | 'umum' | null;

// URL Backend Anda
const API_URL = 'http://localhost:5000';

export function Register({ onNavigate, onSwitchToSignIn }: RegisterProps) {
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    study_program: '',
    batch: '',
    graduation_year: '',
    email: '',
    phone: '',
    current_job: '',
    type_account: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle perubahan input
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(`Input changed: ${e.target.name} = ${e.target.value}`); 
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const userTypes = [
    {
      type: 'mahasiswa' as UserType,
      title: 'Mahasiswa',
      description: 'Mahasiswa aktif UPN Veteran Yogyakarta',
      icon: GraduationCap,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      type: 'alumni' as UserType,
      title: 'Alumni',
      description: 'Alumni UPN Veteran Yogyakarta',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      type: 'umum' as UserType,
      title: 'Umum',
      description: 'Perusahaan / Mitra / Masyarakat Umum',
      icon: Globe,
      color: 'bg-amber-500 hover:bg-amber-600'
    }
  ];

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    console.log('--- Tombol Daftar Diklik ---');
    setLoading(true);
    setError(null);

    console.log('Mengecek password...');
    if (formData.password !== formData.confirmPassword) {
      console.error('VALIDASI GAGAL: Password tidak cocok!');
      setError('Password dan Konfirmasi Password tidak cocok');
      setLoading(false);
      return; // Stop function
    }

    console.log('Password cocok. Menyiapkan data...');
    
    let endpoint = '';
    let body: any = {};

    if (selectedType === 'mahasiswa') {
      endpoint = `${API_URL}/auth/register/mahasiswa`;
      body = {
        name: formData.name,
        nim: formData.nim,
        study_program: formData.study_program,
        batch: parseInt(formData.batch, 10),
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };
    } else if (selectedType === 'alumni') {
      endpoint = `${API_URL}/auth/register/alumni`;
      body = {
        name: formData.name,
        nim: formData.nim,
        study_program: formData.study_program,
        graduation_year: parseInt(formData.graduation_year, 10),
        email: formData.email,
        phone: formData.phone,
        current_job: formData.current_job,
        password: formData.password,
      };
    } else if (selectedType === 'umum') {
      endpoint = `${API_URL}/auth/register/umum`;
      body = {
        name: formData.name,
        type_account: formData.type_account,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
      };
    }

    console.log(`Mencoba mengirim data ke: ${endpoint}`); 
    console.log('Data (body):', JSON.stringify(body));

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      console.log(`Response status: ${response.status}`); 
      const data = await response.json();

      if (!response.ok) {
        console.error('Backend merespons dengan error:', data.error); 
        throw new Error(data.error || 'Registrasi gagal');
      }

      console.log('Registrasi sukses!'); 
      alert('Registrasi berhasil! Silakan Sign In.');
      onSwitchToSignIn(); 

    } catch (err: any) {
      console.error('Fetch GAGAL:', err.message); 
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedType) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl mb-4">Daftar Akun Baru</h1>
              <p className="text-xl text-gray-600">Pilih tipe akun yang sesuai dengan Anda</p>
            </div>
  
            <div className="grid md:grid-cols-3 gap-6">
              {userTypes.map((userType) => (
                <button
                  key={userType.type}
                  onClick={() => setSelectedType(userType.type)}
                  className="bg-white rounded-lg p-8 border-2 border-gray-200 hover:border-[#0f5c3c] hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className={`w-20 h-20 ${userType.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-colors`}>
                    <userType.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl mb-2">{userType.title}</h3>
                  <p className="text-gray-600">{userType.description}</p>
                </button>
              ))}
            </div>
  
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Sudah punya akun?{' '}
                <button
                  onClick={onSwitchToSignIn}
                  className="text-[#0f5c3c] hover:underline"
                >
                  Sign in di sini
                </button>
              </p>
            </div>
          </div>
        </div>
      );
  }

  const currentUserType = userTypes.find(ut => ut.type === selectedType)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl p-8">

          <button
            onClick={() => {
              setSelectedType(null);
              setError(null);
            }}
            className="text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-2"
          >
            ← Kembali ke pilihan tipe akun
          </button>


          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${currentUserType.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <currentUserType.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl mb-2">Daftar Akun Baru</h2>
            <p className="text-gray-600">Daftar sebagai {currentUserType.title}</p>
          </div>


          <form onSubmit={handleRegister} className="space-y-5">

            {selectedType === 'mahasiswa' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Nama lengkap" className="pl-10" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">NIM</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input name="nim" value={formData.nim} onChange={handleChange} placeholder="Nomor Induk Mahasiswa" className="pl-10" required />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Program Studi</label>
                    <select name="study_program" value={formData.study_program} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required>
                      <option value="">Pilih Program Studi</option>
                      <option>Teknik Informatika</option>
                      <option>Sistem Informasi</option>
                      <option>Teknik Geologi</option>
                      <option>Teknik Kimia</option>
                      <option>Manajemen</option>
                      <option>Akuntansi</option>
                      <option>Ilmu Komunikasi</option>
                      <option>Hubungan Internasional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Angkatan</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input name="batch" value={formData.batch} onChange={handleChange} placeholder="2021" type="number" className="pl-10" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email UPN</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="nama@student.upnyk.ac.id" className="pl-10" required />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Nomor Telepon</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="08xxxxxxxxxx" className="pl-10" required />
                  </div>
                </div>
              </>
            )}


            {selectedType === 'alumni' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Nama lengkap" className="pl-10" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">NIM (saat kuliah)</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input name="nim" value={formData.nim} onChange={handleChange} placeholder="Nomor Induk Mahasiswa" className="pl-10" required />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Program Studi</label>
                    <select name="study_program" value={formData.study_program} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required>
                      <option value="">Pilih Program Studi</option>
                      <option>Teknik Informatika</option>
                      <option>Sistem Informasi</option>
                      <option>Teknik Geologi</option>
                      <option>Teknik Kimia</option>
                      <option>Manajemen</option>
                      <option>Akuntansi</option>
                      <option>Ilmu Komunikasi</option>
                      <option>Hubungan Internasional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Tahun Lulus</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input name="graduation_year" value={formData.graduation_year} onChange={handleChange} placeholder="2020" type="number" className="pl-10" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@domain.com" className="pl-10" required />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Nomor Telepon</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="08xxxxxxxxxx" className="pl-10" required />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Pekerjaan Saat Ini (Opsional)</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input name="current_job" value={formData.current_job} onChange={handleChange} placeholder="Nama perusahaan / posisi" className="pl-10" />
                  </div>
                </div>
              </>
            )}


            {selectedType === 'umum' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Nama Lengkap / Nama Perusahaan</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Nama lengkap / Nama perusahaan" className="pl-10" required />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Tipe Akun</label>
                  <select name="type_account" value={formData.type_account} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required>
                    <option value="">Pilih Tipe Akun</option>
                    <option>Perusahaan</option>
                    <option>Mitra Industri</option>
                    <option>Pemerintah</option>
                    <option>Individu / Masyarakat</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@domain.com" className="pl-10" required />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Nomor Telepon</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="08xxxxxxxxxx" className="pl-10" required />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Alamat Perusahaan / Domisili</label>
                  <Input name="address" value={formData.address} onChange={handleChange} placeholder="Alamat lengkap" required />
                </div>
              </>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Minimal 8 karakter" className="pl-10" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Konfirmasi Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="Ulangi password" className="pl-10" required />
                </div>
              </div>
            </div>

            {/* Tampilkan Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="w-4 h-4 mt-1" required />
                <span className="text-sm text-gray-600">
                  Saya menyetujui <a href="#" className="text-[#0f5c3c] hover:underline">Syarat & Ketentuan</a> dan <a href="#" className="text-[#0f5c3c] hover:underline">Kebijakan Privasi</a>
                </span>
              </label>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[#0f5c3c] hover:bg-[#0d4a30] text-white py-6">
              {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <button
                onClick={onSwitchToSignIn}
                className="text-[#0f5c3c] hover:underline"
              >
                Sign in di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}