import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaShareAlt, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
// import { FiMessageCircle } from "react-icons/fi";


export default function MemeDetail() {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Predefined random comments
  const randomComments = [
    { username: "JohnDoe", text: "This meme is hilarious! 😂" },
    { username: "MemeLover99", text: "Best meme of the day! 🔥" },
    { username: "ComedyKing", text: "I can't stop laughing! 🤣" },
    { username: "DarkHumorGuy", text: "This is next level! 👏" },
    { username: "MemeQueen", text: "Meme of the century! 👑" }
  ];

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };


  const getUserAvatar = (username) => `https://ui-avatars.com/api/?name=${username}&background=random&color=fff&size=40`;

  useEffect(() => {
    const allMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    const foundMeme = allMemes.find((m) => stripHtml(m.caption) == id) || null;

    if (!foundMeme) {
      fetch("https://api.imgflip.com/get_memes")
        .then((res) => res.json())
        .then((data) => {
          const onlineMeme = data.data.memes.find((m) => m.id === id);
          setMeme(onlineMeme);
        })
        .catch((err) => console.error("Error fetching meme:", err));
    } else {
      setMeme(foundMeme);
    }
  }, [id]);

  useEffect(() => {
    const storedLikes = localStorage.getItem(`like_${id}`);
    const storedDislikes = localStorage.getItem(`dislike_${id}`);

    if (!storedLikes || !storedDislikes) {
      const randomLikes = getRandomNumber(10, 100);
      const randomDislikes = getRandomNumber(1, 30);
      localStorage.setItem(`like_${id}`, randomLikes);
      localStorage.setItem(`dislike_${id}`, randomDislikes);
      setLikes(randomLikes);
      setDislikes(randomDislikes);
    } else {
      setLikes(Number(storedLikes));
      setDislikes(Number(storedDislikes));
    }

    const storedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];

    if (storedComments.length === 0) {
      const shuffledRandomComments = [...randomComments].sort(() => 0.5 - Math.random()).slice(0, 3);
      setComments(shuffledRandomComments);
      localStorage.setItem(`comments_${id}`, JSON.stringify(shuffledRandomComments));
    } else {
      setComments(storedComments);
    }
  }, [id]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`like_${id}`, newLikes);

    let likedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    likedMemes = likedMemes.filter((m) => m.id !== id);
    likedMemes.push(meme);
    localStorage.setItem("likedMemes", JSON.stringify(likedMemes));

    let dislikedMemes = JSON.parse(localStorage.getItem("dislikedMemes")) || [];
    dislikedMemes = dislikedMemes.filter((m) => m.id !== id);
    localStorage.setItem("dislikedMemes", JSON.stringify(dislikedMemes));
  };

  // const handleDislike = () => {
  //   const newDislikes = dislikes + 1;
  //   setDislikes(newDislikes);
  //   localStorage.setItem(`dislike_${id}`, newDislikes);

  //   let dislikedMemes = JSON.parse(localStorage.getItem("dislikedMemes")) || [];
  //   dislikedMemes = dislikedMemes.filter((m) => m.id !== id);
  //   dislikedMemes.push(meme);
  //   localStorage.setItem("dislikedMemes", JSON.stringify(dislikedMemes));

  //   let likedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
  //   likedMemes = likedMemes.filter((m) => m.id !== id);
  //   localStorage.setItem("likedMemes", JSON.stringify(likedMemes));
  // };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Meme link copied to clipboard!");
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;

    const newUserComment = { username: "You", text: newComment };
    const updatedComments = [newUserComment, ...comments];

    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCommentSubmit();
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewComment((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  if (!meme) return <p className="text-center mt-5">Meme not found!</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:text-white dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-4">{meme.name}</h1>
      <img src={meme.url || meme.imageUrl} alt={meme.name} className="rounded-lg shadow-lg w-80 sm:w-96" />

      <div className="flex gap-6 mt-4">
        <button onClick={handleLike} className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:scale-105 transition">
          <FaHeart/> {likes}
        </button>
        {/* <button onClick={handleDislike} className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:scale-105 transition">
          <FaThumbsDown /> {dislikes}
        </button> */}
        <button onClick={handleShare} className="flex items-center gap-2 text-black dark:text-white hover:scale-105 transition">
          <FaShareAlt /> Share
        </button>
      </div>

      {/* Comment Input Section */}
      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <div className="flex gap-2 relative">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="bg-gray-300 dark:bg-gray-700 px-3 rounded-md">
            <FaSmile className="text-xl text-yellow-500" />
          </button>
          <button onClick={handleCommentSubmit} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
            Post
          </button>

          {showEmojiPicker && (
            <div className="absolute top-full mt-2 left-0 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        {/* Display Comments */}
        <div className="mt-4">
          {comments.map((comment, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-md shadow-md mt-2">
              <img src={getUserAvatar(comment.username)} alt={comment.username} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{comment.username}</p>
                <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
