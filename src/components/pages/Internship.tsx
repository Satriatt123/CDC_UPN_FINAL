import { Building2, MapPin, Calendar, Briefcase, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Page } from '../../App';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000';

interface Internship {
  id: number;
  company: string;
  position: string;
  location: string;
  duration?: string;
  field: string;
  requirements: string;
  benefits: string;
}

const processSteps = [
  {
    title: 'Registrasi',
    description: 'Daftar melalui portal Career Center dengan melengkapi data diri dan dokumen'
  },
  {
    title: 'Matching',
    description: 'Tim kami akan mencocokkan profil Anda dengan perusahaan yang sesuai'
  },
  {
    title: 'Interview',
    description: 'Proses seleksi dan interview dengan perusahaan'
  },
  {
    title: 'Placement',
    description: 'Penempatan magang dan monitoring selama program berlangsung'
  }
];

interface InternshipProps {
  onNavigate?: (page: Page) => void;
}

export function Internship({ onNavigate }: InternshipProps) {

  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/internships`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data magang');
        }
        const data: Internship[] = await response.json();
        setInternships(data);
      } catch (err: any) { 
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
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

      <section className="bg-[#0f5c3c] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl mb-4">Program Magang</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Dapatkan pengalaman kerja nyata di perusahaan-perusahaan terkemuka
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Mengapa Magang Penting?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-2">Pengalaman Praktis</h3>
              <p className="text-gray-600">Terapkan ilmu yang dipelajari di kampus ke dunia kerja nyata</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-2">Networking</h3>
              <p className="text-gray-600">Bangun relasi profesional dengan praktisi industri</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-2">Peluang Karir</h3>
              <p className="text-gray-600">Potensi mendapat job offer setelah lulus</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Peluang Magang Tersedia</h2>
          
          <div className="mb-8 flex gap-4 flex-wrap justify-center">
            <Button variant="outline" className="border-[#0f5c3c] text-[#0f5c3c]">Semua</Button>
            <Button variant="ghost">Technology</Button>
            <Button variant="ghost">Finance</Button>
            <Button variant="ghost">Marketing</Button>
            <Button variant="ghost">Engineering</Button>
          </div>

          {loading && <p className="text-center text-gray-600">Memuat data magang...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          
          {!loading && !error && (
            <div className="grid md:grid-cols-2 gap-6">
              {internships.length === 0 ? (
                <p className="text-center text-gray-600">Belum ada lowongan magang yang tersedia.</p>
              ) : (
                internships.map((internship) => (
                  <div key={internship.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Badge className="mb-2 bg-[#0f5c3c]">{internship.field}</Badge>
                        <h3 className="text-xl mb-1">{internship.position}</h3>
                        <p className="text-gray-600">{internship.company}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{internship.location}</span>
                      </div>
                      {internship.duration && ( // Hanya tampilkan jika ada data durasi
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Durasi: {internship.duration}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm mb-1">Persyaratan:</p>
                      <p className="text-gray-600 text-sm">{internship.requirements}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm mb-1">Benefit:</p>
                      <p className="text-gray-600 text-sm">{internship.benefits}</p>
                    </div>
                    
                    <Button className="w-full bg-[#0f5c3c] hover:bg-[#0d4a30]">
                      Daftar Magang
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Proses Pendaftaran Magang</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                  {index + 1}
                </div>
                <h4 className="mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f5c3c] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">Perusahaan Ingin Menawarkan Program Magang?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kami memiliki mahasiswa berkualitas yang siap berkontribusi di perusahaan Anda
          </p>
          <Button className="bg-amber-400 text-gray-900 hover:bg-amber-500">
            Kerjasama Program Magang
          </Button>
        </div>
      </section>
    </div>
  );
}
