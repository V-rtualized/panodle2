import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Classic from './pages/Classic'
import Trails from './pages/Trails'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Navigate to="/classic" replace />} />
      <Route path="/classic/*" element={<Classic />} />
      <Route path="/trails" element={<Trails />} />
    </Routes>
  </BrowserRouter>
)

export default App
