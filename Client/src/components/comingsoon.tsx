import React from "react";

const ComingSoonLuxury: React.FC = () => {
  return (
    <div className="h-[82vh] md:min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-2 md:p-8 relative overflow-hidden border md:border-4 border-transparent rounded-lg glow-animation">
      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 via-gray-700 to-black animate-gradient opacity-80"></div>
      
      {/* Background elements - sizes adjusted for Realme 11x */}
      <div className="absolute top-1/4 left-1/4 w-16 md:w-96 h-16 md:h-96 bg-[#d5c58a]/30 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-10 md:w-72 h-10 md:h-72 bg-[#d5c58a]/40 rounded-full animate-bounce opacity-60"></div>

      {/* Main Content - compact spacing for Realme 11x */}
      <div className="relative z-10 text-center w-full max-w-xs md:max-w-3xl mx-auto space-y-1.5 md:space-y-4">
        {/* Title */}
        <h1 className="text-3xl md:text-6xl font-serif font-extrabold text-[#d5c58a] animate-fade-in animate-slide-up leading-none md:leading-tight mb-0">
          <span className="text-[#d0c085]">Coming</span>{" "}
          <span className="text-[#c0b075]">Soon</span>
        </h1>

        {/* Dots */}
        <h2 className="text-2xl md:text-5xl text-gray-200 animate-wiggle leading-none">...</h2>

        {/* Subtitle */}
        <p className="text-xs md:text-xl text-gray-300 max-w-[250px] md:max-w-3xl mx-auto animate-fade-in animation-delay-200 leading-tight md:mb-12">
          <span className="block md:hidden">We're crafting something exceptional!</span>
          <span className="hidden md:block">We're crafting something exceptional. Stay tuned for an exciting experience that's worth the wait!</span>
        </p>

        {/* Button */}
        <div className="animate-fade-in animation-delay-400">
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-[#d0c085] to-[#c0b075] text-black py-1.5 md:py-3 px-4 md:px-6 rounded-full text-xs md:text-base font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:hover:shadow-[0_0_20px_10px_rgba(0,0,0,0.8)]"
          >
            Get Notified
          </a>
        </div>
      </div>

      {/* Define Animations */}
      <style jsx>{`
        .animate-gradient {
          animation: gradientAnimation 10s ease infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-in-out;
        }

        .animate-wiggle {
          animation: wiggle 1.5s ease-in-out infinite;
        }

        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }

        .glow-animation {
          animation: glowingBorder 2s ease-in-out infinite alternate;
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
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          50% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes glowingBorder {
          0% {
            border-color: #d5c58a;
            box-shadow: 0 0 2px #d5c58a, 0 0 5px #d5c58a;
          }
          50% {
            border-color: #c0b075;
            box-shadow: 0 0 3px #c0b075, 0 0 8px #c0b075;
          }
          100% {
            border-color: #d5c58a;
            box-shadow: 0 0 2px #d5c58a, 0 0 5px #d5c58a;
          }
        }
      `}</style>
    </div>
  );
};

export default ComingSoonLuxury;