'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create user object
    const userData = {
      id: '1',
      name: mode === 'signup' ? `${formData.firstName} ${formData.lastName}` : 'John Doe',
      email: formData.email,
      initials: mode === 'signup' 
        ? `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase()
        : 'JD'
    };
    
    // Login the user
    login(userData);
    
    setIsLoading(false);
    onClose();
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setStep(1);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
  };

  const nextStep = () => {
    if (mode === 'signup' && step === 1) {
      setStep(2);
    }
  };

  const prevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.5 
              }}
              className="relative w-full max-w-4xl bg-jet-900 border border-white/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sharp corner accents */}
              <div className="absolute top-0 left-0 w-0 h-0 border-r-[30px] border-r-transparent border-t-[30px] border-t-primary-400/30"></div>
              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-primary-400/30"></div>

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 text-white/60 hover:text-white z-10 p-2 bg-black/20 backdrop-blur-sm border border-white/10"
              >
                <X size={20} />
              </motion.button>

              <div className="grid lg:grid-cols-2 min-h-[600px]">
                {/* Left Side - Branding */}
                <div className="relative bg-gradient-to-br from-black to-jet-800 p-12 flex flex-col justify-center overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '50px 50px'
                    }} />
                  </div>

                  {/* Animated Elements */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-20 left-20 w-1 h-16 bg-gradient-to-b from-primary-400/50 to-transparent"
                  />
                  <motion.div
                    animate={{
                      x: [0, 10, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute bottom-20 right-20 w-16 h-1 bg-gradient-to-r from-primary-400/50 to-transparent"
                  />

                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="mb-8"
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-primary-400 flex items-center justify-center">
                          <div className="w-6 h-6 bg-black transform rotate-45"></div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-white tracking-tight">SHILAJIT</div>
                          <div className="text-xs text-primary-400 uppercase tracking-[0.2em]">Premium</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                    >
                      {mode === 'login' ? 'WELCOME' : 'JOIN THE'}
                      <span className="block text-primary-400">
                        {mode === 'login' ? 'BACK' : 'ELITE'}
                      </span>
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className="text-gray-300 text-lg mb-8 font-light leading-relaxed"
                    >
                      {mode === 'login' 
                        ? 'Access your premium account and continue your wellness journey with pharmaceutical-grade Himalayan Shilajit.'
                        : 'Join thousands of high-performance individuals who trust our premium Himalayan Shilajit for their wellness needs.'
                      }
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                      className="grid grid-cols-2 gap-6"
                    >
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-3">
                          <Shield className="w-6 h-6 text-primary-400" />
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider">Secure Access</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-3">
                          <Zap className="w-6 h-6 text-primary-400" />
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider">Premium Benefits</div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-12 flex flex-col justify-center bg-jet-950">
                  <motion.div
                    key={mode + step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">
                        {mode === 'login' ? 'Sign In' : step === 1 ? 'Create Account' : 'Complete Profile'}
                      </h3>
                      <p className="text-gray-400 font-light">
                        {mode === 'login' 
                          ? 'Enter your credentials to access your account'
                          : step === 1 
                            ? 'Start your premium wellness journey'
                            : 'Tell us about yourself'
                        }
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <AnimatePresence mode="wait">
                        {mode === 'signup' && step === 1 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div>
                              <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                                First Name
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                  type="text"
                                  value={formData.firstName}
                                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                  className="w-full pl-10 pr-4 py-3 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 transition-all duration-300"
                                  placeholder="John"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                                Last Name
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                  type="text"
                                  value={formData.lastName}
                                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                  className="w-full pl-10 pr-4 py-3 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 transition-all duration-300"
                                  placeholder="Doe"
                                  required
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {(mode === 'login' || (mode === 'signup' && step === 2)) && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                          >
                            <div>
                              <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                                Email Address
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                                  className="w-full pl-10 pr-4 py-3 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 transition-all duration-300"
                                  placeholder="your.email@company.com"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                                Password
                              </label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={formData.password}
                                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                                  className="w-full pl-10 pr-12 py-3 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 transition-all duration-300"
                                  placeholder="Enter your password"
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                              </div>
                            </div>

                            {mode === 'signup' && (
                              <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
                                  Confirm Password
                                </label>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                  <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    className="w-full pl-10 pr-12 py-3 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 transition-all duration-300"
                                    placeholder="Confirm your password"
                                    required
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                  >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                  </button>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Action Buttons */}
                      <div className="space-y-4 pt-4">
                        {mode === 'signup' && step === 1 ? (
                          <motion.button
                            type="button"
                            onClick={nextStep}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-primary-400 hover:bg-primary-500 text-black py-4 px-6 font-bold flex items-center justify-center space-x-3 transition-all duration-300 uppercase tracking-wider"
                          >
                            <span>Continue</span>
                            <ArrowRight size={18} />
                          </motion.button>
                        ) : (
                          <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className="w-full bg-primary-400 hover:bg-primary-500 disabled:bg-primary-600 text-black py-4 px-6 font-bold flex items-center justify-center space-x-3 transition-all duration-300 uppercase tracking-wider"
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                              />
                            ) : (
                              <>
                                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                                <ArrowRight size={18} />
                              </>
                            )}
                          </motion.button>
                        )}

                        {mode === 'signup' && step === 2 && (
                          <motion.button
                            type="button"
                            onClick={prevStep}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full border-2 border-white/20 text-white hover:border-primary-400 hover:text-primary-400 py-4 px-6 font-bold transition-all duration-300 uppercase tracking-wider"
                          >
                            Back
                          </motion.button>
                        )}
                      </div>

                      {/* Switch Mode */}
                      <div className="text-center pt-6 border-t border-white/10">
                        <p className="text-gray-400 mb-4">
                          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                        </p>
                        <motion.button
                          type="button"
                          onClick={switchMode}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-primary-400 hover:text-primary-300 font-bold uppercase tracking-wider transition-colors"
                        >
                          {mode === 'login' ? 'Create Account' : 'Sign In'}
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}