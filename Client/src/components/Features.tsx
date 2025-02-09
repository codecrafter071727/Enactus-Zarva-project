import React from 'react';
import { Car, Mic, Send, Info } from 'lucide-react';

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
  const handleFeatureClick = (link) => {
    window.location.href = link;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#5c5231] via-black to-[#685e33] px-4 py-12 relative overflow-auto">
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-amber-500/10 animate-gradient-xy"></div>

      {/* Info Button */}
      <a
        href="https://youtube.com/your-video-link"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 right-6 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 z-50"
      >
        <Info className="w-6 h-6 text-[#d5c58a]" />
      </a>

      {/* Header */}
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-white text-4xl font-bold mb-4 bg-gradient-to-r from-[#d5c58a] to-amber-400 bg-clip-text text-transparent">
          Advanced Safety Features
        </h2>
        <p className="text-gray-400 text-lg mt-2">
          State-of-the-art technology for your security
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-24 justify-center px-4">
        {features.map((feature, index) => (
          <div 
            key={feature.id}
            className="group animate-fade-in w-full md:w-64"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 h-80 flex flex-col items-center justify-center border border-gray-700/50 hover:border-[#d5c58a]/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#d5c58a]/20">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <feature.icon className="w-8 h-8 text-[#d5c58a]" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center mb-6">
                {feature.description}
              </p>
              <button 
                onClick={() => handleFeatureClick(feature.link)}
                className="bg-[#d5c58a] text-black px-4 py-2 rounded-full text-xs font-medium"
              >
                Learn
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Form Button */}
      <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
        <a
          href="https://forms.gle/jnvjHjmR1eQ6ZU8SA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 text-[#d5c58a] text-lg border border-[#d5c58a]/30 hover:border-[#d5c58a] transition-all duration-500 hover:scale-105 transform-gpu hover:shadow-lg hover:shadow-[#d5c58a]/20"
        >
          Share Your Feedback
        </a>
      </div>
    </section>
  );
};

export default Features;