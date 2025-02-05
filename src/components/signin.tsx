import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Eye, EyeOff, ArrowRight, 
  Phone, Calendar, Sparkles
} from 'lucide-react';

const AnimatedAuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-[#3c3a2e]/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-[#d5c58a]/30">
          <motion.div 
            className="relative bg-[#4a4633]/70 rounded-2xl p-6 mb-8 shadow-lg border border-[#d5c58a]/40"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-center"
              style={{
                background: 'linear-gradient(to right, #d5c58a, #a39a6b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </motion.h2>
            <p className="text-gray-300 text-center mt-2">
              {isSignUp ? "Let's get you started with your new account" : "We're excited to see you again"}
            </p>
          </motion.div>

          <form className="space-y-4">
            {isSignUp && (
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-500 rounded-xl text-gray-200 placeholder-gray-400" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" placeholder="Phone Number" className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-500 rounded-xl text-gray-200 placeholder-gray-400" />
                </div>
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-500 rounded-xl text-gray-200 placeholder-gray-400" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full pl-10 pr-12 py-3 bg-transparent border border-gray-500 rounded-xl text-gray-200 placeholder-gray-400" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button className="w-full bg-gradient-to-r from-[#d5c58a] to-[#a39a6b] text-black py-3 rounded-xl font-medium shadow-lg">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 text-center text-gray-300">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"} 
            <button onClick={() => setIsSignUp(!isSignUp)} className="ml-1 text-[#d5c58a] font-medium underline">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedAuthForm;