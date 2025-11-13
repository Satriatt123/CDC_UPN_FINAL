import { Dribbble, Instagram, Youtube, Twitter } from 'lucide-react';
import { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Use cases */}
          <div>
            <h4 className="mb-4 text-amber-400">Layanan</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => onNavigate('jobs')} className="hover:text-amber-400 transition-colors">Lowongan Kerja</button></li>
              <li><button onClick={() => onNavigate('counseling')} className="hover:text-amber-400 transition-colors">Konseling Karir</button></li>
              <li><button onClick={() => onNavigate('training')} className="hover:text-amber-400 transition-colors">Pelatihan</button></li>
              <li><button onClick={() => onNavigate('internship')} className="hover:text-amber-400 transition-colors">Magang</button></li>
              <li><button onClick={() => onNavigate('events')} className="hover:text-amber-400 transition-colors">Job Fair</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">Alumni Network</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">Tracer Study</button></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-amber-400">Informasi</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">Tentang Kami</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">Visi & Misi</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">Kerjasama</button></li>
              <li><button onClick={() => onNavigate('counseling')} className="hover:text-amber-400 transition-colors">Panduan Karir</button></li>
              <li><button onClick={() => onNavigate('training')} className="hover:text-amber-400 transition-colors">Tips Interview</button></li>
              <li><button onClick={() => onNavigate('training')} className="hover:text-amber-400 transition-colors">Pembuatan CV</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">FAQ</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-amber-400">Partner</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">Perusahaan Mitra</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">Institusi Pendidikan</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">Pemerintah</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">Organisasi Profesi</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">Ikatan Alumni</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">Media Partner</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">Hubungi Kami</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-amber-400">Kontak</h4>
            <div className="space-y-3 text-gray-300">
              <p>
                UPN Veteran Yogyakarta<br />
                Jl. SWK 104 (Lingkar Utara)<br />
                Condongcatur, Yogyakarta 55283
              </p>
              <p>
                Email: career@upnyk.ac.id<br />
                Telp: (0274) 486733
              </p>
              <div className="flex gap-3 pt-4">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-amber-400 hover:text-gray-900 transition-colors">
                  <Dribbble className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-amber-400 hover:text-gray-900 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-amber-400 hover:text-gray-900 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-amber-400 hover:text-gray-900 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Career Center UPN Veteran Yogyakarta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}