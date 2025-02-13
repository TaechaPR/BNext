import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "../../components/Header";
import { motion } from "framer-motion";

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchProject() {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject(docSnap.data());
        } else {
          setProject(null);
        }
      }
      fetchProject();
    }
  }, [id]);

  if (!project) {
    return <p className="text-center text-gray-400 mt-10">Project not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white">
      <Header />
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-green-400">{project.title}</h1>
        <p className="text-gray-300 mt-2">Company: {project.company}</p>
        <p className="text-gray-300 mt-2">Status: {project.status}</p>
        <p className="text-gray-300 mt-2">Budget: {project.budget}</p>
        <p className="mt-6 text-lg text-gray-200">{project.description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all"
          onClick={() => alert("Bidding feature coming soon!")}
        >
          Bid on Project
        </motion.button>
      </div>
    </div>
  );
}
