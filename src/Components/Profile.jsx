import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaHeart } from "react-icons/fa";
import '../styles.css'

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "Guest User",
    bio: "Meme enthusiast! 😂",
    profilePic: "https://ui-avatars.com/api/?name=Guest&background=random&color=fff&size=100"
  });
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Load user profile data from LocalStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (storedUser) setUser(storedUser);

    const storedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    setUploadedMemes(storedMemes);

    const storedLikedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    setLikedMemes(storedLikedMemes);
  }, []);

  // Handle input change for profile fields
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle profile picture update
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile updates to LocalStorage
  const handleSaveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full shadow-md" />
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="nameinput border p-2 rounded dark:bg-gray-700 dark:text-white"
                />
                <br />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="mt-2"
                />
                <br />
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  className="border p-2 rounded mt-2 dark:bg-gray-700 dark:text-white"
                />
                <br />
                
                <button onClick={handleSaveProfile} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2">
                  Save Profile
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.bio}</p>
                <button onClick={() => setIsEditing(true)} className="text-blue-500 flex items-center gap-2 mt-2">
                  <FaEdit /> Edit Profile
                </button>
              </>
            )}
          </div>
        </div>

        {/* Uploaded Memes Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Your Uploaded Memes</h3>
          {uploadedMemes.length === 0 ? (
            <p className="text-gray-500 mt-2">No memes uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {uploadedMemes.map((meme, index) => (
                <Link key={index} to={`/meme/${stripHtml(meme.caption)}`}>
                  <img src={meme.imageUrl} alt={meme.caption} className="likedmeme rounded-lg shadow-md hover:scale-105 transition" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Liked Memes Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaHeart className="text-red-500" /> Liked Memes
          </h3>
          {likedMemes.length === 0 ? (
            <p className="text-gray-500 mt-2">No liked memes yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {likedMemes.map((meme, index) => (
                <Link key={index} to={`/meme/${meme.id || stripHtml(meme.caption)}`}>
                  <img src={meme.imageUrl || meme.url} alt={meme.caption || meme.name} className="likedmeme rounded-lg shadow-md hover:scale-105 transition" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
