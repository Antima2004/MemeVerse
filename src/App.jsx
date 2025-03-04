import { useState } from 'react'
import Home from './Components/Home'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'

function App() {

  return (
    <>
    <Header />
      <Outlet />
    </>
  )
}

export default App
