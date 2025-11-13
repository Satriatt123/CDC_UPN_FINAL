import { Search, LogOut } from 'lucide-react'; 
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Page, User } from '../App'; 

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  currentUser: User | null; 
  onSignOut: () => void; 
}

export function Header({ currentPage, onNavigate, currentUser, onSignOut }: HeaderProps) {
  
  return (
    <header className="bg-[#0f5c3c] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img src="src/assets/UPA_PKK__2_-removebg-preview.png" alt="Logo" className="h-12" />
          </div>

          {currentPage === 'home' && (
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => onNavigate('home')}
                className={`hover:text-amber-400 transition-colors ${currentPage === 'home' ? 'text-amber-400' : ''}`}
              >
                Beranda
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`hover:text-amber-400 transition-colors ${currentPage === 'about' ? 'text-amber-400' : ''}`}
              >
                Tentang
              </button>
              <button 
                onClick={() => onNavigate('events')}
                className={`hover:text-amber-400 transition-colors ${currentPage === 'events' ? 'text-amber-400' : ''}`}
              >
                PPID
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className={`hover:text-amber-400 transition-colors ${currentPage === 'contact' ? 'text-amber-400' : ''}`}
              >
                Kontak
              </button>
            </nav>
          )}

          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Input 
                type="search" 
                placeholder="Cari Lowongan" 
                className="w-64 bg-white text-gray-900 pl-4 pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            {currentUser ? (
              <>

                <span className="hidden lg:block text-sm">
                  Halo, {currentUser.identifier}
                </span>
                <Button
                  onClick={onSignOut} 
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-[#0f5c3c]"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => onNavigate('signin')}
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-[#0f5c3c]"
                >
                  Sign in
                </Button>
                <Button 
                  onClick={() => onNavigate('register')}
                  className="bg-amber-400 text-[#0f5c3c] hover:bg-amber-500"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
