import './styles/style.scss'
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import GameInfoPage from './pages/GameInfoPage/GameInfoPage'
import HostGamePage from './pages/HostGamePage/HostGamePage'


import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/game" element={<GameInfoPage />} />
        <Route path="/game/:gameId" element={<GameInfoPage />} />
        <Route path="/host-game" element={<HostGamePage />} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
