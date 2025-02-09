import React from 'react';
import { SignedOut, SignedIn, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen overflow-hidden fixed">
      {/* Hero Section */}
      <div className="relative h-[82vh]">
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
        <div className="relative h-full flex flex-col justify-center px-6">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl font-extrabold text-white mb-3 leading-tight">
              Your Safety Companion for Every Journey
            </h1>
            <p className="text-lg text-white mb-5 leading-relaxed">
            Welcome to the beta version of Zarva ! , designed to enhance your travel safety and security.
            </p>
            <div className="pt-2">
              {/* Show Sign-In button when user is not signed in */}
              <SignedOut>
                <SignInButton mode="redirect" redirectUrl="/features">
                  <button className={`bg-gradient-to-r from-[#d5c58a] to-black text-white px-6 py-3 rounded-md text-lg font-medium 
                            hover:scale-105 hover:shadow-md active:scale-95 transition-all duration-300
                            hover:drop-shadow-[0_0_20px_rgba(213,197,138,0.8)]  // Very strong glow
                            hover:backdrop-blur-sm`} >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              {/* Show Features button when user is signed in */}
              <SignedIn>
                <button 
                  onClick={() => navigate('/features')} 
                  className={`bg-gradient-to-r from-[#d5c58a] to-black text-white px-6 py-3 rounded-md text-lg font-medium 
                            hover:scale-105 hover:shadow-md active:scale-95 transition-all duration-300
                            hover:drop-shadow-[0_0_20px_rgba(213,197,138,0.8)]  // Very strong glow
                            hover:backdrop-blur-sm`} // Subtle blur on hover
                >
                  Features
                </button>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
