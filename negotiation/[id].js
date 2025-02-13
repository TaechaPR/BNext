import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { db } from "../../firebase"; // Adjust path as needed
import { doc, getDoc } from "firebase/firestore";
import Header from "../../components/Header"; // Adjust path

export default function NegotiationDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [negotiation, setNegotiation] = useState(null);

  useEffect(() => {
    async function fetchNegotiation() {
      if (id) {
        const docRef = doc(db, "negotiations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNegotiation(docSnap.data());
        } else {
          // Handle the case where the document doesn't exist
          console.log("No such document!");
          setNegotiation(null)
        }
      }
    }

    fetchNegotiation();
  }, [id]);

  if (!negotiation) {
    return <div>Loading... or Negotiation not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white flex flex-col">
      <Header />
      <div className="flex-grow">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">{negotiation.title}</h1>
        {/* Display negotiation details here (messages, etc.) */}
        <p>Status: {negotiation.status}</p>
        {/* ... other details */}
        </div>
        </div>
    </div>
  );
}