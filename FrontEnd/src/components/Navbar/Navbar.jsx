import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <a href="/" className="navbar-logo" onClick={closeMenu}>
          RK <span>WELDING</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-links">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/works">Our Work</a>
          <a href="/about">About</a>
          <a href="/videos">Videos</a>
          <a href="/contact">Contact</a>
        </nav>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <a
            href="tel:+917036903065"
            className="call-button"
          >
            Call Now
          </a>

          <a
            href="https://wa.me/7036903065"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-button"
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`menu-button ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        <nav className="mobile-nav-links">
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="/services" onClick={closeMenu}>Services</a>
          <a href="/works" onClick={closeMenu}>Our Work</a>
          <a href="/about" onClick={closeMenu}>About</a>
          <a href="/videos" onClick={closeMenu}>Videos</a>
          <a href="/contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="mobile-actions">

          <a
            href="tel:+917036903065"
            className="mobile-call-button"
            onClick={closeMenu}
          >
            Call RK Welding
          </a>

          <a
            href="https://wa.me/7036903065"
            target="_blank"
            rel="noreferrer"
            className="mobile-whatsapp-button"
            onClick={closeMenu}
          >
            WhatsApp
          </a>

        </div>

      </div>
    </header>
  );
}

export default Navbar;