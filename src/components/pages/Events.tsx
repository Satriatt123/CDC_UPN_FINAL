import { Calendar, MapPin, Users, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Page } from '../../App';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000';

interface Event {
  event_id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: string;
  type: string;
  image: string;
  description: string;
}

interface EventsProps {
  onNavigate?: (page: Page) => void;
}

export function Events({ onNavigate }: EventsProps) {
  
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/events`); // <-- Panggil API
        if (!response.ok) {
          throw new Error('Gagal mengambil data acara');
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

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
          <h1 className="text-4xl mb-4">Acara & Kegiatan</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Ikuti berbagai acara career development dan networking untuk mengembangkan karir Anda
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex gap-4 flex-wrap">
            <Button variant="outline" className="border-[#0f5c3c] text-[#0f5c3c]">Semua</Button>
            <Button variant="ghost">Job Fair</Button>
            <Button variant="ghost">Workshop</Button>
            <Button variant="ghost">Webinar</Button>
            <Button variant="ghost">Networking</Button>
            <Button variant="ghost">Training</Button>
          </div>

          {loading && <p className="text-center text-gray-600">Memuat data acara...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.length === 0 ? (
                <p className="text-center text-gray-600">Belum ada acara yang tersedia.</p>
              ) : (
                events.map((event) => (
                  <div key={event.event_id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <ImageWithFallback 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <Badge className="mb-3 bg-[#0f5c3c]">{event.type}</Badge>
                      <h3 className="text-xl mb-3">{event.title}</h3>
                      
                      <div className="space-y-2 mb-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.participants}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
                      
                      <Button className="w-full bg-[#0f5c3c] hover:bg-[#0d4a30]">
                        Daftar Sekarang
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
