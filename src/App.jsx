import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  )
}

export default App
