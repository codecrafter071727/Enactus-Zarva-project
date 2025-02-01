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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


