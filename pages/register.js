import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Make sure path is correct
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Header from "../components/Header"; // Make sure path is correct
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Toggle between login/signup
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.email || !form.password || (!isLogin && !form.name)) { // Name required for signup
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        router.push('/'); // Redirect after login
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          name: form.name,
          email: form.email,
          created_at: new Date(),
        });
      }
      router.push('/login'); // Redirect to login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <motion.div
          className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-center mb-6">{isLogin ? "Login" : "Register"}</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && ( // Conditionally render name input
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white rounded"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded"
              required
              minLength={6}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition-all"
              disabled={loading}
            >
              {loading ? (isLogin ? "Logging In..." : "Creating Account...") : (isLogin ? "Login" : "Sign Up")}
            </motion.button>
          </form>
          <p className="text-center text-gray-400 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="text-green-400 hover:underline ml-1">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}