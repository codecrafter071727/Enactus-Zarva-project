import React, { useEffect, useState } from 'react';

const CoolComingSoon = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,255,0.1),rgba(0,0,0,0.3))]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-x" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-x-reverse" />
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-slide-y" />
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-slide-y-reverse" />
      </div>

      {/* Main text container */}
      <div className="relative">
        {/* Main "COMING SOON" text */}
        <div className={`text-7xl md:text-9xl font-black tracking-wider transition-all duration-1000
          ${animate ? 'translate-x-0 opacity-100 blur-none' : '-translate-x-full opacity-0 blur-lg'}`}>
          <div className="relative overflow-hidden">
            {/* Glitch layers */}
            <div className="glitch-text absolute -top-1 -left-1 text-red-500 animate-glitch-1">COMING</div>
            <div className="glitch-text absolute -top-2 -left-2 text-blue-500 animate-glitch-2">COMING</div>
            <div className="text-white">COMING</div>
          </div>
          
          <div className="relative overflow-hidden mt-4">
            <div className="glitch-text absolute -top-1 -left-1 text-red-500 animate-glitch-2">SOON</div>
            <div className="glitch-text absolute -top-2 -left-2 text-blue-500 animate-glitch-1">SOON</div>
            <div className="text-white">SOON</div>
          </div>
        </div>

        {/* Animated line under text */}
        <div className={`mt-8 transition-all duration-1000 delay-500
          ${animate ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}>
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full animate-pulse">
            <div className="h-full w-1/2 bg-white/30 rounded-full animate-slide-x" />
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add custom animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-x {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes slide-y {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(10px, -10px); }
    50% { transform: translate(-5px, 5px); }
    75% { transform: translate(5px, -5px); }
  }

  @keyframes glitch-1 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
  }

  @keyframes glitch-2 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(2px, -2px); }
    40% { transform: translate(2px, 2px); }
    60% { transform: translate(-2px, -2px); }
    80% { transform: translate(-2px, 2px); }
  }

  .animate-slide-x {
    animation: slide-x 3s linear infinite;
  }

  .animate-slide-x-reverse {
    animation: slide-x 3s linear infinite reverse;
  }

  .animate-slide-y {
    animation: slide-y 3s linear infinite;
  }

  .animate-slide-y-reverse {
    animation: slide-y 3s linear infinite reverse;
  }

  .animate-float {
    animation: float 10s ease-in-out infinite;
  }

  .animate-glitch-1 {
    animation: glitch-1 0.2s ease-in-out infinite;
  }

  .animate-glitch-2 {
    animation: glitch-2 0.3s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default CoolComingSoon;