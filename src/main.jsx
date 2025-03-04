import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Components/Home.jsx'
import MemeDetail from './Components/MemeDetails.jsx'
import MemeExplorer from './Components/Meme-explorer.jsx'
import MemeUpload from './Components/Meme-upload.jsx'
import UserProfile from './Components/Profile.jsx'
import Leaderboard from './Components/Leaderboard.jsx'
import ErrorPage from './Components/Error.jsx'

const appRoute = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
     path:"/",
     element:<Home />
    },
    {
      path:"/meme/:id",
      element:<MemeDetail />
    },
    {
      path:"/meme-explorer",
      element:<MemeExplorer />
    },
    {
      path:"/meme-upload",
      element:<MemeUpload />
    },
    {
      path:"/profile",
      element:<UserProfile/>
    },
    {
      path:"/leaderboard",
      element:<Leaderboard/>
    },
    {
      path:"*",
      element:<ErrorPage />
    }
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider   router={appRoute}   />
  </StrictMode>,
)
