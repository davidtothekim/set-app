import './styles/style.scss'
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';

import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
