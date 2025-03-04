import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




export default function MemeUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState("");

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview Image
    }
  };

  // Generate AI Caption (Using Meme API)
  const generateAICaption = async () => {
    try {
      setGenerating(true);
      const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
  
      setCaption(response.data.joke);
      toast.success("AI-generated caption added!");
    } catch (error) {
      toast.error("Failed to generate AI caption");
    } finally {
      setGenerating(false);
    }
  };

  // Handle Meme Upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", caption); 

    try {
      setLoading(true);

      // Upload image to ImgBB (Replace with your custom API link)
      const uploadResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=9248ba4ec19ee07af555fb0724df6029`,
        formData
      );

      const memeURL = uploadResponse.data.data.url;

    // Save to LocalStorage
    const storedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    const newMeme = { imageUrl: memeURL, caption };
    storedMemes.unshift(newMeme); // Add to the beginning (newest first)
    localStorage.setItem("uploadedMemes", JSON.stringify(storedMemes));
      toast.success("Meme uploaded successfully!");
      setImage(null);
      setPreview(null);
      setCaption("");
    } catch (error) {
      toast.error("Failed to upload meme");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">Upload Your Meme</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Image Upload */}
        <label className="block mb-3 text-lg font-semibold">Upload Meme Image/GIF:</label>
        <input type="file" accept="image/*,image/gif" onChange={handleImageUpload} className="block w-full p-2 border rounded" />

        {/* Preview Section */}
        {preview && (
          <div className="mt-4">
            <p className="text-center text-lg font-semibold">Preview:</p>
            <img src={preview} alt="Meme Preview" className="w-full rounded-lg shadow-md mt-2" />
          </div>
        )}

        {/* Meme Caption Editor */}
        <label className="block mt-4 mb-2 text-lg font-semibold">Add Caption:</label>
        <ReactQuill value={caption} onChange={setCaption} className="bg-white dark:bg-gray-900 text-black dark:text-white" />

        {/* AI Caption Button */}
        <button type="button" onClick={generateAICaption} disabled={loading}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
          {generating ? "Generating..." : "Generate AI Caption 🤖"}
        </button>

        {/* Submit Button */}
        <button type="submit" disabled={loading}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
          {loading ? "Uploading..." : "Upload Meme 📤"}
        </button>
      </form>
    </div>
  );
}
