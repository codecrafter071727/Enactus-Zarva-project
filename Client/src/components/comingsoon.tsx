import React, { useState } from "react";
import { Info } from "lucide-react";

const ComingSoonLuxury = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-2 md:p-8 relative overflow-hidden border-8 border-transparent rounded-lg glow-animation">
      {/* Info Button */}
      <button 
        onClick={() => setShowVideo(true)}
        className="absolute top-6 right-6 z-20 text-[#d5c58a] hover:text-[#e6d69d] transition-all duration-500 animate-float hover:scale-110"
      >
        <Info className="w-7 h-7 md:w-9 md:h-9" />
      </button>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-4xl">
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setShowVideo(false)}
                className="text-[#d5c58a] hover:text-[#e6d69d] transition-colors duration-300 text-lg"
              >
                Close
              </button>
            </div>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src="YOUR_YOUTUBE_EMBED_URL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 via-gray-700 to-black animate-gradient opacity-80"></div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-16 md:w-96 h-16 md:h-96 bg-[#d5c58a]/30 rounded-full animate-pulse-slow opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-10 md:w-72 h-10 md:h-72 bg-[#d5c58a]/40 rounded-full animate-bounce-slow opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center w-full max-w-xs md:max-w-4xl mx-auto space-y-4 md:space-y-8">
        {/* Title */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-extrabold text-[#d5c58a] animate-fade-in animate-slide-up leading-tight tracking-wide mb-2 md:mb-4">
          <span className="text-[#d0c085]">Coming</span>{" "}
          <span className="text-[#c0b075]">Soon</span>
        </h1>

        {/* Dots */}
        <h2 className="text-3xl md:text-6xl text-gray-200 animate-wiggle leading-none mb-4 md:mb-6">...</h2>

        {/* Subtitle */}
        <p className="text-sm md:text-2xl text-gray-300 max-w-[280px] md:max-w-3xl mx-auto animate-fade-in animation-delay-200 leading-relaxed mb-8 md:mb-12">
          <span className="block md:hidden">We're crafting something exceptional!</span>
          <span className="hidden md:block">We're crafting something exceptional. Stay tuned for an exciting experience that's worth the wait!</span>
        </p>

        {/* Button */}
        <div className="animate-fade-in animation-delay-400 mb-12 md:mb-16">
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-[#d0c085] to-[#c0b075] text-black py-3 md:py-4 px-8 md:px-12 rounded-full text-sm md:text-lg font-medium transition-all duration-500 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_20px_rgba(213,197,138,0.3)] transform-gpu"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://www.instagram.com/zarvaa.in?utm_source=qr&igsh=YmJ4a3FxcHc0dnR3 ');
            }}
          >
            Get Notified
          </a>
        </div>

        {/* Partners Section */}
        <div className="animate-fade-in animation-delay-600">
          <p className="text-base md:text-xl text-gray-400 mb-6 font-light tracking-wide">
            Collaborating with Premium Partners
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {['Premium Cabs', 'Luxury Fleet', 'Elite Transport'].map((partner, index) => (
              <span
                key={index}
                className="inline-block px-6 md:px-8 py-2 md:py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 text-[#d5c58a] text-sm md:text-base border border-[#d5c58a]/30 hover:border-[#d5c58a] transition-all duration-500 hover:scale-105 transform-gpu"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

      
      </div>

      <style>{`
        .animate-gradient {
          animation: gradientAnimation 15s ease infinite;
          background-size: 400% 400%;
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 1.2s ease-out;
        }

        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .glow-animation {
          animation: glowingBorder 3s ease-in-out infinite alternate;
        }

        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          50% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.7; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes glowingBorder {
          0% {
            border-color: rgba(213,197,138,0.6);
            box-shadow: 0 0 25px rgba(213,197,138,0.4),
                        0 0 50px rgba(213,197,138,0.2),
                        inset 0 0 25px rgba(213,197,138,0.4);
          }
          100% {
            border-color: rgba(213,197,138,0.8);
            box-shadow: 0 0 40px rgba(213,197,138,0.6),
                        0 0 80px rgba(213,197,138,0.3),
                        inset 0 0 40px rgba(213,197,138,0.6);
          }
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </div>
  );
};

export default ComingSoonLuxury;