import React from 'react';

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
              <button className="bg-white text-black px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
