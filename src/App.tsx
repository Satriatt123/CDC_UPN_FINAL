import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero'; 
import { Features } from './components/Features'; 
import { Footer } from './components/Footer'; 
import { JobListings } from './components/pages/JobListings'; 
import { Events } from './components/pages/Events'; 
import { About } from './components/pages/About'; 
import { Contact } from './components/pages/Contact'; 
import { CareerCounseling } from './components/pages/CareerCounseling'; 
import { Training } from './components/pages/Training';
import { Internship } from './components/pages/Internship'; 
import { SignIn } from './components/pages/SignIn';
import { Register } from './components/pages/Register';
import { TracerStudy } from './components/pages/TracerStudy'; 


export type Page = 'home' | 'jobs' | 'events' | 'about' | 'contact' | 
                  'counseling' | 'training' | 'internship' | 
                  'signin' | 'register' | 'tracer';


export interface User {
  identifier: string; 
  role: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []); 

  // Fungsi navigasi
  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    // Jika pindah ke signin/register, pastikan sudah logout
    if (page === 'signin' || page === 'register') {
      handleSignOut(false); // Logout tanpa pindah ke home
    }
  };

  // Fungsi Sign Out
  const handleSignOut = (redirectToHome = true) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    if (redirectToHome) {
      setCurrentPage('home'); 
    }
  };

  // Fungsi untuk menangani login sukses dari komponen SignIn
  const handleSignInSuccess = (userData: User, token: string) => {
    // 1. Simpan data ke localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    
    // 2. Simpan data ke state
    setCurrentUser(userData);
    
    // 3. Arahkan ke halaman utama (home)
    setCurrentPage('home'); 
  };

  // Fungsi untuk merender halaman berdasarkan state 'currentPage'
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            {/* Ganti Hero & Features dengan komponen Anda */}
            <Hero /> 
            <Features onNavigate={handleNavigate} />
          </>
        );
      case 'jobs':
        return <JobListings onNavigate={handleNavigate} />;
      case 'events':
        return <Events onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'counseling':
        return <CareerCounseling onNavigate={handleNavigate} />;
      case 'training':
        return <Training onNavigate={handleNavigate} />;
      case 'internship':
        return <Internship onNavigate={handleNavigate} />;
      
      case 'signin':
        return (
          <SignIn 
            onNavigate={handleNavigate} 
            onSwitchToRegister={() => setCurrentPage('register')}
            onSignInSuccess={handleSignInSuccess} // Ini prop penting
          />
        );
      case 'register':
        return (
          <Register 
            onNavigate={handleNavigate} 
            onSwitchToSignIn={() => setCurrentPage('signin')} 
          />
        );
        
      case 'tracer':
        return <TracerStudy currentUser={currentUser} onNavigate={handleNavigate} />;

      default:
        return (
          <>
            <Hero />
            <Features onNavigate={handleNavigate} />
          </>
        );
    }
  };

  // Jangan tampilkan Header/Footer di halaman login/register
  const showHeaderFooter = currentPage !== 'signin' && currentPage !== 'register';

  return (
    <div className="min-h-screen bg-white">
      {showHeaderFooter && (
        <Header 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          currentUser={currentUser} // Kirim data user
          onSignOut={() => handleSignOut(true)} // Kirim fungsi signout
        />
      )}
      
      {/* Render halaman yang aktif */}
      {renderPage()}
      
      {showHeaderFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}