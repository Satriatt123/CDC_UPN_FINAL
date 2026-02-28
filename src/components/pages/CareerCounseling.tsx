import { Users, Calendar, CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react'; // <-- 1. Tambahkan ArrowLeft
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Page } from '../../App';

interface CounselingProps {
  onNavigate?: (page: Page) => void;
}

const services = [
  {
    title: 'Konseling Karir Individual',
    description: 'Sesi one-on-one dengan konselor profesional untuk membahas tujuan karir, minat, dan pengembangan pribadi Anda.',
    features: ['Durasi 60 menit', 'Analisis kepribadian', 'Pemetaan karir', 'Action plan personal']
  },
  {
    title: 'Career Assessment',
    description: 'Tes minat, bakat, dan kepribadian untuk membantu Anda menemukan jalur karir yang sesuai.',
    features: ['Tes MBTI', 'Holland Code Test', 'Strength Finder', 'Laporan detail hasil']
  },
  {
    title: 'Resume Review',
    description: 'Konsultasi pembuatan dan review CV/resume agar lebih menarik bagi recruiter.',
    features: ['Review CV mendalam', 'Tips writing yang efektif', 'Template CV profesional', 'LinkedIn optimization']
  },
  {
    title: 'Interview Preparation',
    description: 'Persiapan interview dengan simulasi dan feedback dari praktisi HR berpengalaman.',
    features: ['Mock interview', 'Tips menjawab pertanyaan', 'Body language coaching', 'Handling tough questions']
  }
];

const counselors = [
  {
    name: 'Yuli Fauziah S.T., M.T.',
    expertise: 'Career Psychology & Development',
    experience: '5+ tahun pengalaman di bidang konseling karir'
  },
  {
    name: 'Juwairiah S.Si., M.T.',
    expertise: 'Educational & Career Guidance',
    experience: '5+ tahun sebagai konselor pendidikan'
  },
  {
    name: 'Herry Sofyan S.T., M.Kom.',
    expertise: 'Personality & Aptitude Assessment',
    experience: 'Spesialis tes psikologi dan assessment'
  }
];

export function CareerCounseling({ onNavigate }: CounselingProps) {
  return (
    <div className="min-h-screen bg-white">
      
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
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl mb-4">Konseling Karir Profesional</h1>
              <p className="text-xl mb-6">
                Temukan jalur karir yang tepat dengan bimbingan dari konselor profesional kami
              </p>
              <Button 
                className="bg-amber-400 text-gray-900 hover:bg-amber-500"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Buat Janji Konseling
              </Button>
            </div>
            <div>
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1758273241078-8eec353836be?w=600&h=400&fit=crop"
                alt="Career Counseling"
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Layanan Konseling Kami</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#0f5c3c]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Proses Konseling</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                  1
                </div>
                <h4 className="mb-2">Pendaftaran</h4>
                <p className="text-gray-600 text-sm">Daftar online atau datang langsung</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                  2
                </div>
                <h4 className="mb-2">Assessment</h4>
                <p className="text-gray-600 text-sm">Isi form dan tes awal</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                  3
                </div>
                <h4 className="mb-2">Konseling</h4>
                <p className="text-gray-600 text-sm">Sesi dengan konselor</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                  4
                </div>
                <h4 className="mb-2">Follow-up</h4>
                <p className="text-gray-600 text-sm">Monitoring dan evaluasi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Konselor Kami</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {counselors.map((counselor, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-24 h-24 bg-[#0f5c3c] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl mb-2">{counselor.name}</h3>
                <p className="text-[#0f5c3c] mb-2">{counselor.expertise}</p>
                <p className="text-gray-600 text-sm">{counselor.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f5c3c] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">Siap Memulai Perjalanan Karir Anda?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Buat janji konseling sekarang dan dapatkan panduan profesional untuk karir impian Anda
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              className="bg-amber-400 text-gray-900 hover:bg-amber-500"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Buat Janji Sekarang
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white hover:text-[#0f5c3c]"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat dengan Kami
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
