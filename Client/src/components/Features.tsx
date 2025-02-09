import React, { useEffect } from 'react';
import { Car, Mic, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    id: 'safer-cabs',
    title: 'Safer Cabs',
    description: 'Verified drivers and real-time tracking.',
    icon: Car,
    link: '/safer-cab'
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
    <section className="h-screen flex flex-col bg-[#0a0a02] px-4 py-6">
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
    </section>
  );
};

export default Features;
