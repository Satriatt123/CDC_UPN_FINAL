import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    title: 'Job Fair 2025',
    description: 'Bergabunglah dengan 100+ perusahaan terkemuka'
  },
  {
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop',
    title: 'Workshop Profesional',
    description: 'Tingkatkan skill untuk karir impian Anda'
  },
  {
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop',
    title: 'Program Magang',
    description: 'Dapatkan pengalaman kerja di perusahaan ternama'
  },
  {
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop',
    title: 'Konseling Karir',
    description: 'Bimbingan karir oleh profesional berpengalaman'
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Slider */}
          <div className="order-2 md:order-1 relative">
            <div className="relative overflow-hidden rounded-lg shadow-xl h-[400px]">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="min-w-full relative"
                  >
                    <ImageWithFallback 
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white text-2xl mb-2">{slide.title}</h3>
                      <p className="text-white/90">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <h1 className="text-5xl mb-4">
              Pusat Karir UPN Veteran Yogyakarta
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Membangun Jembatan Antara Mahasiswa dan Dunia Industri
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6">
                Cari Lowongan
              </Button>
              <Button variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6">
                Tentang Kami
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}