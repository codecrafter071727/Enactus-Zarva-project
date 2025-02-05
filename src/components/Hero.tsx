import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80")',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 md:px-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-4xl lg:text-6xl font-extrabold text-white mb-6">
              Your Safety Companion for Every Journey
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-8">
              Travel with confidence using our advanced safety features designed to protect you at every step.
            </p>
            <div>
              <Link to="/signin">
                <button
                  className={`bg-gradient-to-r from-[#d5c58a] to-black text-white px-6 py-3 rounded-md text-lg font-medium 
                            hover:scale-105 hover:shadow-md active:scale-95 transition-all duration-300
                            hover:drop-shadow-[0_0_20px_rgba(213,197,138,0.8)]  // Very strong glow
                            hover:backdrop-blur-sm`} // Subtle blur on hover
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;