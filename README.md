# Memeverse Frontend Assignment

## Overview
Memeverse is a multi-page, highly interactive website where users can explore, upload, and interact with memes. This project tests frontend development skills, including UI/UX, animations, state management, performance optimization, API handling, and advanced React techniques.

## Features
1. **Homepage (Landing Page)**
   - Display trending memes dynamically (Fetched from an API).
   - Interactive animations & transitions.
   - Dark mode toggle.

2. **Meme Explorer Page**
   - Infinite scrolling or pagination.
   - Meme categories filter (Trending, New, Classic, Random).
   - Search functionality with debounced API calls.
   - Sort by likes, date, or comments.

3. **Meme Upload Page**
   - Upload memes (image/gif format).
   - Add funny captions using a text editor.
   - Option to generate AI-based meme captions (Using a meme-related API).
   - Preview before uploading.

4. **Meme Details Page**
   - Dynamic routing (`/meme/:id`).
   - Display meme details, likes, comments, and sharing options.
   - Comment system (Local storage for now).
   - Like buttons with animation and local storage persistence.

5. **User Profile Page**
   - Shows user-uploaded memes.
   - Edit profile info (Name, Bio, Profile Picture).
   - View liked memes (saved in local storage or API).

6. **Leaderboard Page**
   - Top 10 most liked memes.
   - User rankings based on engagement.

7. **404 Page (Easter Egg)**
   - A fun, meme-based 404 error page when users visit a non-existent route.

## Technologies Used
- **Frameworks & Libraries:** React.js, Next.js (if applicable)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion / GSAP
- **State Management:** Redux Toolkit / Context API
- **Storage:** Local Storage / IndexedDB
- **APIs:** Meme APIs (Imgflip API, Meme Generator API)
- **Image Uploads:** Cloudinary / Firebase / ImgBB API
- **Performance Optimization:** Lighthouse, React Profiler

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/memeverse-frontend.git
   cd memeverse-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add necessary API keys and backend endpoints.
4. Run the application:
   ```bash
   npm run dev
   ```

## Usage
- Open the application in your browser (`http://localhost:5173`).
- Sign up or log in.
- Start creating, uploading, and interacting with memes.

## Demo Video
To see the application in action, watch the demo video:

### Option 1: Local Video File
If you have a local video file, place it inside your project (e.g., `assets/demo.mp4`) and reference it:
```markdown
[Download the Demo Video](assets/demo.mp4)
```

### Option 2: Embedded Video (If Supported)
If your markdown viewer supports HTML, you can embed the video directly:
```html
<video width="600" controls>
    <source src="assets/demo.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

## Contributing
- Fork the repository.
- Create a new branch.
- Make your changes and commit.
- Submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any issues or feature requests, please open an issue on the repository or contact the project maintainer at `antimamishra277@gmail.com`.

