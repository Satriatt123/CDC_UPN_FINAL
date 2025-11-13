import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Lock, GraduationCap, Users, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Page } from '../../App';

interface SignInProps {
  onNavigate: (page: Page) => void;
  onSwitchToRegister: () => void;
}

type UserType = 'mahasiswa' | 'alumni' | 'umum' | null;

// URL Backend Anda
const API_URL = 'http://localhost:5000';

export function SignIn({ onNavigate, onSwitchToRegister }: SignInProps) {
  const [selectedType, setSelectedType] = useState<UserType>(null);

  // --- State untuk Form Login ---
  const [identifier, setIdentifier] = useState(''); // NIM atau Email
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // ------------------------------

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

  // --- Fungsi Handle Sign In (Sudah di-update untuk memanggil API) ---
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const body = {
      identifier: identifier.trim(),
      password: password,
    };
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        // Jika status kode 400 atau 404, tampilkan error dari backend
        throw new Error(data.error || 'Login gagal. Silakan coba lagi.');
      }

      // --- LOGIN BERHASIL ---
      // 1. Simpan token dan data pengguna di localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 2. Arahkan ke Halaman Home
      alert('Login berhasil! Selamat datang.');
      onNavigate('home');

    } catch (err: any) {
      // Tangkap dan tampilkan error
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedType) {
    // Tampilan untuk memilih tipe akun
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl mb-4">Sign In</h1>
              <p className="text-xl text-gray-600">Pilih tipe akun Anda untuk melanjutkan</p>
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
                Belum punya akun?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-[#0f5c3c] hover:underline"
                >
                  Daftar sekarang
                </button>
              </p>
            </div>
          </div>
        </div>
      );
  }

  const currentUserType = userTypes.find(ut => ut.type === selectedType)!;

  // Placeholder yang sesuai berdasarkan tipe akun
  const getPlaceholder = () => {
    if (selectedType === 'mahasiswa') return 'Masukkan NIM';
    // Backend Anda di auth.js menerima NIM atau Email untuk alumni
    if (selectedType === 'alumni') return 'Masukkan NIM atau Email'; 
    return 'Masukkan Email';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Back button */}
          <button
            onClick={() => {
              setSelectedType(null);
              setError(null); // Hapus error saat kembali
              setIdentifier(''); // Reset identifier
              setPassword(''); // Reset password
            }}
            className="text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-2"
          >
            ← Kembali ke pilihan tipe akun
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${currentUserType.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <currentUserType.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl mb-2">Sign In</h2>
            <p className="text-gray-600">Sign in sebagai {currentUserType.title}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">
                {selectedType === 'mahasiswa' ? 'NIM' : selectedType === 'alumni' ? 'NIM / Email' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={getPlaceholder()}
                  className="pl-10"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Masukkan password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Tampilkan Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>
              <a href="#" className="text-sm text-[#0f5c3c] hover:underline">
                Lupa password?
              </a>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[#0f5c3c] hover:bg-[#0d4a30] text-white py-6">
              {loading ? 'Loading...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-[#0f5c3c] hover:underline"
              >
                Daftar sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}