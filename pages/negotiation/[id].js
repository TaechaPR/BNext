// pages/negotiation/[id].js
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase"; // Correct path: Up two levels
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import Header from "../../components/Header"; // Correct path: Up two levels

export default function NegotiationDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [negotiation, setNegotiation] = useState(null);
  const [loading, setLoading] = useState(true);
  const messageListRef = useRef(null);

  const staticSenderId = "guestUser"; // Replace with real user ID logic later

  useEffect(() => {
    let unsubscribe;

    if (id) {
      const docRef = doc(db, "negotiations", id);

      async function fetchInitialData() {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNegotiation(docSnap.data());
          } else {
            console.error("No such document!");
            router.push('/negotiation');
            return;
          }
        } catch (error) {
          console.error("Error fetching initial data:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchInitialData();

      unsubscribe = onSnapshot(docRef, (updatedDocSnap) => {
        if (updatedDocSnap.exists()) {
          setNegotiation(updatedDocSnap.data());
        }
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
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

        {/* Display the content instead of messages */}
        <div className="mt-6 text-lg text-gray-200">
          {negotiation.content} {/* Assuming your data has a 'content' field */}
        </div>
      </div>
    </div>
  );
}