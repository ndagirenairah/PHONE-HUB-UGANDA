'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-2xl">
            <span className="text-white">📱</span>
            <span>Phone Hub Uganda</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-white transition">
              All Phones
            </Link>
            <Link href="/seller" className="hover:text-white transition">
              Sell with Us
            </Link>
            <Link href="/auth/login" className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block py-2 hover:text-yellow-300">
              Home
            </Link>
            <Link href="/products" className="block py-2 hover:text-yellow-300">
              All Phones
            </Link>
            <Link href="/seller" className="block py-2 hover:text-yellow-300">
              Sell with Us
            </Link>
            <Link href="/auth/login" className="block bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold text-center">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
