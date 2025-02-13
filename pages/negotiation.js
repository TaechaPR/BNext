import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Adjust path as needed
import { collection, getDocs, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Header from "../components/Header"; // Adjust path
import { useRouter } from 'next/router';

export default function Negotiation() {
  const [negotiations, setNegotiations] = useState([]);
  const [newNegotiationTitle, setNewNegotiationTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchNegotiations() {
      const querySnapshot = await getDocs(collection(db, "negotiations"));
      setNegotiations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchNegotiations();
  }, []);

  const startNegotiation = async () => {
    try {
      const docRef = await addDoc(collection(db, "negotiations"), {
        title: newNegotiationTitle || "New Business Deal",
        status: "Pending",
        messages: [],
        created_at: new Date(),
      });
      setNewNegotiationTitle("");
      router.push(`/negotiation/${docRef.id}`);
    } catch (error) {
      console.error("Error starting negotiation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <h1 className="text-4xl font-bold text-center mb-8">Negotiations</h1>
          <p className="text-center text-gray-300 mb-10">Manage your business deals and discussions.</p>

          <div className="mb-6">
            <input
              type="text"
              value={newNegotiationTitle}
              onChange={(e) => setNewNegotiationTitle(e.target.value)}
              placeholder="Enter negotiation title"
              className="w-full p-3 bg-gray-900 text-white rounded"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {negotiations.length === 0 ? (
              <p className="text-center col-span-3">No negotiations found.</p>
            ) : (
              negotiations.map((negotiation) => (
                <motion.div
                  key={negotiation.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-900 p-6 rounded-lg shadow-lg"
                >
                  <h2 className="text-2xl font-semibold text-green-400">{negotiation.title}</h2>
                  <p className="text-gray-300">Status: {negotiation.status}</p>
                  <motion.a
                    href={`/negotiation/${negotiation.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-all"
                  >
                    View Discussion
                  </motion.a>
                </motion.div>
              ))
            )}
          </div>
          <div className="text-center mt-6">
            <motion.button
              onClick={startNegotiation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-all"
            >
              Start New Negotiation
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}