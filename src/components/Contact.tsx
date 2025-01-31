import React from 'react';

export function Contact() {
  return (
    <section id="contact" className="py-16 px-8 bg-[#F8F2EB] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F3E7DA] opacity-75" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Contact Us</h2>
          <p className="text-gray-700 text-lg font-medium">
            Get in touch with our support team
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-gray-800 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-semibold text-gray-800 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold px-6 py-3 rounded-xl shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-300"
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
