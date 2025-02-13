import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import Header from "../../components/Header";

export default function NegotiationList() {
  const [negotiations, setNegotiations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchNegotiations() {
      const querySnapshot = await getDocs(collection(db, "negotiations"));
      setNegotiations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchNegotiations();
  }, []);

  const startNewNegotiation = async () => {
    try {
      const docRef = await addDoc(collection(db, "negotiations"), {
        title: "New Negotiation",
        status: "Pending",
        messages: [],
        created_at: serverTimestamp(),
      });

      router.push(`/negotiation/${docRef.id}`); // Redirect to the new negotiation page
    } catch (error) {
      console.error("Error starting negotiation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white">
      <Header />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Negotiations</h1>

        <button
          onClick={startNewNegotiation}
          className="block mx-auto bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all"
        >
          Start New Negotiation
        </button>

        <div className="mt-8">
          {negotiations.length === 0 ? (
            <p className="text-center text-gray-400">No negotiations yet.</p>
          ) : (
            <ul className="space-y-4">
              {negotiations.map((negotiation) => (
                <li key={negotiation.id} className="p-4 bg-gray-800 rounded">
                  <h2 className="text-2xl font-bold text-green-400">{negotiation.title}</h2>
                  <p className="text-gray-300">Status: {negotiation.status}</p>
                  <button
                    onClick={() => router.push(`/negotiation/${negotiation.id}`)}
                    className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
                  >
                    View Discussion
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
