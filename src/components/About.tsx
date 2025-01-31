import React from 'react';

export function About() {
  return (
    <section className="py-8 px-4 bg-[#FDF8F3] mb-2">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Container */}
          <div className="group relative mb-8 md:mb-0 md:ml-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transition-all duration-300 group-hover:opacity-75" />
            <div className="relative overflow-hidden rounded-2xl border border-gray-100">
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
              <h4 className="text-gray-600 font-bold tracking-wide text-lg mb-2">
                EMPOWERING WOMEN
              </h4>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
                About Zarva
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600 text-lg font-medium leading-relaxed">
                Sarva is dedicated to revolutionizing women's safety through technology. Our platform 
                combines innovative features like safe route navigation, voice recognition, and secure 
                cab services to ensure women can move freely and confidently.
              </p>

              <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
                We believe in creating a world where safety isn't a privilege but a fundamental right. 
                Our team works tirelessly to develop and improve features that make a real difference 
                in women's daily lives.
              </p>
            </div>

            <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                             rounded-xl text-white font-bold text-base shadow-md 
                             transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              Learn More
              <div className="absolute inset-0 rounded-xl transition-opacity duration-300 
                             bg-white opacity-0 group-hover:opacity-10" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
