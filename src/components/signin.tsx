import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Eye, EyeOff, ArrowRight, 
  Phone, Calendar, Sparkles
} from 'lucide-react';

const AnimatedAuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  const inputVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const sparkleVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const getProviderIcon = (provider) => {
    switch(provider) {
      case 'Google':
        return 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png';
      case 'Apple':
        return 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png';
      default:
        return '/api/placeholder/20/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={formVariants}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Enhanced Welcome Box */}
          <motion.div 
            className="relative bg-white rounded-2xl p-6 mb-8 shadow-lg border border-white/50"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              variants={sparkleVariants}
              animate="animate"
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-blue-500" />
            </motion.div>
            <motion.div
              variants={sparkleVariants}
              animate="animate"
              className="absolute -bottom-2 -left-2"
            >
              <Sparkles className="w-6 h-6 text-purple-500" />
            </motion.div>

            <motion.h2 
              className="text-3xl font-bold text-center"
              style={{
                background: 'linear-gradient(to right, #2563eb, #9333ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-center"
            >
              <p className="text-gray-600">
                {isSignUp 
                  ? "Let's get you started with your new account" 
                  : "We're excited to see you again"}
              </p>
            </motion.div>

            <motion.div
              className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          <form className="space-y-4">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                  className="space-y-4"
                >
                  <motion.div variants={inputVariants} className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-blue-500 transition-all"
                    />
                  </motion.div>

                  <motion.div variants={inputVariants} className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-blue-500 transition-all"
                    />
                  </motion.div>

                  <motion.div variants={inputVariants} className="relative group">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-blue-500 transition-all"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={inputVariants} className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-blue-500 transition-all"
              />
            </motion.div>

            <motion.div variants={inputVariants} className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 group-hover:border-blue-500 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </motion.button>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-size-200 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:bg-pos-100 relative group overflow-hidden"
            >
              <motion.span 
                className="relative z-10 flex items-center justify-center gap-2"
                whileHover={{ x: 5 }}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-5 h-5" />
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ type: 'tween' }}
              />
            </motion.button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/80 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['Google', 'Apple'].map((provider) => (
                <motion.button
                  key={provider}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-white/50 hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
                >
                  <img
                    src={getProviderIcon(provider)}
                    alt={`${provider} icon`}
                    className="w-5 h-5"
                  />
                  {provider}
                </motion.button>
              ))}
            </div>
          </form>

          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.p className="text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-1 text-blue-500 hover:text-purple-500 font-medium hover:underline transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </motion.button>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedAuthForm;