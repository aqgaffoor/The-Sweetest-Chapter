import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-col">
            <p className="footer-brand-name">The Sweetest Chapter</p>
            <p className="footer-brand-tagline">
              A home-based bakery crafting custom cakes, cupcakes, and pastries
              made from scratch with love — one treat at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/order">Place an Order</Link></li>
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div className="footer-col">
            <h4>Follow Along</h4>
            <a
              href="https://www.instagram.com/thesweetest_chapter/"
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              aria-label="Follow The Sweetest Chapter on Instagram"
            >
              {/* Instagram icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              @thesweetest_chapter
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {year} The Sweetest Chapter. All rights reserved.
          </p>
          <p className="footer-copy">
            Made with <span className="footer-heart" aria-label="love">♥</span> for every celebration
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
