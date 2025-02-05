import React from 'react';

export function Contact() {
  return (
    <section id="contact" className="py-16 px-8 bg-black relative overflow-hidden"> {/* Black background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800/50 opacity-75" /> {/* Darker gradient */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-[#d5c58a] mb-2">Contact Us</h2> {/* d5c58a text */}
          <p className="text-[#d5c58a] text-lg font-medium"> {/* d5c58a text */}
            Get in touch with our support team
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-[#d5c58a]/20 transition-all duration-300 hover:shadow-2xl hover:scale-105"> {/* Dark card, d5c58a border */}
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-[#d5c58a] mb-2"> {/* d5c58a text */}
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-[#d5c58a] focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:shadow-md" // Updated input style
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-[#d5c58a] mb-2"> {/* d5c58a text */}
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-[#d5c58a] focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:shadow-md" // Updated input style
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-semibold text-[#d5c58a] mb-2"> {/* d5c58a text */}
                Message
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-[#d5c58a] focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:shadow-md" // Updated textarea style
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#d0c085] to-[#c0b075] text-black text-lg font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl active:scale-95" // Enhanced button style
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
