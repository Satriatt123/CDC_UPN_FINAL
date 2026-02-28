import { Mail, Phone, MapPin, Clock, Send, ArrowLeft } from 'lucide-react'; // <-- 1. Tambahkan ArrowLeft
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Page } from '../../App'; // <-- 2. Tambahkan Page

const contactInfo = [
  {
    icon: MapPin,
    title: 'Alamat',
    content: 'Jl. SWK 104 (Lingkar Utara), Condongcatur, Yogyakarta 55283'
  },
  {
    icon: Phone,
    title: 'Telepon',
    content: '+62 821-3358-6393 (Fajar)'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'upt_pkk@upnyk.ac.id'
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    content: 'Senin - Jumat: 08:00 - 16:00 WIB'
  }
];

const faqs = [
  {
    question: 'Bagaimana cara mendaftar untuk konseling karir?',
    answer: 'Anda dapat mendaftar melalui website kami atau langsung datang ke kantor Career Center pada jam operasional.'
  },
  {
    question: 'Apakah layanan Career Center gratis?',
    answer: 'Ya, semua layanan Career Center gratis untuk mahasiswa dan alumni UPN Veteran Yogyakarta.'
  },
  {
    question: 'Berapa lama proses konseling karir?',
    answer: 'Sesi konseling biasanya berlangsung 45-60 menit. Anda dapat membuat janji temu terlebih dahulu.'
  },
  {
    question: 'Bagaimana cara mengakses informasi lowongan kerja?',
    answer: 'Informasi lowongan kerja dapat diakses melalui website kami atau follow media sosial Career Center.'
  },
  {
    question: 'Apakah ada biaya untuk mengikuti workshop?',
    answer: 'Sebagian besar workshop gratis, namun beberapa workshop khusus mungkin dikenakan biaya terjangkau.'
  }
];

interface ContactProps {
  onNavigate?: (page: Page) => void;
}

export function Contact({ onNavigate }: ContactProps) {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 5. Tambahkan tombol Back Button */}
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
          <h1 className="text-4xl mb-4">Hubungi Kami</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Kami siap membantu Anda dalam perjalanan karir profesional
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.content}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl mb-6">Kirim Pesan</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                  <Input placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <Input type="email" placeholder="nama@email.com" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">NIM / Alumni</label>
                  <Input placeholder="Masukkan NIM atau tuliskan 'Alumni'" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Subjek</label>
                  <Input placeholder="Topik pesan Anda" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Pesan</label>
                  <Textarea 
                    placeholder="Tulis pesan Anda di sini..." 
                    rows={6}
                  />
                </div>
                <Button className="w-full bg-[#0f5c3c] hover:bg-[#0d4a30]">
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl mb-6">Lokasi Kami</h2>
              <div className="bg-gray-200 h-[400px] rounded-lg flex items-center justify-center mb-6">
                <div className="text-center text-gray-500">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p>Google Maps</p>
                  <p className="text-sm">UPN Veteran Yogyakarta</p>
                  <p className="text-sm">Career Center Building</p>
                </div>
              </div>
              <p className="text-gray-600">
                Career Center berlokasi di gedung Rektorat lantai 2, mudah diakses dari gerbang utama kampus. 
                Tersedia area parkir yang luas untuk kendaraan bermotor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Pertanyaan yang Sering Diajukan</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl mb-3 text-[#0f5c3c]">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
