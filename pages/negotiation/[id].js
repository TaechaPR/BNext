import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import Header from "../../components/Header";

export default function NegotiationDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [negotiation, setNegotiation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const messageListRef = useRef(null);

  const staticSenderId = "guestUser"; // Replace with real user authentication

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "negotiations", id);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setNegotiation(docSnap.data());
        } else {
          console.error("No such document!");
          router.push('/negotiation');
        }
        setLoading(false);
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [id, router]);

  useEffect(() => {
    if (messageListRef.current && negotiation && negotiation.messages) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [negotiation]);

  const sendMessage = async () => {
    if (messageText.trim() !== "") {
      try {
        const newMessage = {
          sender: staticSenderId,
          text: messageText.trim(),
          timestamp: serverTimestamp(),
        };

        await updateDoc(doc(db, "negotiations", id), {
          messages: arrayUnion(newMessage),
        });

        setMessageText("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 mt-10">Loading...</div>;
  }

  if (!negotiation) {
    return <div className="text-center text-gray-400 mt-10">Negotiation not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <h1 className="text-4xl font-bold text-center mb-8">{negotiation.title}</h1>
          <p className="text-center text-gray-300 mb-4">Status: {negotiation.status}</p>

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

          <div className="mt-8 flex">
            <textarea
              className="flex-grow w-full p-3 bg-gray-900 text-white rounded mr-2 resize-none"
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send on Enter
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
