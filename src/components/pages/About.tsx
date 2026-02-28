import { Target, Eye, Users, Award, Building2, TrendingUp, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Page } from '../../App';

interface AboutProps {
  onNavigate?: (page: Page) => void;
}

const stats = [
  { number: '2000+', label: 'Alumni Terdata' },
  { number: '200+', label: 'Perusahaan Mitra' },
  { number: '75%', label: 'Tingkat Penempatan' },
  { number: '20+', label: 'Event Per Tahun' }
];

const team = [
  { name: 'Juwairiah S.Si., M.T.', position: 'Kepala Career Center' },
  { name: 'Herry Sofyan S.T., M.Kom.', position: 'Manajer Konseling Karir' },
  { name: 'Yuli Fauziah S.T., M.T.', position: 'Koordinator Kerjasama Industri' },
  { name: 'Wilis Kaswidjanti S.Si., M.Kom.', position: 'Koordinator Pelatihan & Workshop' }
];

export function About({ onNavigate }: AboutProps) {
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
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl mb-4">Tentang Career Center</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Membangun Jembatan Antara Pendidikan dan Dunia Kerja
          </p>
        </div>
      </section>


      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl mb-6">Career Center UPN Veteran Yogyakarta</h2>
              <p className="text-gray-600 mb-4">
                Career Center UPN Veteran Yogyakarta didirikan dengan misi untuk memfasilitasi mahasiswa dan alumni dalam mengembangkan karir profesional mereka. Kami berkomitmen untuk menjadi mitra terpercaya dalam perjalanan karir Anda.
              </p>
              <p className="text-gray-600 mb-4">
                Dengan jaringan luas ke berbagai industri dan perusahaan terkemuka, kami menyediakan akses ke peluang karir, program pengembangan kompetensi, dan layanan konseling yang dirancang khusus untuk mempersiapkan lulusan UPN memasuki dunia kerja.
              </p>
              <p className="text-gray-600">
                Sejak tahun 2015, Career Center telah membantu ribuan mahasiswa dan alumni menemukan jalur karir yang tepat dan mencapai kesuksesan profesional di berbagai bidang industri.
              </p>
            </div>
            <div>
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Career Center"
                className="w-full h-[400px] object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">Visi</h3>
              <p className="text-gray-600">
                Visi dari UPA Pengembangan Karir dan Kewirausahaan adalah "Menjadi pusat unggulan dalam pengembangan karir dan kewirausahaan yang berjiwa Bela Negara dan adaptif terhadap dinamika global".
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#0f5c3c] rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">Misi</h3>
              <ul className="text-gray-600 space-y-2">
                <p className="text-gray-600">
                  UPA Pengembangan Karir dan Kewirausahaan merumuskan misi sebagai landasan strategis dalam menjalankan program-programnya. Misi tersebut mencakup berbagai aspek pengembangan pendidikan, penelitian, pengabdian, serta tata kelola universitas yang mendukung pencapaian visi tersebut, antara lain:
                </p>
                <li>• Meningkatkan kesiapan karir mahasiswa dan lulusan melalui program pembinaan, pelatihan, dan pendampingan yang relevan dengan kebutuhan dunia kerja dan industri.</li>
                <li>• Menumbuhkan semangat kewirausahaan di kalangan mahasiswa sebagai bekal dalam menciptakan lapangan kerja secara mandiri dan berkelanjutan.</li>
                <li>• Membangun kemitraan strategis dengan dunia usaha, dunia industri, lembaga pemerintah, dan masyarakat untuk memperluas jejaring serta peluang karir dan usaha bagi mahasiswa dan alumni.</li>
                <li>• Mengembangkan sistem informasi digital yang terintegrasi dan mudah diakses untuk mendukung layanan karir dan kewirausahaan secara efektif dan efisien.</li>
                <li>• Mendorong terciptanya ekosistem inovatif dan kreatif di lingkungan kampus yang mendukung pengembangan potensi mahasiswa secara holistik dan berdaya saing global.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

 
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Pencapaian Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl text-[#0f5c3c] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Tim Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 bg-[#0f5c3c] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h4 className="mb-2">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Partner Industri Kami</h2>
          {(() => {
            const images = [
              "https://logomak.com/blog/wp-content/uploads/2023/09/Apple-Logo-500x281-min.png",
              "https://logomak.com/blog/wp-content/uploads/2023/09/Microsoft-Logo-500x163-min.png",
              "https://logomak.com/blog/wp-content/uploads/2023/09/Amazon-Logo-500x313-min.png",
              "https://logomak.com/blog/wp-content/uploads/2023/09/Meta-Logo-500x281-min.png",
              "https://logomak.com/blog/wp-content/uploads/2023/09/Tesla-logo-500x281-min.png",
              "https://logomak.com/blog/wp-content/uploads/2023/09/VISA-logo-500x281-min.png",
              "https://logomak.com/blog/wp-content/uploads/2023/09/Tencent-Logo-500x281-min.png",
              "https://logomak.com/blog/wp-content/uploads/2023/09/Mastercard-logo-500x281-min.png",
            ];
            return (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 h-32 rounded-lg flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`image-${index}`}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}
