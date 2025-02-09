import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import SaferCab from './components/SaferCab';
import SaferLocation from './components/SaferLocation';
import Signin from './components/signin';
import Speechrecognisation from './components/Speechrecognisation';
import { Analytics } from "@vercel/analytics/react";
import CoolComingSoon from './components/comingsoon';

function App() {
  const [isMobileApp, setIsMobileApp] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobileApp(isStandalone || isMobile);

    // Prevent scrolling on mobile when on home page
    if (isMobile && window.location.pathname === '/') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

  return (
    <Router>
      <div className={`min-h-screen bg-gradient-to-br from-[#d5c58a] via-gray-800 to-black ${isMobileApp ? 'h-screen' : ''}`}>
        <Navigation />
        <main className={isMobileApp ? 'h-[calc(100vh-64px)]' : ''}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  {!isMobileApp && (
                    <>
                      
                      <About />
                      <Contact />
                    </>
                  )}
                </>
              }
            />
            <Route path="/safer-cab" element={<SaferCab />} />
            <Route path="/safer-location" element={<SaferLocation />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/speech" element={<Speechrecognisation />} />
            <Route path="/safer-cab/comingsoon" element={<CoolComingSoon />} />
            <Route path="/features" element={<Features />} />
            {!isMobileApp && <Route path="/About" element={<About />} />}
          </Routes>
        </main>
        {!isMobileApp && <Footer />}
        <Analytics />
      </div>
    </Router>
  );
}

export default App;