"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaPlane, FaUser } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { AuthModal } from './auth/AuthModal';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const openLoginModal = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthModalTab('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <header className="bg-white shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="text-3xl font-bold text-primary flex items-center">
              <span className="mr-2">✈️</span>
              <span>FlyAway</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="flex items-center text-primary font-medium">
            <FaPlane className="mr-1" />
            <span>Flights</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={openLoginModal}>
              Log In
            </Button>
            <Button size="sm" onClick={openSignupModal}>
              Sign Up
            </Button>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={openLoginModal}
            >
              <FaUser className="text-xl" />
            </Button>
          </div>
          <div className="hidden md:flex">
            <select className="border-none bg-transparent text-gray-600 focus:outline-none text-sm">
              <option value="en">English</option>
              <option value="th">ไทย</option>
            </select>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </header>
  );
}
