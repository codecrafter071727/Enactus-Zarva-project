import React from 'react';

export function About() {
  return (
    <section className="py-8 px-4 bg-black mb-2"> {/* Black background */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Container */}
          <div className="group relative mb-8 md:mb-0 md:ml-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl blur-xl transition-all duration-300 group-hover:opacity-75" /> {/* Darker Gradient */}
            <div className="relative overflow-hidden rounded-2xl border border-[#d5c58a]/20"> {/* d5c58a border */}
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80"
                alt="Women empowerment"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover shadow-lg transform transition-all duration-300 
                          group-hover:-translate-y-1 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Content Container */}
          <div className="relative space-y-4 pl-8 pr-2">
            <div>
              <h4 className="text-[#d5c58a] font-bold tracking-wide text-lg mb-2"> {/* d5c58a text */}
                EMPOWERING WOMEN
              </h4>
              <h2 className="text-white text-4xl font-extrabold mb-8"> {/* White text */}
                About Zarva
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-gray-400 text-lg font-medium leading-relaxed"> {/* Gray text */}
                Zarva is dedicated to revolutionizing women's safety through technology. Our platform 
                combines innovative features like safe route navigation, voice recognition, and secure 
                cab services to ensure women can move freely and confidently.
              </p>

              <p className="text-gray-400 text-lg font-medium leading-relaxed mb-8"> {/* Gray text */}
                We believe in creating a world where safety isn't a privilege but a fundamental right. 
                Our team works tirelessly to develop and improve features that make a real difference 
                in women's daily lives.
              </p>
            </div>

            <button className="group relative px-6 py-3 bg-gradient-to-r from-[#d0c085] to-[#c0b075]  {/* d5c58a Gradient */}
                             rounded-xl text-black font-bold text-base shadow-md  {/* Black text */}
                             transition-all duration-300 hover:-translate-y-2 hover:shadow-xl active:scale-95"> {/* Active state */}
              Learn More
              <div className="absolute inset-0 rounded-xl transition-opacity duration-300 
                             bg-white/20 opacity-0 group-hover:opacity-20" /> {/* Subtler overlay */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
