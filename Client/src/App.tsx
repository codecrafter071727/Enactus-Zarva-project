import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import SaferLocation from './components/SaferLocation';
import Signin from './components/signin';
import Speechrecognisation from './components/Speechrecognisation';
import { Analytics } from "@vercel/analytics/react";
import CoolComingSoon from './components/comingsoon';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#d5c58a] via-gray-800 to-black">
        <Navigation />
        <main>
          <Routes>
            {/* Home page with all sections */}
            <Route
              path="/"
              element={
                <>
                  <section className="relative">
                    <Hero />
                  </section>
                  <section className="relative mt-8">
                    <About />
                  </section>
                  <section className="relative mt-8">
                    <Contact />
                  </section>
                </>
              }
            />
            
            {/* Individual routes for other pages */}
            <Route path="/safer-location" element={<SaferLocation />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/speech" element={<Speechrecognisation />} />
            <Route path="/comingsoon" element={<CoolComingSoon />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;