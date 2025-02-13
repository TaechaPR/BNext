import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Header from "../components/Header";

export default function Education() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const querySnapshot = await getDocs(collection(db, "education"));
      setArticles(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white">
      <Header />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Business Deal-Making Education</h1>
        <p className="text-center text-gray-300 mb-10">Learn how to negotiate and close deals like a pro.</p>

        {/* Blog Articles Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length === 0 ? (
            <p className="text-center col-span-3">No articles available.</p>
          ) : (
            articles.map((article) => (
              <motion.div
                key={article.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-900 p-6 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-green-400">{article.title}</h2>
                <p className="text-gray-300">{article.description}</p>
                <motion.a
                  href={`/education/${article.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-all"
                >
                  Read More
                </motion.a>
              </motion.div>
            ))
          )}
        </div>

        {/* YouTube Video Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-6">Video Tutorials on Deal-Making</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-64"
                src="https://www.youtube.com/embed/GnDJGxAMhoI"
                title="How to Negotiate Like a Pro"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p className="p-4 text-gray-300">Master the art of negotiation with expert tips.</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-64"
                src="https://www.youtube.com/embed/winL3zOKQhU"
                title="5 Steps to Closing Big Business Deals"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p className="p-4 text-gray-300">Learn the step-by-step process of closing high-value deals.</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-64"
                src="https://www.youtube.com/embed/QB9WnKDoPYo"
                title="Common Business Negotiation Mistakes"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p className="p-4 text-gray-300">Avoid mistakes that can cost you a business deal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
