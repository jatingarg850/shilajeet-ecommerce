'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';
import AuthModal from './AuthModal';
import UserProfileDropdown from './UserProfileDropdown';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  return (
    <nav className="bg-black text-white fixed w-full z-50 top-0 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 relative">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-400 flex items-center justify-center">
                <div className="w-6 h-6 bg-black transform rotate-45"></div>
              </div>
              <div>
                <div className="text-xl font-bold text-white tracking-tight">SHILAJIT</div>
                <div className="text-xs text-primary-400 uppercase tracking-[0.2em]">Premium</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              <Link href="/" className="text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm">
                Home
              </Link>
              <Link href="/products" className="text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm">
                Products
              </Link>
              <Link href="/benefits" className="text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm">
                Benefits
              </Link>
              <Link href="/about" className="text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-white hover:text-primary-400 transition-colors p-2 border border-white/20 hover:border-primary-400/50">
              <ShoppingCart size={18} />
            </button>
            
            {isAuthenticated && user ? (
              <UserProfileDropdown user={user} onLogout={logout} />
            ) : (
              <>
                <button 
                  onClick={() => {
                    setAuthMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm"
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthModalOpen(true);
                  }}
                  className="bg-primary-400 text-black px-6 py-2 font-bold uppercase tracking-wider text-sm hover:bg-primary-500 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary-400 transition-colors p-2 border border-white/20"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-white/20">
          <div className="px-4 pt-4 pb-6 space-y-4 bg-jet-900">
            <Link
              href="/"
              className="block px-4 py-3 text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm border-l-2 border-transparent hover:border-primary-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-4 py-3 text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm border-l-2 border-transparent hover:border-primary-400"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/benefits"
              className="block px-4 py-3 text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm border-l-2 border-transparent hover:border-primary-400"
              onClick={() => setIsOpen(false)}
            >
              Benefits
            </Link>
            <Link
              href="/about"
              className="block px-4 py-3 text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm border-l-2 border-transparent hover:border-primary-400"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-3 text-white hover:text-primary-400 transition-colors font-medium uppercase tracking-wider text-sm border-l-2 border-transparent hover:border-primary-400"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-white/20 space-y-3">
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-3 text-center">
                    <div className="text-white font-bold">{user.name}</div>
                    <div className="text-gray-400 text-sm">{user.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full bg-red-600/20 text-red-400 px-4 py-3 font-bold uppercase tracking-wider text-sm text-center border border-red-600/30 hover:bg-red-600/30 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setAuthModalOpen(true);
                      setIsOpen(false);
                    }}
                    className="block w-full text-white hover:text-primary-400 px-4 py-3 font-bold uppercase tracking-wider text-sm text-center border border-white/20 hover:border-primary-400/50 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setAuthModalOpen(true);
                      setIsOpen(false);
                    }}
                    className="block w-full bg-primary-400 text-black px-4 py-3 font-bold uppercase tracking-wider text-sm text-center hover:bg-primary-500 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </nav>
  );
}