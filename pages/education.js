import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Header from "../components/Header";

export default function Education() {
  const [articles, setArticles] = useState([]);
  const videos = [
    "https://www.youtube.com/embed/YOUR_FIRST_VIDEO_ID", // Replace with your actual IDs
    "https://www.youtube.com/embed/YOUR_SECOND_VIDEO_ID",
    "https://www.youtube.com/embed/YOUR_THIRD_VIDEO_ID",
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
        {/* ... (Articles section remains the same) */}

        {/* YouTube Videos Section */}
        <h2 className="text-3xl font-semibold mb-4">YouTube Videos</h2>
        <div className="flex flex-col gap-6"> {/* Vertical arrangement */}
          {videos.map((videoUrl, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-900 p-6 rounded-lg shadow-lg"
            >
              <iframe
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-48"
              ></iframe>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}