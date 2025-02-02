import React from 'react';
import { Car, Mic, Send } from 'lucide-react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const features = [
  {
    id: 'safer-cabs',
    title: 'Safer Cabs',
    description: 'Verified drivers and real-time tracking for your peace of mind.',
    icon: Car,
    bgColor: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    link: '/safer-cab'  // Use 'link' instead of 'Link'
  },
  {
    id: 'voice',
    title: 'Voice Recognition',
    description: 'Quick voice commands for emergency situations and hands-free operation.',
    icon: Mic,
    bgColor: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-60',
    link: '/speech'  // Use 'link' instead of 'Link'

  },
  {
    id: 'routes',
    title: 'Safer Routes',
    description: 'AI-powered route suggestions prioritizing your safety.',
    icon: Send,
    bgColor: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600',
    link: '/safer-location'  // Use 'link' instead of 'Link'
  }
];

const Features = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-10 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h4 className="text-gray-600 font-bold tracking-wide text-lg mb-3">
            PROTECTING YOU AT EVERY STEP
          </h4>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Advanced Safety Features
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            State-of-the-art technology working together to ensure your journey is secure and comfortable
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature) => (
            <Link key={feature.id} to={feature.link || '#'}>
              <div
                className="group relative bg-white rounded-2xl p-6 transition-all duration-300
                          hover:-translate-y-2 hover:shadow-xl cursor-pointer
                          border border-gray-100
                          active:shadow-inner active:bg-gray-50
                          active:translate-y-0"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 ${feature.bgColor} ${feature.hoverColor}
                              rounded-2xl flex items-center justify-center mb-4
                              transition-all duration-300 transform
                              group-hover:scale-110 group-hover:shadow-lg
                              group-active:scale-95 group-active:shadow-inner`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover/Active Overlay */}
                <div className="absolute inset-0 rounded-2xl transition-colors duration-300
                              group-hover:bg-black/[0.02]
                              group-active:bg-black/[0.08]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
