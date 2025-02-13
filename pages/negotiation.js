import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import Header from "../components/Header";

export default function NegotiationList() {
  const [negotiations, setNegotiations] = useState([]);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchNegotiations() {
      try {
        const querySnapshot = await getDocs(collection(db, "negotiations"));
        setNegotiations(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching negotiations:", error);
      }
    }
    fetchNegotiations();
  }, []);

  const handleNewNegotiationClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateNegotiation = () => {
    console.log("Creating new negotiation (mockup)"); // Mockup message
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white">
      <Header />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Negotiations</h1>

        <button
          onClick={handleNewNegotiationClick}
          className="block mx-auto bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all"
        >
          Start New Negotiation
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">
                New Negotiation
              </h2>
              <p className="text-gray-400 mb-6">
                This is a mockup. Creating a new negotiation is not yet
                implemented.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 mr-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNegotiation}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Create (Mockup)
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          {negotiations?.length === 0 ? (
            <p className="text-center text-gray-400">No negotiations yet.</p>
          ) : (
            <ul className="space-y-4">
              {negotiations?.map((negotiation) => (
                <li key={negotiation.id} className="p-4 bg-gray-800 rounded">
                  <h2 className="text-2xl font-bold text-green-400">
                    {negotiation.title}
                  </h2>
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