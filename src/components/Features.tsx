import { Briefcase, Users, GraduationCap, Building2, Calendar, TrendingUp } from 'lucide-react';
import { Page } from '../App';

const features = [
  {
    icon: Briefcase,
    title: 'Info Lowongan Kerja',
    description: 'Akses informasi lowongan kerja terbaru dari berbagai perusahaan terkemuka yang sesuai dengan kompetensi lulusan UPN Veteran Yogyakarta.',
    page: 'jobs' as Page
  },
  {
    icon: Users,
    title: 'Konseling Karir',
    description: 'Dapatkan bimbingan karir profesional untuk membantu Anda menemukan jalur karir yang tepat dan mencapai tujuan profesional Anda.',
    page: 'counseling' as Page
  },
  {
    icon: GraduationCap,
    title: 'Pelatihan & Workshop',
    description: 'Ikuti berbagai pelatihan soft skills, hard skills, dan workshop untuk meningkatkan daya saing Anda di dunia kerja.',
    page: 'training' as Page
  },
  {
    icon: Building2,
    title: 'Kerjasama Industri',
    description: 'Kami menjalin kemitraan strategis dengan berbagai industri untuk membuka peluang magang dan rekrutmen bagi mahasiswa dan alumni.',
    page: 'internship' as Page
  },
  {
    icon: Calendar,
    title: 'Job Fair & Events',
    description: 'Partisipasi dalam job fair, career expo, dan networking events dengan perusahaan-perusahaan ternama.',
    page: 'events' as Page
  },
  {
    icon: TrendingUp,
    title: 'Tracer Study',
    description: 'Sistem pelacakan alumni untuk memantau perkembangan karir dan memberikan data untuk peningkatan kualitas pendidikan.',
    page: 'tracer' as Page
  }
];

interface FeaturesProps {
  onNavigate: (page: Page) => void;
}

export function Features({ onNavigate }: FeaturesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Layanan Kami</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Berbagai layanan untuk mendukung perjalanan karir mahasiswa dan alumni UPN Veteran Yogyakarta
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => onNavigate(feature.page)}
              className="p-6 rounded-lg border border-gray-200 hover:border-[#0f5c3c] hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 bg-[#0f5c3c] rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}