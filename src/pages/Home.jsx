import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const FEATURE_ITEMS = [
  {
    icon: '🎂',
    title: 'Custom Cakes',
    description:
      'From elegant wedding tiers to fun birthday showstoppers — every cake is designed just for you, made entirely from scratch.',
  },
  {
    icon: '🍪',
    title: 'Cupcakes & Brownies',
    description:
      'Fudgy brownies, gooey chocolate chip cookies, and fluffy cupcakes that disappear a little too quickly.',
  },
  {
    icon: '🥧',
    title: 'Meringues & Tarts',
    description:
      'Delicate meringues, classic South African milk tart, and seasonal fruit tarts crafted with the finest ingredients.',
  },
]

const STATS = [
  { number: '200+', label: 'Happy Customers' },
  { number: '3+',   label: 'Years Baking'    },
  { number: '100%', label: 'Made from Scratch'},
]

// Animation variants
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0  },
}

const fadeRight = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0   },
}

const fadeLeft = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0  },
}

const Home = () => {
  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <header className="hero">
        <div className="container hero-container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
          >
            <h1>Baking Your Story,<br />One Treat at a Time.</h1>
            <p className="subtitle">
              Custom cakes, cookies, and pastries made from scratch with love.
            </p>
            <div className="hero-actions">
              <Link to="/gallery" className="cta-button">View Our Creations</Link>
              <Link to="/order"   className="cta-button outline">Place an Order</Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <img
              src="./logo.png"
              alt="The Sweetest Chapter logo"
              width="460"
              height="460"
              loading="eager"
            />
          </motion.div>
        </div>
      </header>

      {/* ── Welcome ── */}
      <section className="page-section welcome-section">
        <div className="container">
          <div className="section-title">
            <h2>Welcome to Our Kitchen</h2>
          </div>

          <div className="welcome-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeRight}
              transition={{ duration: 0.75 }}
            >
              <img
                src="./images/homepagepic1.jpg"
                alt="A beautiful custom celebration cake"
                className="rounded-img"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="welcome-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeLeft}
              transition={{ duration: 0.75 }}
            >
              <p>
                Hello and welcome to <strong>The Sweetest Chapter</strong>! We are a small,
                home-based bakery specialising in custom cakes, cupcakes, and other
                delicious treats.
              </p>
              <p>
                Everything is made from scratch with the freshest ingredients and a whole
                lot of love. We believe every celebration deserves a special dessert —
                and we&apos;re here to help you create the perfect centrepiece for your
                next event.
              </p>
              <Link to="/order" className="cta-button">Learn How to Order</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="stats-strip" aria-label="Bakery highlights">
        <div className="container">
          <div className="stats-grid">
            {STATS.map(({ number, label }) => (
              <motion.div
                key={label}
                className="stat-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
              >
                <span className="stat-number">{number}</span>
                <span className="stat-label">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Bakes ── */}
      <section className="page-section bg-alt">
        <div className="container">
          <div className="section-title">
            <h2>Featured Bakes</h2>
            <p>Handcrafted favourites made with premium ingredients and creative flair.</p>
          </div>

          <div className="featured-grid">
            {FEATURE_ITEMS.map(({ icon, title, description }, i) => (
              <motion.div
                key={title}
                className="feature-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <span className="feature-icon" aria-hidden="true">{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
