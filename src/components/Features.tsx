import React from 'react';
import { Car, Mic, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    id: 'safer-cabs',
    title: 'Safer Cabs',
    description: 'Verified drivers and real-time tracking for your peace of mind.',
    icon: Car,
    bgColor: 'bg-black', // Coffee brown
    hoverColor: 'hover:bg-[#8B4513]', // Darker coffee brown
    link: '/safer-cab'
  },
  {
    id: 'voice',
    title: 'Voice Recognition',
    description: 'Quick voice commands for emergency situations and hands-free operation.',
    icon: Mic,
    bgColor: 'bg-black', // Peru brown (lighter coffee)
    hoverColor: 'hover:bg-[#BC8F8F]', // Rosy brown (subtle contrast)
    link: '/speech'
  },
  {
    id: 'routes',
    title: 'Safer Routes',
    description: 'AI-powered route suggestions prioritizing your safety.',
    icon: Send,
    bgColor: 'bg-black', // BurlyWood (light beige-brown)
    hoverColor: 'hover:bg-[#D2B48C]', // Tan (slightly darker)
    link: '/safer-location'
  }
];

const Features = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h4 className="text-[#d5c58a] font-bold tracking-wide text-lg mb-3 animate-fade-in animate-slide-up"> {/* d5c58a, animations */}
            PROTECTING YOU AT EVERY STEP
          </h4>
          <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6 animate-fade-in animate-slide-up animation-delay-200"> {/* animations */}
            Advanced Safety Features
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed animate-fade-in animate-slide-up animation-delay-400"> {/* animations */}
            State-of-the-art technology working together to ensure your journey is secure and comfortable
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Link to={feature.link || '#'} key={feature.id}>
              <div
                className={`group relative bg-gray-800 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300
                          hover:-translate-y-2 hover:shadow-xl hover:shadow-[rgba(213,197,138,0.3)] cursor-pointer
                          border border-[#d5c58a]/20
                          active:shadow-inner active:bg-gray-800/80
                          active:translate-y-0 animate-fade-in animate-slide-up`} // animations
                style={{ animationDelay: `${(index + 1) * 200}ms` }} // Staggered animation
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 ${feature.bgColor} ${feature.hoverColor}
                              rounded-2xl flex items-center justify-center mb-4
                              transition-all duration-300 transform
                              group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[rgba(213,197,138,0.3)]
                              group-active:scale-95 group-active:shadow-inner
                              hover:drop-shadow-[0_0_15px_rgba(213,197,138,0.7)] hover:animate-pulse`} // d5c58a glow, animation
                  >
                    <feature.icon className="w-8 h-8 text-[#d5c58a]" /> {/* d5c58a icon color */}
                  </div>

                  <h3 className="text-white text-xl font-bold mb-4 sm:mb-6 hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-base leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Button with glow and hover effects */}
                  <div className="mt-4">
                    <button className="bg-gradient-to-r from-[#d0c085] to-[#c0b075] text-black px-6 py-3 rounded-full font-medium
                                     hover:scale-105 hover:shadow-md hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] active:scale-95 transition-all duration-300">
                      Learn More
                    </button>
                  </div>

                </div>

                <div className="absolute inset-0 rounded-2xl transition-colors duration-300
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
