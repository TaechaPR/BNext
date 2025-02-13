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
          <h3>📌 Mergers & Acquisitions (M&A) in Tech</h3>
          <p>
            Tech companies engage in M&A to expand market share, acquire
            innovation, and eliminate competition. A prime example is Microsoft’s
            $26.2B acquisition of LinkedIn, strengthening its presence in the
            professional networking and AI-driven recruitment market. Similarly,
            Google’s acquisition of Fitbit aimed to dominate the wearable
            health-tech space.
          </p>
          <p>
            However, tech M&A faces antitrust regulations and data privacy
            concerns. NVIDIA’s attempted $40B acquisition of ARM was blocked
            due to fears of market monopolization. Successful tech deals focus on
            synergy, integration, and regulatory approval.
          </p>

          <h3>📌 M&A in Big Food Corporations</h3>
          <p>
            Food industry M&A is driven by global expansion, cost efficiency, and
            shifting consumer demands. Nestlé acquired Blue Bottle Coffee to
            enter the premium coffee market, capitalizing on the specialty coffee
            trend. Kraft Heinz’s attempted $143B takeover of Unilever reflected
            the push for global consolidation.
          </p>
          <p>
            Sustainability and health-conscious consumer behavior also shape
            deals. Companies like Beyond Meat seek partnerships with giants like
            PepsiCo to scale plant-based alternatives. A successful food M&A
            depends on brand integration, supply chain efficiency, and consumer
            alignment.
          </p>

          <h3>🎯 Key Takeaways</h3>
          <ul>
            <li>Tech M&A accelerates innovation but faces regulatory hurdles.</li>
            <li>
              Food industry M&A focuses on global reach and evolving consumer
              trends.
            </li>
            <li>
              Success in both sectors depends on strategic alignment and
              post-merger integration.
            </li>
          </ul>
          <p>Success in both sectors depends on strategic alignment and post-merger integration.</p>
        </div>
      </div>
    </div>
  );
};

export default NegotiationDetails;