import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrophy, FaHeart, FaUser } from "react-icons/fa";
import axios from "axios";

export default function Leaderboard() {
  const [topMemes, setTopMemes] = useState([]);
  const [userRankings, setUserRankings] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        // Fetch memes from Imgflip API
        const res = await axios.get("https://api.imgflip.com/get_memes");
        const apiMemes = res.data.data.memes || [];

        // Fetch uploaded memes from LocalStorage
        const uploadedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];

        // Combine all memes
        let allMemes = [...apiMemes, ...uploadedMemes];

        // Assign random likes if not already set
        allMemes = allMemes.map((meme) => ({
          ...meme,
          likes: Number(localStorage.getItem(`like_${meme.id}`)) || Math.floor(Math.random() * 500) + 50
        }));

        // Sort memes by likes (descending) and get top 10
        const sortedMemes = allMemes.sort((a, b) => b.likes - a.likes).slice(0, 10);
        setTopMemes(sortedMemes);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();

    // Fetch user engagement from LocalStorage
    let userEngagement = JSON.parse(localStorage.getItem("userEngagement")) || {};

    if (Object.keys(userEngagement).length === 0) {
      // Generate 10 random users if no real data is available
      userEngagement = Array.from({ length: 10 }, (_, index) => ({
        username: `User${index + 1}`,
        likes: Math.floor(Math.random() * 200) + 10
      }));
    } else {
      userEngagement = Object.entries(userEngagement).map(([username, likes]) => ({ username, likes }));
    }

    const sortedUsers = userEngagement
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10)
      .map((user, index) => ({ ...user, rank: index + 1 }));

    setUserRankings(sortedUsers);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-3xl font-bold text-center">🏆 Meme Leaderboard</h1>

      {/* Top 10 Most Liked Memes */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">🔥 Top 10 Most Liked Memes</h2>

        {topMemes.length === 0 ? (
          <p className="text-center text-gray-500">No memes available.</p>
        ) : (
          <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 gap-6">
            {topMemes.map((meme, index) => (
              <div key={meme.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{index + 1}</span>
                  <FaTrophy className={`text-${index === 0 ? "yellow-500" : index === 1 ? "gray-500" : index === 2 ? "red-500" : ""}`} />
                </div>
                <Link to={`/meme/${meme.id}`}>
                  <img src={meme.imageUrl || meme.url} alt={meme.name} className="homepage-image rounded-lg mt-2" />
                  <p className="text-center font-semibold mt-2">{meme.name}</p>
                </Link>
                <p className="flex items-center justify-center text-red-500 mt-2">
                  <FaHeart className="mr-1" /> {meme.likes} Likes
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Engagement Rankings */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">📊 Top Engaged Users</h2>

        {userRankings.length === 0 ? (
          <p className="text-center text-gray-500">No engagement data yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Rank</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">User</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Likes Given</th>
              </tr>
            </thead>
            <tbody>
              {userRankings.map((user, index) => (
                <tr key={user.username} className="text-center">
                  <td className="p-2 border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2">
                    {user.rank}{" "}
                    <FaTrophy className={`text-${index === 0 ? "yellow-500" : index === 1 ? "gray-500" : index === 2 ? "red-500" : ""}`} />
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">
                    <FaUser className="text-blue-500 mr-2" /> {user.username}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600 text-red-500">
                    <FaHeart className="mr-1" /> {user.likes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
