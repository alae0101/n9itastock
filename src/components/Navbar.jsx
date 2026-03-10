import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

// TODO: maybe add active state for current section later
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { name: 'Services', href: '#services' },
    { name: 'Mission', href: '#mission' },
    { name: 'Tarifs', href: '#tarifs' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#" className="logo">
          <span className="text-brand font-bold text-2xl">N9ITAWRI9A</span>STOCK
        </a>

        {/* desktop links */}
        <div className="hidden-mobile nav-links">
          {links.map(l => (
            <a key={l.name} href={l.href} className="nav-link">
              {l.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary">Contactez-nous</a>
        </div>

        {/* hamburger for mobile */}
        <button className="mobile-toggle show-mobile" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </button>
      </div>

      {/* mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <a key={l.name} href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
            {l.name}
          </a>
        ))}
        <a href="#contact" className="btn-primary mobile-btn" onClick={() => setMenuOpen(false)}>
          Contactez-nous
        </a>
      </div>

    </nav>
  )
}

export default Navbar
