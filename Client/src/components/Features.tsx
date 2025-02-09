import React, { useEffect, useRef } from 'react';
import { SignedOut, SignedIn, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.005;

        if (this.life <= 0 || 
            this.x < 0 || 
            this.x > canvas.width || 
            this.y < 0 || 
            this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(213, 197, 138, ${this.life})`;
        ctx.fill();
      }
    }

    // Create particles
    const particles = Array(100).fill().map(() => new Particle());

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 2, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden fixed">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-to-br from-[#0a0a02] via-[#1c2536] to-black"
      />

      {/* Overlay with animated gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#d5c58a]/5 to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(213,197,138,0.1),transparent_70%)] animate-ping-slow" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6">
        <div className="max-w-2xl space-y-6 backdrop-blur-sm p-8 rounded-lg bg-black/20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight animate-fade-in">
            Redefining Travel Safety
          </h1>

          <div className="pt-2">
            <SignedOut>
              <SignInButton mode="redirect" redirectUrl="/features">
                <button className="bg-gradient-to-r from-[#d5c58a] to-black text-white px-6 py-3 rounded-md text-lg font-medium
                                 hover:scale-105 hover:shadow-md active:scale-95 transition-all duration-300
                                 hover:drop-shadow-[0_0_20px_rgba(213,197,138,0.8)]
                                 hover:backdrop-blur-sm">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <button
                onClick={() => navigate('/features')}
                className="bg-gradient-to-r from-[#d5c58a] to-black text-white px-6 py-3 rounded-md text-lg font-medium
                         hover:scale-105 hover:shadow-md active:scale-95 transition-all duration-300
                         hover:drop-shadow-[0_0_20px_rgba(213,197,138,0.8)]
                         hover:backdrop-blur-sm"
              >
                Features
              </button>
            </SignedIn>

            <div className="text-sm text-white/90 mt-8 space-y-2">
              <p className="leading-relaxed">*This is the Beta version of the App.</p>
              <p className="leading-relaxed">Final version launch in AUGUST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
