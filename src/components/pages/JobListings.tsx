import { Search, MapPin, Building2, Clock, Briefcase, ArrowLeft } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Page } from '../../App';
import { useState, useEffect } from 'react'; // <-- Import hook

// URL Backend Anda
const API_URL = 'http://localhost:5000';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  salary: string;
  description: string;
  posted: string; // 'posted' sudah diformat oleh backend
}

interface JobListingsProps {
  onNavigate?: (page: Page) => void;
}

export function JobListings({ onNavigate }: JobListingsProps) {
  // 1. Hapus array 'jobs' yang lama
  
  // 2. Buat state untuk data dari API
  const [allJobs, setAllJobs] = useState<Job[]>([]); // Menyimpan data asli
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]); // Menyimpan data yang tampil
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. State untuk filter
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [sortBy, setSortBy] = useState('Terbaru');

  // 4. useEffect untuk mengambil (fetch) data dari API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/jobs`); // <-- Panggil API
        if (!response.ok) {
          throw new Error('Gagal mengambil data lowongan');
        }
        const data: Job[] = await response.json();
        setAllJobs(data); // Simpan data asli
        setFilteredJobs(data); // Set data yang akan ditampilkan
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // [] berarti hanya dijalankan sekali saat komponen dimuat

  // 5. Helper function untuk sorting gaji (jika diperlukan)
  const parseSalary = (salary: string): number => {
    if (!salary) return 0;
    const minSalaryStr = salary.split(' - ')[0].replace('Rp ', '').replace(/\./g, '');
    return parseInt(minSalaryStr, 10) || 0;
  };

  // 6. useEffect untuk memfilter dan mengurutkan data
  useEffect(() => {
    let processedJobs = [...allJobs] // Mulai dengan data asli
      .filter(job => 
        (job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         job.company.toLowerCase().includes(searchQuery.toLowerCase())) &&
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );

    if (sortBy === 'Gaji Tertinggi') {
      processedJobs.sort((a, b) => parseSalary(b.salary) - parseSalary(a.salary));
    } else if (sortBy === 'Perusahaan A-Z') {
      processedJobs.sort((a, b) => a.company.localeCompare(b.company));
    }
    // 'Terbaru' sudah di-handle oleh query SQL (ORDER BY created_at DESC)

    setFilteredJobs(processedJobs);
  }, [searchQuery, searchLocation, sortBy, allJobs]); // Jalankan ulang saat filter atau data berubah

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      {onNavigate && (
        <div className="container mx-auto px-4 pt-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-gray-600 hover:text-[#0f5c3c] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Header Section */}
      <section className="bg-[#0f5c3c] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl mb-4 text-center">Info Lowongan Kerja</h1>
          <p className="text-xl text-center max-w-2xl mx-auto mb-8">
            Temukan peluang karir terbaik dari perusahaan-perusahaan terkemuka
          </p>
          
          {/* Search Bar - Hubungkan ke state */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-4 flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Cari posisi atau perusahaan..." 
                className="pl-10 border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px] relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Lokasi" 
                className="pl-10 border-gray-300"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <Button className="bg-[#0f5c3c] hover:bg-[#0d4a30] text-white">
              Cari Lowongan
            </Button>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              {loading ? 'Mencari lowongan...' : `Menampilkan ${filteredJobs.length} lowongan kerja`}
            </p>
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Terbaru</option>
              <option>Gaji Tertinggi</option>
              <option>Perusahaan A-Z</option>
            </select>
          </div>

          {/* 7. Handle Loading dan Error */}
          {loading && <p className="text-center text-gray-600">Memuat data...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          
          {!loading && !error && (
            <div className="grid gap-6">
              {filteredJobs.length === 0 ? (
                <p className="text-center text-gray-600">Tidak ada lowongan yang sesuai dengan kriteria.</p>
              ) : (
                filteredJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl mb-2">{job.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Building2 className="w-4 h-4" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#0f5c3c] mb-2">{job.salary}</div>
                        <div className="flex gap-2">
                          <Badge variant="secondary">{job.type}</Badge>
                          <Badge variant="outline">{job.level}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{job.posted}</span>
                      </div>
                      <Button className="bg-[#0f5c3c] hover:bg-[#0d4a30] text-white">
                        Lamar Sekarang
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}