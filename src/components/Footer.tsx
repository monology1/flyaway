"use client";

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaCreditCard, FaPaypal } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3 text-white">FlyAway</h3>
            <p className="mb-4 text-gray-400 text-sm">Book your flights at the best prices with our easy-to-use flight booking platform.</p>
            <div className="flex space-x-3">
              <Link href="#" className="text-gray-400 hover:text-primary">
                <FaFacebook size={18} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <FaTwitter size={18} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <FaInstagram size={18} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <FaLinkedin size={18} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <FaYoutube size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3 text-white">Company</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary text-sm">About Us</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary text-sm">Careers</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary text-sm">News & Media</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary text-sm">Partners</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary text-sm">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3 text-white">Support</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary text-sm">FAQ</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary text-sm">How to Book</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary text-sm">Booking Terms</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary text-sm">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3 text-white">Payment Methods</h3>
            <div className="flex flex-wrap gap-2">
              <div className="bg-white p-1 rounded w-10 h-6 flex items-center justify-center">
                <FaCreditCard className="text-gray-800 text-xs" />
              </div>
              <div className="bg-white p-1 rounded w-10 h-6 flex items-center justify-center">
                <FaPaypal className="text-gray-800 text-xs" />
              </div>
              <div className="bg-white p-1 rounded w-10 h-6 flex items-center justify-center text-xs font-bold text-blue-800">
                VISA
              </div>
              <div className="bg-white p-1 rounded w-10 h-6 flex items-center justify-center text-xs font-bold text-red-600">
                MC
              </div>
            </div>

            <h3 className="text-sm font-bold mb-3 mt-4 text-white">Our App</h3>
            <div className="flex space-x-2">
              <Link href="#" className="bg-black text-white px-2 py-1 rounded text-xs flex items-center">
                Android
              </Link>
              <Link href="#" className="bg-black text-white px-2 py-1 rounded text-xs flex items-center">
                iOS
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} FlyAway, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
