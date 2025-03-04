import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHeart, FaShareAlt } from "react-icons/fa"; // ✅ Import icons
import { FiMessageCircle } from "react-icons/fi";


export default function Home() {
  const [memes, setMemes] = useState([]);
  const [likes, setLikes] = useState({});
  // const [dislikes, setDislikes] = useState({});
  const [comments, setComments] = useState({});

  // Fetch memes from API
  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then((res) => {
      const memeData = res.data.data.memes.map((meme) => ({
        ...meme,
        likes: Math.floor(Math.random() * 1000), // ✅ Random likes
        dislikes: Math.floor(Math.random() * 300), // ✅ Random dislikes
        comments: Math.floor(Math.random() * 500), // ✅ Random comments
      }));
      setMemes(memeData);
      setLikes(memeData.reduce((acc, meme) => ({ ...acc, [meme.id]: meme.likes }), {}));
      // setDislikes(memeData.reduce((acc, meme) => ({ ...acc, [meme.id]: meme.dislikes }), {}));
      setComments(memeData.reduce((acc, meme) => ({ ...acc, [meme.id]: meme.comments }), {}));
    });
  }, []);

  // Handle Like Button
  const handleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    localStorage.setItem(`like_${id}`, (likes[id] || 0) + 1);
  };

  // // Handle Dislike Button
  // const handleDislike = (id) => {
  //   setDislikes((prev) => ({
  //     ...prev,
  //     [id]: (prev[id] || 0) + 1,
  //   }));
  //   localStorage.setItem(`dislike_${id}`, (dislikes[id] || 0) + 1);
  // };

  // Handle Share Button
  const handleShare = (url) => {
    navigator.clipboard.writeText(url);
    alert("Meme link copied to clipboard!");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:text-white dark:bg-gray-900">
{/*  Hero Section (Intro) */}
<header className="intro text-center py-12">
        <motion.h1
          className="text-5xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to <span className="text-blue-600 dark:text-blue-400">MemeVerse</span> 😂🔥
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          The ultimate destination for the funniest memes on the internet. Explore, laugh, and share!
        </motion.p>
        
        {/* 🚀 CTA Buttons */}
        <motion.div
          className="herobutton mt-6 flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
       <Link to="/meme-explorer">
  <button className="relative px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800">
    🔍 Explore Memes
  </button>
</Link>



          <Link to="/meme-upload">
            <button className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white rounded-lg shadow-lg transition-all">
              📤 Upload Meme
            </button>
          </Link>
        </motion.div>
      </header>
      <h1 className="trendingmemes text-3xl font-bold text-center">Trending Memes</h1>
      <Link
        to="/meme-explorer"
        className="text-center block mt-6 text-lg font-bold text-blue-600 hover:underline dark:text-blue-400"
      >
        🔍 Explore More Memes →
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {memes.map((meme) => (
          <motion.div
            key={meme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-900 dark:shadow-blue-800 dark:shadow-xl dark:text-white p-5 rounded-lg shadow-md"
          >
            <Link to={`/meme/${meme.id}`}>
              <img src={meme.url} alt={meme.name} className="homepage-image rounded-lg" />
            </Link>

            {/* Like, Dislike, Comments & Share Buttons */}
            <div className="flex justify-start gap-5 items-center mt-3">
              {/* Like Button */}
              <button
                onClick={() => handleLike(meme.id)}
                className="flex items-center gap-1 text-red-600 dark:text-red-400"
              >
                <FaHeart  className="w-9 h-9 text-text" /> {likes[meme.id] || 0}
              </button>

              {/* Dislike Button */}
              {/* <button
                onClick={() => handleDislike(meme.id)}
                className="flex items-center gap-1 text-red-600 dark:text-red-400"
              >
                <FaThumbsDown /> {dislikes[meme.id] || 0}
              </button> */}

              {/* Comments Count */}
              <button
                className="flex items-center gap-1 text-black dark:text-white"
              >
                <FiMessageCircle className="w-9 h-9 text-text" /> {comments[meme.id] || 0}
              </button>

              {/* Share Button */}
              <button
                onClick={() => handleShare(meme.url)}
                className="text-black dark:text-white"
              >
                <FaShareAlt  className="w-9 h-9 text-text"/>
              </button>
            </div>
            <Link to={`/meme/${meme.id}`}>
              <p className="text-left">{meme.name}</p>
            </Link>

          </motion.div>
        ))}
      </div>
    </div>
  );
}
