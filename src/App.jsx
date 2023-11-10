import './styles/style.scss'
import LoginPage from './pages/LoginPage/LoginPage';

import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
