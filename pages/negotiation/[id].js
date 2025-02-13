import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; // Import useRef here
import { db } from "../../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import Header from "../../components/Header";

// ... (rest of your component code - no other changes needed)

export default function NegotiationDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [negotiation, setNegotiation] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const messageListRef = useRef(null); // Ref for scrolling

  const staticSenderId = "guestUser"; // Replace with real user authentication

  useEffect(() => {
    let unsubscribe; // To store the unsubscribe function

    if (id) {
      const docRef = doc(db, "negotiations", id);

      // Fetch initial data *before* setting up onSnapshot
      async function fetchInitialData() {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNegotiation(docSnap.data());
          } else {
            console.error("No such document!");
            router.push('/negotiation');
            return; // Stop further execution
          }
        } catch (error) {
          console.error("Error fetching initial data:", error);
        } finally {
          setLoading(false); // Set loading to false after initial fetch
        }
      }

      fetchInitialData(); // Call the function

      unsubscribe = onSnapshot(docRef, (updatedDocSnap) => {
        if (updatedDocSnap.exists()) {
          setNegotiation(updatedDocSnap.data());
        }
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe(); // Cleanup listener on unmount
      }
    };
  }, [id, router]);

  useEffect(() => {
    if (messageListRef.current && negotiation && negotiation.messages) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [negotiation]);


  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;
  }

  if (!negotiation) {
    return <p className="text-center text-gray-400 mt-10">Negotiation not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white">
      <Header />
      <div className="max-w-5xl mx-auto py-12 px-6 pt-24">
        <h1 className="text-4xl font-bold text-green-400">{negotiation.title}</h1>
        <p className="text-gray-300 mt-2">Status: {negotiation.status}</p>

        <div className="mb-8 max-h-96 overflow-y-auto p-4 bg-gray-800 rounded" ref={messageListRef}>
          {negotiation.messages && negotiation.messages.length > 0 ? (
            <ul className="space-y-2">
              {negotiation.messages.map((message, index) => (
                <li key={index} className={`p-3 rounded ${message.sender === staticSenderId ? 'bg-blue-600 text-white' : 'bg-gray-700'}`}>
                  <p className="font-semibold">{message.sender}</p>
                  <p>{message.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No messages yet.</p>
          )}
        </div>

        {/* Message input area (if you still need it) */}
        <div className="mt-8 flex">
          <textarea
            className="flex-grow w-full p-3 bg-gray-900 text-white rounded mr-2 resize-none"
            placeholder="Type your message..."
            // ... (rest of the input and button code if needed)
          />
          <button
            // ... (rest of the button code if needed)
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}