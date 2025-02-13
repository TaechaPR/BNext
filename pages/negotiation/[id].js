import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Import your Firebase config
import Header from '../../components/Header'; 

const NegotiationDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [negotiation, setNegotiation] = useState(null);

  useEffect(() => {
    const fetchNegotiation = async () => {
      if (id) {
        const docRef = doc(db, 'negotiations', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNegotiation(docSnap.data());
        } else {
          // Handle case where document doesn't exist
          console.log('No such document!');
          setNegotiation(null); // Or redirect, show an error, etc.
        }
      }
    };

    fetchNegotiation();
  }, [id]);

  if (!negotiation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white flex items-center justify-center">
        <p className="text-2xl text-gray-400">Loading...</p> {/* Or a better loading indicator */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white">
      <Header /> {/* Assuming you have a Header component */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">{negotiation.title}</h1>
        <p className="text-xl mb-4">Status: {negotiation.status}</p>

        {/* Display the provided content here */}
        <div className="prose lg:prose-xl text-white"> {/* Use 'prose' class for styling */}
          <h2>🚀 M&A in Tech and Big Food Corporations</h2>
          {/* ... (Rest of your M&A content) ... */}
          <p>Success in both sectors depends on strategic alignment and post-merger integration.</p>
        </div>
      </div>
    </div>
  );
};

export default NegotiationDetails;