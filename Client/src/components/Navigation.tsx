import React,{useState} from 'react';
// import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { SignedIn,  UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-br from-[#615839] via-gray-900 to-black px-6 md:px-28 py-2 flex justify-between items-center relative">
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
      <div className='text-white'>
        <button className='cursor-pointer 'onClick={() => navigate("/Features")}>
        
      <SignedIn >
        <UserButton />
      </SignedIn>
        </button>
      
      </div>
      

      {/* Right side - Authentication Buttons */}
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent flex flex-col md:flex-row md:items-center gap-9 p-4 md:p-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 md:opacity-100 md:translate-y-0'}`}
      >
        <Link to="/" className="text-white hover:text-gray-300 text-base font-medium">
          Home
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
