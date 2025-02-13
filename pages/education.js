import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Header from "../components/Header";

export default function Education() {
  const [articles, setArticles] = useState([]);
  const videos = [
    { id: "FGBEfmOvdKk", title: "Mastering Business Negotiation" },
    { id: "gwJ-hS2QcvA", title: "Successful M&A Strategies" },
    { id: "rz5jF12guyY", title: "How to Close Deals Faster" },
  ];

  useEffect(() => {
    async function fetchArticles() {
      try {
        const querySnapshot = await getDocs(collection(db, "education"));
        setArticles(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white">
      <Header />
      <div className="max-w-6xl mx-auto py-12 px-6 pt-24">
        <h1 className="text-4xl font-bold text-center mb-8">
          Business Deal-Making Education
        </h1>
        <p className="text-center text-gray-300 mb-10">
          Learn strategies to close better deals and expand your business.
        </p>

        {/* Articles Section */}
        <h2 className="text-3xl font-semibold mb-6 border-b border-green-500 pb-2">Featured Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.length === 0 ? (
            <p className="text-center col-span-3">No articles available.</p>
          ) : (
            articles.map((article) => (
              <motion.div
                key={article.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-green-500 transition-shadow"
              >
                <h2 className="text-2xl font-semibold text-green-400">
                  {article.title}
                </h2>
                <p className="text-gray-300">{article.description}</p>
                <Link href={`/education/${article.id}`} passHref>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-all"
                  >
                    Read More
                  </motion.a>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* YouTube Videos Section */}
        <h2 className="text-3xl font-semibold mb-6 border-b border-green-500 pb-2">Recommended Video Lessons</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-green-500 transition-shadow"
            >
              <h3 className="text-xl font-semibold text-green-400 mb-4">{video.title}</h3>
              <div className="relative w-full h-52 overflow-hidden rounded-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
