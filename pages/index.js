import Link from "next/link";
import { motion } from "framer-motion";
import '../styles/globals.css';
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-green-900 text-white">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <h1 className="text-5xl font-bold mb-4">
            Welcome to the <span className="text-green-400">B2B Deal Platform</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Connect, collaborate, and close deals with ease.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/marketplace">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                Explore Marketplace
              </motion.button>
            </Link>
            <Link href="/education">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-green-500 text-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-all"
              >
                Learn with Us
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {/* Feature 1: Marketplace */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-green-800">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Marketplace</h2>
            <p className="text-gray-300 mb-4">
              Browse and bid on projects from top companies. Find opportunities that match your expertise.
            </p>
            <Link href="/marketplace">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                Go to Marketplace
              </motion.button>
            </Link>
          </div>

          {/* Feature 2: Education */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-green-800">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Education</h2>
            <p className="text-gray-300 mb-4">
              Access resources, guides, and best practices to enhance your business skills.
            </p>
            <Link href="/education">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                Learn More
              </motion.button>
            </Link>
          </div>

          {/* Feature 3: Negotiation */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-green-800">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Negotiation</h2>
            <p className="text-gray-300 mb-4">
              Engage in live negotiations and secure deals directly with other companies.
            </p>
            <Link href="/negotiation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                Start Negotiating
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center py-20"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Your Business to the Next Level?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our platform and start making deals today.
          </p>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-all"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}