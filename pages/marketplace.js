import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Header from "../components/Header";

export default function Marketplace() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const querySnapshot = await getDocs(collection(db, "projects"));
      setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white flex flex-col"> {/* Added flex flex-col */}
      <Header />
      <div className="flex-grow"> {/* Added flex-grow */}
        <div className="max-w-6xl mx-auto py-12 px-6">
          <h1 className="text-4xl font-bold text-center mb-8">Explore Marketplace</h1>
          <p className="text-center text-gray-300 mb-10">Find business projects and bid on deals.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length === 0 ? (
              <p className="text-center col-span-3">No projects available.</p>
            ) : (
              projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-900 p-6 rounded-lg shadow-lg"
                >
                  <h2 className="text-2xl font-semibold text-green-400">{project.title}</h2>
                  <p className="text-gray-300">{project.company} - ${project.budget}</p>
                  <motion.a
                    href={`/project/${project.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-all"
                  >
                    View Details
                  </motion.a>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}