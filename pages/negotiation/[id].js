import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import { db } from "../../firebase"; // Correct path: Up two levels, then firebase.js
import { doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import Header from "../../components/Header"; // Correct path: Up two levels, then components/Header.js
import { useAuth } from '../../../context/AuthContext'; // Correct path: Up three levels, then context/AuthContext.js

// ... (rest of the code)
export default function NegotiationDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [negotiation, setNegotiation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const messageListRef = useRef(null);
  const { currentUser } = useAuth(); // Access the current user from AuthContext

  useEffect(() => {
    async function fetchNegotiation() {
      if (id) {
        try {
          const docRef = doc(db, "negotiations", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setNegotiation(docSnap.data());
          } else {
            console.error("No such document!");
            router.push('/negotiation'); // Redirect if negotiation not found
          }
        } catch (error) {
          console.error("Error fetching negotiation:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Handle case where id is not yet available
      }
    }

    fetchNegotiation();
  }, [id, router]); // Include router in dependency array

  useEffect(() => {
    // Scroll to bottom when messages update
    if (messageListRef.current && negotiation && negotiation.messages) { // Check if negotiation and messages exist
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [negotiation]);


  const sendMessage = async () => {
    if (messageText.trim() !== "" && currentUser) { // Check if message is not empty and user is logged in
      try {
        const newMessage = {
          sender: currentUser.uid, // Use currentUser.uid from AuthContext
          text: messageText.trim(),
          timestamp: serverTimestamp(),
        };

        await updateDoc(doc(db, "negotiations", id), {
          messages: arrayUnion(newMessage),
        });

        setMessageText(""); // Clear the input field
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!negotiation) {
    return <div>Negotiation not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <h1 className="text-4xl font-bold text-center mb-8">{negotiation.title}</h1>
          <p className="text-center text-gray-300 mb-4">Status: {negotiation.status}</p>

          <div className="mb-8 max-h-96 overflow-y-auto p-4 bg-gray-800 rounded" ref={messageListRef}> {/* Added styling and ref */}
            {negotiation.messages && negotiation.messages.length > 0 ? (
              <ul className="space-y-2"> {/* Added spacing between messages */}
                {negotiation.messages.map((message, index) => (
                  <li key={index} className={`p-3 rounded ${message.sender === currentUser?.uid ? 'bg-blue-600 text-white' : 'bg-gray-700'}`}> {/* Improved styling */}
                    <p className="font-semibold">{message.sender}</p> {/* Display sender's UID (replace with name later) */}
                    <p>{message.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No messages yet.</p>
            )}
          </div>

          <div className="mt-8 flex"> {/* Flexbox for input and button */}
            <textarea
              className="flex-grow w-full p-3 bg-gray-900 text-white rounded mr-2 resize-none" // Added resize-none
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}