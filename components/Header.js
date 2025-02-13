import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="bg-black bg-opacity-70 backdrop-blur-md fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer"
          >
            <span className="text-2xl font-bold text-green-500">B2B</span>
            <span className="text-2xl font-bold text-white">Deals</span>
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/marketplace">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-green-500 transition-all"
            >
              Marketplace
            </motion.button>
          </Link>
          <Link href="/education">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-green-500 transition-all"
            >
              Education
            </motion.button>
          </Link>
          <Link href="/negotiation">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-green-500 transition-all"
            >
              Negotiation
            </motion.button>
          </Link>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-green-500 transition-all"
            >
              Register
            </motion.button>
          </Link>
        </nav>

        {/* Mobile Menu Button (Optional) */}
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