import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const memeUrls = [
    "https://i.imgflip.com/1g8my4.jpg",
    "https://i.imgflip.com/26am.jpg",
    "https://i.imgflip.com/1bij.jpg",
    "https://i.imgflip.com/5w3.jpg",
    "https://i.imgflip.com/2hgfw.jpg"
  ];

  const [randomMeme, setRandomMeme] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * memeUrls.length);
    setRandomMeme(memeUrls[randomIndex]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Knock Knock! 🚪</h1>
      <p className="text-lg mb-6">You knocked the wrong gate.</p>
      <img src={randomMeme} alt="Error Meme" className="w-80 sm:w-96 rounded-lg shadow-lg mb-6" />
      <Link to="/" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition">
        🔙 Back to Home
      </Link>
    </div>
  );
}
