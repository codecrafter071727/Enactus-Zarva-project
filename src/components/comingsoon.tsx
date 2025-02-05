import React from "react";

const ComingSoonLuxury: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-8 relative overflow-hidden border-4 border-transparent rounded-lg glow-animation">
      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 via-gray-700 to-black animate-gradient opacity-80"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d5c58a]/30 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#d5c58a]/40 rounded-full animate-bounce opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Title with larger font sizes and fancy animation */}
        <h1 className="text-6xl sm:text-8xl font-serif font-extrabold text-[#d5c58a] mb-4 animate-fade-in animate-slide-up">
          <span className="text-[#d0c085]">Coming</span>{" "}
          <span className="text-[#c0b075]">Soon</span>
        </h1>

        {/* Dots on a new line */}
        <h2 className="text-5xl text-gray-200 animate-wiggle">...</h2>

        {/* Subtitle text with a fade effect */}
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in animation-delay-200">
          We're crafting something exceptional. Stay tuned for an exciting
          experience that's worth the wait!
        </p>

        {/* Call to Action Button */}
        <div className="mt-8 animate-fade-in animation-delay-400">
          <a
            href="#"
            className="bg-gradient-to-r from-[#d0c085] to-[#c0b075] text-black py-3 px-6 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_10px_rgba(0,0,0,0.8)] active:scale-95"
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

        .glow-animation {
          animation: glowingBorder 2s ease-in-out infinite alternate;
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(3deg);
          }
          50% {
            transform: rotate(-3deg);
          }
          75% {
            transform: rotate(3deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes glowingBorder {
          0% {
            border-color: #d5c58a;
            box-shadow: 0 0 8px #d5c58a, 0 0 20px #d5c58a;
          }
          50% {
            border-color: #c0b075;
            box-shadow: 0 0 12px #c0b075, 0 0 30px #c0b075;
          }
          100% {
            border-color: #d5c58a;
            box-shadow: 0 0 8px #d5c58a, 0 0 20px #d5c58a;
          }
        }
      `}</style>
    </div>
  );
};

export default ComingSoonLuxury;
