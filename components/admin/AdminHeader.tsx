'use client';

import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-jet-900 border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-white uppercase tracking-wider">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders, customers, products..."
              className="w-full bg-black border border-white/20 text-white pl-10 pr-4 py-2 focus:border-primary-400 focus:outline-none transition-colors text-sm"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative text-gray-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-400 flex items-center justify-center">
              <span className="text-black font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden md:block">
              <div className="text-white font-medium text-sm">{user?.name}</div>
              <div className="text-gray-400 text-xs">Administrator</div>
            </div>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <User size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}