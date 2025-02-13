import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import Header from "../../components/Header";
import { motion } from "framer-motion";

export default function NegotiationDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [negotiation, setNegotiation] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "negotiations", id);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setNegotiation(docSnap.data());
        } else {
          setNegotiation(null);
        }
      });

      return () => unsubscribe(); // Clean up listener on unmount
    }
  }, [id]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const docRef = doc(db, "negotiations", id);
    await updateDoc(docRef, {
      messages: arrayUnion({ sender: "You", message, timestamp: new Date() }),
    });
    setMessage("");
  };

  if (!negotiation) {
    return <p className="text-center text-gray-400 mt-10">Negotiation not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white pt-24">
      <Header />
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-green-400">{negotiation.title}</h1>
        <p className="text-gray-300 mt-2">Status: {negotiation.status}</p>

        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Messages</h2>
          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
            {negotiation.messages?.length > 0 ? (
              negotiation.messages.map((msg, index) => (
                <p key={index} className="text-gray-200">
                  <strong>{msg.sender}:</strong> {msg.message}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No messages yet.</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 bg-gray-700 text-white rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send message on Enter
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all"
            onClick={sendMessage}
          >
            Send
          </motion.button>
        </div>
      </div>
    </div>
  );
}
