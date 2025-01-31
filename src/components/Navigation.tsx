import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black px-6 md:px-28 py-4 flex justify-between items-center relative">
      {/* Left side - Logo and Brand */}
      <div className="flex items-center">
        <svg
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zM12 4.3l6 3.7-6 3.7-6-3.7 6-3.7z" />
        </svg>
        <span className="text-white text-2xl font-semibold ml-3">TravelSafe</span>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Right side - Authentication Buttons */}
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent flex flex-col md:flex-row md:items-center gap-9 p-4 md:p-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 md:opacity-100 md:translate-y-0'}`}
      >
        <button className="text-white hover:text-gray-300 text-base font-medium">Login</button>
        <button className="bg-white text-black px-5 py-2.5 rounded-lg text-base font-medium hover:bg-gray-100">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
