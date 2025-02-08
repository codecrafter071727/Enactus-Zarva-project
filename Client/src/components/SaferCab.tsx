import React from "react";
import { Link } from "react-router-dom";

const cabProviders = [
  {
    name: "Indrive",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sy0pS0mEhqG0Iu78-0XAp6DKFq7jKP5ntg&s",
    info: "Indrive offers a personalized pricing model based on mutual agreement.",
    bgColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
    hoverColor: "hover:bg-blue-400",
    hoverText: "Get Your Ride!",
    link: "/safer-cab/comingsoon",
  },
  {
    name: "Blue Smart",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vimAiRvYHPyaFPHPhwLZM43S5zldYP_2-A&s",
    info: "Blue Smart is an eco-friendly cab service using electric vehicles.",
    bgColor: "bg-gradient-to-r from-green-500 to-teal-500",
    hoverColor: "hover:bg-green-400",
    hoverText: "Go Green!",
    link: "/safer-cab/comingsoon",
  },
  {
    name: "Meru Cab",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3hsOzEmkIQF76129gdB55CRfn4MPcbkO1tw&s",
    info: "Meru Cab provides a 24/7 safe and secure ride with professional drivers.",
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    hoverColor: "hover:bg-purple-400",
    hoverText: "Ride with Confidence!",
    link: "/safer-cab/comingsoon",
  },
];

const Features = () => {
  return (
    <div
      className="min-h-screen py-8"
      style={{
        background: "linear-gradient(45deg, #4A4A29, #9C9A6A, #B5B1A8, #2E3A47)",
        backgroundSize: "400% 400%",
        animation: "gradient-x 15s ease infinite",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-gray-700 to-black mb-6 leading-tight">
            Ready to Ride in Style?
          </h2>
          <p className="text-lg text-black mb-6 max-w-3xl mx-auto">
            Choose your favorite ride and enjoy a smooth and stylish journey with top-rated providers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cabProviders.map((provider) => (
            <Link to={provider.link} key={provider.name}>
              <div
                className={`group relative bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 transition-all duration-300
                          hover:-translate-y-2 hover:shadow-xl hover:shadow-[rgba(213,197,138,0.3)] cursor-pointer
                          border border-[#d5c58a]/20
                          active:shadow-inner active:bg-gray-800/80
                          active:translate-y-0`}
              >
                <div className="flex flex-col items-center text-center min-h-[400px]">
                  <div
                    className={`${provider.bgColor} ${provider.hoverColor} rounded-full flex items-center justify-center mb-6 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg`}
                  >
                    <img src={provider.logo} alt={provider.name} className="w-20 h-20 object-contain rounded-full" />
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {provider.name}
                  </h3>
                  <p className="text-gray-400 text-base mb-4">{provider.info}</p>

                  <div className="transition-all duration-300 opacity-0 group-hover:opacity-100 mb-4">
                    <p className="text-lg font-semibold text-[#d5c58a]">{provider.hoverText}</p>
                  </div>

                  <div className="mt-4">
                    <button className="bg-gradient-to-r from-[#d0c085] to-[#c0b075] text-black py-2 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                      Ready to Ride
                    </button>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl transition-colors duration-300 group-hover:bg-[#d5c58a]/10 group-active:bg-[#d5c58a]/20" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
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
      `}</style>
    </div>
  );
};

export default Features;
