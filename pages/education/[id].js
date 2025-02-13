import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "../../components/Header";

export default function ArticleDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchArticle() {
        const docRef = doc(db, "education", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle(docSnap.data());
        } else {
          setArticle(null);
        }
      }
      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <p className="text-center text-gray-400 mt-10">Article not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white">
      <Header />
      <div className="max-w-5xl mx-auto py-12 px-6 pt-24">
        <h1 className="text-4xl font-bold text-green-400">{article.title}</h1>
        <p className="text-gray-300 mt-2">By: {article.author}</p>
        <p className="mt-6 text-lg text-gray-200">{article.content}</p>
      </div>
    </div>
  );
}
