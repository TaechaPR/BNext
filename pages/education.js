import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Header from "../components/Header";

export default function Education() {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([ // State for YouTube video URLs
    "https://www.youtube.com/watch?v=FGBEfmOvdKk",
    "https://www.youtube.com/watch?v=gwJ-hS2QcvA",
    "https://www.youtube.com/watch?v=rz5jF12guyY",
  ]);

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
      <div className="max-w-6xl mx-auto py-12 px-6 pt-24">
        <h1 className="text-4xl font-bold text-center mb-8">
          Business Deal-Making Education
        </h1>
        <p className="text-center text-gray-300 mb-10">
          Learn strategies to close better deals.
        </p>

        {/* Articles Section */}
        <h2 className="text-3xl font-semibold mb-4">Articles</h2> {/* Section Heading */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"> {/* Added margin-bottom */}
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
        <h2 className="text-3xl font-semibold mb-4">YouTube Videos</h2> {/* Section Heading */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((videoUrl, index) => (
            <motion.div
              key={index} // Use index as key for now (if videos are static)
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-900 p-6 rounded-lg shadow-lg"
            >
              <iframe
                src={videoUrl} // Embed the video using an iframe
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-48" // Adjust height as needed
              ></iframe>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}