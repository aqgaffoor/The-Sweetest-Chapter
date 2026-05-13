import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Baking Your Story, One Treat at a Time.</h1>
            <p className="subtitle">Custom cakes, cookies, and pastries made from scratch with love.</p>
            <div className="hero-actions">
              <Link to="/gallery" className="cta-button">View Our Creations</Link>
              <Link to="/order" className="cta-button outline">Place an Order</Link>
            </div>
          </motion.div>
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img src="./logo.png" alt="The Sweetest Chapter Logo" />
          </motion.div>
        </div>
      </header>

      <section className="page-section welcome-section">
        <div className="container">
          <div className="section-title">
            <h2>Welcome to Our Kitchen</h2>
          </div>
          <div className="welcome-grid">
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <img src="./images/homepagepic1.jpg" alt="A beautiful custom cake" className="rounded-img" />
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
            >
              <p>
                Hello and welcome to <strong>The Sweetest Chapter</strong>! We are a small, home-based bakery specializing in custom cakes, cupcakes, and other delicious treats. 
              </p>
              <p>
                Everything is made from scratch with the freshest ingredients and a whole lot of love. We believe every celebration deserves a special dessert, and we're here to help you create the perfect centerpiece for your next event.
              </p>
              <Link to="/order" className="cta-button">Learn How to Order</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="page-section bg-alt">
        <div className="container">
          <div className="section-title">
            <h2>Featured Bakes</h2>
            <p>Handcrafted favorites made daily with premium ingredients.</p>
          </div>

          <div className="featured-grid">
            {['Custom Cakes', 'Cupcakes & Brownies', 'Meringue & Tarts'].map((title, i) => (
              <motion.div 
                key={title}
                className="feature-card"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: i * 0.2 }}
              >
                <h3>{title}</h3>
                <p>Delicious treats made with the finest ingredients and creative flair.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 100px;
          background: radial-gradient(circle at 70% 30%, var(--clr-pink-light) 0%, transparent 50%);
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-content h1 {
          font-size: 4.5rem;
          margin-bottom: 1.5rem;
          color: var(--clr-brown);
        }
        .hero-content .subtitle {
          font-size: 1.5rem;
          font-style: italic;
          margin-bottom: 2.5rem;
        }
        .hero-actions {
          display: flex;
          gap: 1.5rem;
        }
        .cta-button.outline {
          background: transparent;
          border: 2px solid var(--clr-pink);
          color: var(--clr-pink);
        }
        .hero-image img {
          width: 100%;
          max-width: 500px;
        }
        .welcome-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 4rem;
          align-items: center;
        }
        .rounded-img {
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
        }
        .section-title {
          text-align: center;
          margin-bottom: 3rem;
        }
        .section-title h2 {
          font-size: 3rem;
          color: var(--clr-gold);
        }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        .feature-card {
          background: white;
          padding: 3rem 2rem;
          border-radius: var(--radius-md);
          text-align: center;
          box-shadow: var(--shadow-sm);
        }
        .feature-card h3 {
          color: var(--clr-pink);
          margin-bottom: 1rem;
        }

        @media (max-width: 992px) {
          .hero-container { grid-template-columns: 1fr; text-align: center; }
          .hero-content h1 { font-size: 3.5rem; }
          .hero-actions { justify-content: center; }
          .hero-image { order: -1; }
        }
      `}</style>
    </div>
  )
}

export default Home
