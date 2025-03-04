import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";
import { FaThumbsUp, FaThumbsDown, FaShareAlt } from "react-icons/fa";

export default function MemeExplorer() {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("random");
  const [filterOption, setFilterOption] = useState("All");
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [comments, setComments] = useState({});
  const [visibleMemes, setVisibleMemes] = useState(20);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await axios.get("https://api.imgflip.com/get_memes");
        const apiMemes = res.data.data.memes.map((meme) => ({
          ...meme,
          likes: Math.floor(Math.random() * 1000),
          dislikes: Math.floor(Math.random() * 300),
          comments: Math.floor(Math.random() * 500),
        }));
        
        const storedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
        const storedMemesWithStats = storedMemes.map((meme) => ({
          ...meme,
          likes: Math.floor(Math.random() * 1000),
          dislikes: Math.floor(Math.random() * 300),
          comments: Math.floor(Math.random() * 500),
        }));
        
        const allMemes = [...storedMemesWithStats, ...apiMemes];
        
        setMemes(allMemes);
        setFilteredMemes(allMemes);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };
    fetchMemes();
  }, []);

  useEffect(() => {
    let filtered = [...memes];

    if (searchQuery) {
      filtered = filtered.filter((meme) =>
        stripHtml(meme.name || meme.caption).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterOption === "Trending") {
      filtered = filtered.filter(() => Math.random() > 0.5);
    } else if (filterOption === "New") {
      filtered = [...memes];
    } else if (filterOption === "Classic") {
      filtered = filtered.filter((meme) => (meme.name||meme.caption).toLowerCase().includes("drake"||"meme"));
    } else if (filterOption === "Random") {
      filtered = filtered.sort(() => Math.random() - 0.5);
    }
    
    if (sortOption === "likes") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortOption === "comments") {
      filtered.sort((a, b) => b.comments - a.comments);
    }
    
    setFilteredMemes(filtered);
  }, [searchQuery,filterOption, sortOption, memes]);

  const fetchMoreMemes = () => {
    setTimeout(() => {
      setVisibleMemes((prev) => prev + 10);
    }, 1000);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center text-black dark:text-white">Meme Explorer</h1>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <input
          type="text"
          placeholder="Search memes..."
          className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
        >
          <option value="random">Upload Date</option>
          <option value="likes">Sort by Likes</option>
          <option value="comments">Sort by Comments</option>
        </select>
        <select
          onChange={(e) => setFilterOption(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
        >
          <option value="All">All</option>
          <option value="Trending">Trending</option>
          <option value="New">New</option>
          <option value="Classic">Classic</option>
          <option value="Random">Random</option>
        </select>
      </div>
      <InfiniteScroll
        dataLength={visibleMemes}
        next={fetchMoreMemes}
        hasMore={visibleMemes < filteredMemes.length}
        loader={<h4 className="text-center dark:text-white mt-4">Loading more memes...</h4>}
      >
        <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {filteredMemes.slice(0, visibleMemes).map((meme) => (
             <motion.div
             key={meme.id ||meme.imageUrl}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             whileHover={{ scale: 1.05, rotate: 1 }}
             whileTap={{ scale: 0.95 }}
             className="bg-white dark:bg-gray-900 dark:shadow-blue-800 dark:shadow-xl dark:text-white dark:border-2 dark:border-amber-50 p-6 rounded-lg shadow-md"
           >
              <Link to={`/meme/${meme.id || stripHtml(meme.caption)}`}>
                <img src={meme.url || meme.imageUrl} alt={stripHtml(meme.name || meme.caption) } className="homepage-image rounded-lg" />
                <p className="text-center text-black dark:text-white">{stripHtml(meme.name || meme.caption) }</p>
              </Link>
              <div className="flex justify-between items-center mt-3">
                <button onClick={() => setLikes((prev) => ({ ...prev, [meme.id]: (prev[meme.id] || 0) + 1 }))} className="text-green-600 dark:text-green-400">
                  <FaThumbsUp /> {likes[meme.id || meme.imageUrl] || meme.likes}
                </button>
                <button onClick={() => setDislikes((prev) => ({ ...prev, [meme.id]: (prev[meme.id] || 0) + 1 }))} className="text-red-600 dark:text-red-400">
                  <FaThumbsDown /> {dislikes[meme.id || meme.imageUrl] || meme.dislikes}
                </button>
                <span className="text-gray-700 dark:text-gray-400">💬 {meme.comments}</span>
                <button className="text-blue-600 dark:text-blue-400">
                  <FaShareAlt />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
