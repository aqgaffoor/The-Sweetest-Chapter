import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">The Sweetest Chapter</Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link></li>
            <li><Link to="/menu" onClick={() => setIsMenuOpen(false)}>Menu</Link></li>
            <li><Link to="/order" onClick={() => setIsMenuOpen(false)}>How to Order</Link></li>
          </ul>
        </div>

        <div className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s ease;
        }
        .navbar.scrolled {
          padding: 1rem 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-logo {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--clr-pink);
        }
        .nav-menu ul {
          display: flex;
          gap: 2.5rem;
        }
        .nav-menu a {
          font-weight: 500;
          color: var(--clr-brown);
          transition: color 0.3s ease;
        }
        .nav-menu a:hover {
          color: var(--clr-pink);
        }
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
        }
        .nav-toggle span {
          width: 30px;
          height: 2px;
          background-color: var(--clr-brown);
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .nav-toggle { display: flex; }
          .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            height: 100vh;
            background: white;
            padding: 6rem 2rem;
            transition: 0.4s ease;
          }
          .nav-menu.active { right: 0; }
          .nav-menu ul { flex-direction: column; gap: 2rem; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
