import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Navigation from './components/Navigation'
import Classic from './pages/Classic'
import Trails from './pages/Trails'
import Stats from './pages/Stats'
import './App.css'

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/classic" replace />} />
        <Route path="/classic/*" element={<Classic />} />
        <Route path="/trails" element={<Trails />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
)

export default App
