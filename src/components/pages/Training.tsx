import { BookOpen, Award, Clock, Users, ArrowLeft } from 'lucide-react'; 
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Page } from '../../App'; 

const trainings = [
  {
    title: 'Public Speaking & Presentation Skills',
    category: 'Soft Skills',
    level: 'Beginner - Intermediate',
    duration: '2 hari (16 jam)',
    participants: 'Max 30 peserta',
    price: 'Gratis',
    description: 'Pelatihan intensif untuk meningkatkan kemampuan berbicara di depan umum dan presentasi yang efektif.',
    topics: ['Teknik public speaking', 'Body language', 'Slide design', 'Handling Q&A']
  },
  {
    title: 'Digital Marketing Fundamentals',
    category: 'Hard Skills',
    level: 'Beginner',
    duration: '3 hari (24 jam)',
    participants: 'Max 25 peserta',
    price: 'Rp 150.000',
    description: 'Pelajari dasar-dasar digital marketing dari SEO, social media marketing, hingga content creation.',
    topics: ['SEO basics', 'Social media strategy', 'Content marketing', 'Analytics']
  },
  {
    title: 'Leadership & Team Management',
    category: 'Soft Skills',
    level: 'Intermediate - Advanced',
    duration: '2 hari (16 jam)',
    participants: 'Max 20 peserta',
    price: 'Gratis',
    description: 'Kembangkan kemampuan leadership dan manajemen tim untuk memimpin dengan efektif.',
    topics: ['Leadership styles', 'Team building', 'Conflict resolution', 'Performance management']
  },
  {
    title: 'Data Analysis with Excel & Python',
    category: 'Hard Skills',
    level: 'Intermediate',
    duration: '4 hari (32 jam)',
    participants: 'Max 30 peserta',
    price: 'Rp 200.000',
    description: 'Kuasai teknik analisis data menggunakan Excel dan Python untuk mengambil keputusan berbasis data.',
    topics: ['Excel advanced', 'Python basics', 'Data visualization', 'Statistical analysis']
  },
  {
    title: 'Professional Email & Business Writing',
    category: 'Soft Skills',
    level: 'Beginner',
    duration: '1 hari (8 jam)',
    participants: 'Max 40 peserta',
    price: 'Gratis',
    description: 'Pelajari cara menulis email profesional dan dokumen bisnis yang efektif.',
    topics: ['Email etiquette', 'Business writing', 'Report writing', 'Professional tone']
  },
  {
    title: 'UI/UX Design Basics',
    category: 'Hard Skills',
    level: 'Beginner',
    duration: '3 hari (24 jam)',
    participants: 'Max 20 peserta',
    price: 'Rp 175.000',
    description: 'Pengenalan dasar-dasar UI/UX design menggunakan Figma dan prinsip design thinking.',
    topics: ['Design thinking', 'User research', 'Wireframing', 'Prototyping with Figma']
  }
];

const benefits = [
  'Sertifikat resmi dari UPN Veteran Yogyakarta',
  'Materi pelatihan lengkap',
  'Praktek langsung dengan studi kasus',
  'Trainer berpengalaman dari industri',
  'Networking dengan peserta lain',
  'Follow-up konsultasi gratis'
];

interface TrainingProps {
  onNavigate?: (page: Page) => void;
}

export function Training({ onNavigate }: TrainingProps) {
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
          <h1 className="text-4xl mb-4">Pelatihan & Workshop</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Tingkatkan kompetensi Anda dengan berbagai program pelatihan berkualitas
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-8">Keuntungan Mengikuti Pelatihan</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <Award className="w-6 h-6 text-[#0f5c3c] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex gap-4 flex-wrap justify-center">
            <Button variant="outline" className="border-[#0f5c3c] text-[#0f5c3c]">Semua</Button>
            <Button variant="ghost">Soft Skills</Button>
            <Button variant="ghost">Hard Skills</Button>
            <Button variant="ghost">Gratis</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainings.map((training, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-[#0f5c3c]">{training.category}</Badge>
                    <span className="text-[#0f5c3c]">{training.price}</span>
                  </div>
                  
                  <h3 className="text-xl mb-3">{training.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{training.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{training.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{training.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{training.participants}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm mb-2">Materi yang akan dipelajari:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {training.topics.map((topic, idx) => (
                        <li key={idx}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-[#0f5c3c] hover:bg-[#0d4a30]">
                    Daftar Sekarang
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f5c3c] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">Butuh Pelatihan Khusus?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kami juga menyediakan pelatihan kustomisasi sesuai kebutuhan organisasi atau kelompok Anda
          </p>
          <Button className="bg-amber-400 text-gray-900 hover:bg-amber-500">
            Hubungi Kami untuk In-house Training
          </Button>
        </div>
      </section>
    </div>
  );
}
