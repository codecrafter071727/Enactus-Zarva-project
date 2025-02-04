import React from 'react';
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
import { Analytics } from "@vercel/analytics/react"
import CoolComingSoon from './components/comingsoon';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50">
        <Navigation />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Features />
                  <About />
                  <Contact />
                </>
              }
            />
            <Route path="/safer-cab" element={<SaferCab />} />
            <Route path="/safer-location" element={<SaferLocation />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/speech" element={<Speechrecognisation />} />
            <Route path="/safer-cab/comingsoon" element={<CoolComingSoon />} />
            <Route path="/s" element={<CoolComingSoon />} />

            
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;


