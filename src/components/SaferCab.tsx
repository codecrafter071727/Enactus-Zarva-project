import React from 'react';
import { Link } from 'react-router-dom';

const cabProviders = [
  {
    name: 'Indrive',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sy0pS0mEhqG0Iu78-0XAp6DKFq7jKP5ntg&s',
    info: 'Indrive offers a personalized pricing model based on mutual agreement.',
    bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    hoverColor: 'hover:bg-blue-400',
    hoverText: 'Get Your Ride!',
    link: '/safer-cab/comingsoon',
  },
  {
    name: 'Blue Smart',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vimAiRvYHPyaFPHPhwLZM43S5zldYP_2-A&s',
    info: 'Blue Smart is an eco-friendly cab service using electric vehicles.',
    bgColor: 'bg-gradient-to-r from-green-500 to-teal-500',
    hoverColor: 'hover:bg-green-400',
    hoverText: 'Go Green!',
    link: '/safer-cab/bluesmart',
  },
  {
    name: 'Meru Cab',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3hsOzEmkIQF76129gdB55CRfn4MPcbkO1tw&s',
    info: 'Meru Cab provides a 24/7 safe and secure ride with professional drivers.',
    bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    hoverColor: 'hover:bg-purple-400',
    hoverText: 'Ride with Confidence!',
    link: '/safer-cab/meru',
  },
];

const Features = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-10 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto">
        {/* Intro Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-6xl sm:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Ready to Ride in Style?
          </h2>
          <p className="text-lg text-gray-800 mb-6 max-w-3xl mx-auto">
            Choose your favorite ride, enjoy a smooth and stylish journey with top-rated providers that ensure safety, comfort, and an unforgettable experience.
          </p>
        </div>

        {/* Cab Providers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cabProviders.map((provider) => (
            <Link to={provider.link} key={provider.name}>
              <div
                className="group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border border-gray-200 active:shadow-inner active:bg-gray-50"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Logo Container */}
                  <div
                    className={`${provider.bgColor} ${provider.hoverColor} rounded-full flex items-center justify-center mb-6 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-xl`}
                  >
                    <img src={provider.logo} alt={provider.name} className="w-20 h-20 object-contain rounded-full" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{provider.name}</h3>
                  <p className="text-gray-600 text-base mb-4">{provider.info}</p>

                  {/* Hover Text */}
                  <div className="transition-all duration-300 opacity-0 group-hover:opacity-100 mb-4">
                    <p className="text-lg font-semibold text-gray-900">{provider.hoverText}</p>
                  </div>

                  {/* "Ready to Ride" Button */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 active:bg-gradient-to-r active:from-blue-700 active:to-indigo-800">
                    Ready to Ride
                  </div>
                </div>

                {/* Hover/Active Overlay */}
                <div className="absolute inset-0 rounded-2xl transition-colors duration-300 group-hover:bg-black/[0.1] group-active:bg-black/[0.15]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
