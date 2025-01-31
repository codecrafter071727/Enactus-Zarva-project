import React from 'react';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-12 sm:px-8">
        <div className="grid md:grid-cols-4 gap-40">
          {/* Logo and Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-white" />
              <span className="ml-3 text-2xl font-semibold">TravelSafe</span>
            </div>
            <p className="text-gray-400">
              Ensuring safe and secure journeys for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Safe Routes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Voice Recognition</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Secure Cabs</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TravelSafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
