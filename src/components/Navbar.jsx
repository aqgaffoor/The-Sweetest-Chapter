import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

const NAV_LINKS = [
  { to: '/',        label: 'Home'        },
  { to: '/gallery', label: 'Gallery'     },
  { to: '/menu',    label: 'Menu'        },
  { to: '/order',   label: 'How to Order'},
]

const Navbar = () => {
  const [isScrolled, setIsScrolled]   = useState(false)
  const [isMenuOpen, setIsMenuOpen]   = useState(false)
  const location                      = useLocation()

  // Scroll listener — collapse padding when scrolled
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Close menu with ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  return (
    <>
      <nav className={`navbar${isScrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="container nav-container">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            The Sweetest Chapter
          </Link>

          <div
            className={`nav-menu${isMenuOpen ? ' active' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <ul>
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={location.pathname === to ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <button
            className={`nav-toggle${isMenuOpen ? ' active' : ''}`}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Backdrop — clicking it closes the menu */}
      <div
        className={`nav-backdrop${isMenuOpen ? ' active' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  )
}

export default Navbar
