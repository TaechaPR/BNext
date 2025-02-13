import Header from "../components/Header";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <motion.div
          className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-3xl w-full" // Increased max-width
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-center mb-6">About B-Sync</h1>

          <div className="prose lg:prose-xl text-white"> {/* Added prose class */}
            <p>
              B-Sync is a revolutionary platform designed to transform global
              business collaboration. We empower businesses to connect,
              negotiate, and execute deals seamlessly, fostering growth and
              innovation in the global marketplace.
            </p>

            <h2>Our Vision</h2>
            <p>
              To create a world where businesses of all sizes can easily access
              opportunities and resources, driving global economic growth and
              collaboration.
            </p>

            <h2>Key Features</h2>
            <ul>
              <li>
                <strong>Smart Matching:</strong> Connect with the right partners
                and resources with automated matching and structured bidding.
              </li>
              <li>
                <strong>Access to Global Opportunities:</strong> Expand beyond
                local markets and collaborate worldwide.
              </li>
              <li>
                <strong>Built for SMEs & Startups:</strong> Enables smaller
                businesses to compete with established players on a level
                playing field.
              </li>
              <li>
                <strong>Seamless Negotiation & Execution:</strong> Integrated
                tools ensure smooth contract execution, reducing business
                friction.
              </li>
            </ul>

            <h2>Future Vision</h2>
            <p>We are building B-Sync in phases:</p>
            <ol>
              <li>
                <strong>Phase 1:</strong> Business bidding marketplace for SMEs &
                startups.
              </li>
              <li>
                <strong>Phase 2:</strong> AI-powered matching for niche business
                needs (e.g., M&A, consulting).
              </li>
              <li>
                <strong>Phase 3:</strong> Education & legal advisory tools for
                business growth.
              </li>
            </ol>

            <p>
              B-Sync is more than just a platform—it’s a revolution in global
              business collaboration. 🚀
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}