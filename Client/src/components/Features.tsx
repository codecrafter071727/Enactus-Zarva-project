import React from 'react';
import { Car, Mic, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    id: 'safer-cabs',
    title: 'Safer Cabs',
    description: 'Verified drivers and real-time tracking for your peace of mind.',
    icon: Car,
    bgColor: 'bg-black',
    hoverColor: 'hover:bg-[#8B4513]',
    link: '/safer-cab'
  },
  {
    id: 'voice',
    title: 'Voice Recognition',
    description: 'Quick voice commands for emergency situations and hands-free operation.',
    icon: Mic,
    bgColor: 'bg-black',
    hoverColor: 'hover:bg-[#BC8F8F]',
    link: '/speech'
  },
  {
    id: 'routes',
    title: 'Safer Routes',
    description: 'AI-powered route suggestions prioritizing your safety.',
    icon: Send,
    bgColor: 'bg-black',
    hoverColor: 'hover:bg-[#D2B48C]',
    link: '/safer-location'
  }
];

const Features = () => {
  return (
    <section className="min-h-screen flex items-center py-4 sm:py-8 bg-[#0a0a02]">
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-8">
          <h4 className="text-[#d5c58a] font-bold tracking-wide text-xs sm:text-lg mb-2 sm:mb-3 animate-fade-in animate-slide-up">
            PROTECTING YOU AT EVERY STEP
          </h4>
          <h2 className="text-white text-xl sm:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-4 animate-fade-in animate-slide-up animation-delay-200">
            Advanced Safety Features
          </h2>
          <p className="text-gray-400 text-xs sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed animate-fade-in animate-slide-up animation-delay-400">
            State-of-the-art technology working together to ensure your journey is secure and comfortable
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-6">
          {features.map((feature, index) => (
            <Link to={feature.link || '#'} key={feature.id}>
              <div
                className="group relative bg-gray-800/90 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 transition-all duration-300
                          hover:-translate-y-2 hover:shadow-xl hover:shadow-[rgba(213,197,138,0.3)] cursor-pointer
                          border border-[#d5c58a]/20
                          active:shadow-inner active:bg-gray-800/80
                          active:translate-y-0 animate-fade-in animate-slide-up mb-2 sm:mb-0"
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="flex flex-col items-start text-left">
                  <div
                    className={`w-8 h-8 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${feature.bgColor} ${feature.hoverColor}
                              rounded-lg sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4
                              transition-all duration-300 transform
                              group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[rgba(213,197,138,0.3)]
                              group-active:scale-95 group-active:shadow-inner
                              hover:drop-shadow-[0_0_15px_rgba(213,197,138,0.7)] hover:animate-pulse`}
                  >
                    <feature.icon className="w-4 h-4 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#d5c58a]" />
                  </div>

                  <h3 className="text-white text-base sm:text-xl font-bold mb-1 sm:mb-3 lg:mb-4 hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-base leading-relaxed mb-2 sm:mb-4">
                    {feature.description}
                  </p>

                  <div className="mt-auto">
                    <button className="bg-gradient-to-r from-[#d0c085] to-[#c0b075] text-black px-3 sm:px-6 py-1.5 sm:py-3 rounded-full text-xs sm:text-base font-medium
                                     hover:scale-105 hover:shadow-md hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] active:scale-95 transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl sm:rounded-2xl transition-colors duration-300
                              group-hover:bg-[#d5c58a]/10
                              group-active:bg-[#d5c58a]/20" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;