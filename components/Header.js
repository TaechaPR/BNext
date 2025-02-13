import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="bg-black bg-opacity-70 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="no-underline">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer"
          >
            <span className="text-2xl font-bold text-green-500">B-</span>
            <span className="text-2xl font-bold text-white">Sync</span>
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/marketplace" className="no-underline">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-green-500 transition-all cursor-pointer"
            >
              Marketplace
            </motion.span>
          </Link>
          <Link href="/education" className="no-underline">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-green-500 transition-all cursor-pointer"
            >
              Education
            </motion.span>
          </Link>
          <Link href="/negotiation" className="no-underline">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-green-500 transition-all cursor-pointer"
            >
              Negotiation
            </motion.span>
          </Link>
          <Link href="/register" className="no-underline">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-green-500 transition-all cursor-pointer"
            >
              About Us
            </motion.span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-300 hover:text-green-500 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}