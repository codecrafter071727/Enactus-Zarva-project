import React, { useEffect } from 'react';
import { Car, Mic, Send, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    id: 'safer-cabs',
    title: 'Safer Cabs',
    description: 'Verified drivers and real-time tracking.',
    icon: Car,
    link: '/comingsoon'
  },
  {
    id: 'voice',
    title: 'Voice Recognition',
    description: 'Quick voice commands for emergencies.',
    icon: Mic,
    link: '/speech'
  },
  {
    id: 'routes',
    title: 'Safer Routes',
    description: 'AI-powered route suggestions for safety.',
    icon: Send,
    link: '/safer-location'
  }
];

const Features = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <section className="h-screen flex flex-col bg-[#0a0a02] px-4 py-6 relative">
      {/* Info Button */}
      <a
        href="https://youtube.com/your-video-link"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 w-10 h-10 bg-[#1c2536] rounded-full flex items-center justify-center hover:bg-[#2a3649] transition-colors duration-300"
      >
        <Info className="w-5 h-5 text-[#d5c58a]" />
      </a>

      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-white text-2xl font-bold">Advanced Safety Features</h2>
        <p className="text-gray-400 text-sm mt-1">
          State-of-the-art technology for your security
        </p>
      </div>

      {/* Features List */}
      <div className="flex flex-col gap-4 items-center">
        {features.map((feature) => (
          <Link to={feature.link || '#'} key={feature.id} className="w-full max-w-sm">
            <div className="bg-[#1c2536] rounded-lg p-4 flex items-center space-x-4 w-full">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-[#d5c58a]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
              <button className="bg-[#d5c58a] text-black px-4 py-2 rounded-full text-xs font-medium">
                Learn
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Feedback Form Button */}
      <div className="animate-fade-in animation-delay-600 mt-8 md:mt-12">
        <a
          href="https://forms.gle/jnvjHjmR1eQ6ZU8SA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 md:px-8 py-2 md:py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 text-[#d5c58a] text-sm md:text-base border border-[#d5c58a]/30 hover:border-[#d5c58a] transition-all duration-500 hover:scale-105 transform-gpu"
        >
          Share Your Feedback
        </a>
      </div>
    </section>
  );
};

export default Features;