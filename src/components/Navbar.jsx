import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Mission', href: '#mission' },
    { name: 'Tarifs', href: '#tarifs' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#" className="logo">
          <span className="text-brand font-bold text-2xl">N9ITAWRI9A</span>STOCK
        </a>

        {/* Desktop Menu */}
        <div className="hidden-mobile nav-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary">
            Contactez-nous
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle show-mobile"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a href="#contact" className="btn-primary mobile-btn" onClick={() => setMobileMenuOpen(false)}>
          Contactez-nous
        </a>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 1.5rem 0;
        }
        
        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          font-weight: 500;
          color: rgba(255,255,255,0.8);
        }

        .nav-link:hover {
          color: white;
        }

        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }

        .mobile-toggle {
          background: transparent;
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: var(--color-surface-1);
          padding: 1rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          border-bottom: 1px solid var(--color-border);
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-link {
          font-size: 1.125rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .hidden-mobile { display: none; }
          .show-mobile { display: block; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
