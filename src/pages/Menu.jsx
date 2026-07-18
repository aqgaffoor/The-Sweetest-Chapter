import { motion } from 'framer-motion'

const CATEGORIES = [
  {
    icon: '🎂',
    title: 'Custom Cakes',
    items: [
      'Red Velvet Cake',
      'Decadent Chocolate Cake',
      'Rainbow Layer Cake',
      'Classic Vanilla Bean',
      'Carrot Cake with Cream Cheese Frosting',
      'Custom-themed Birthday Cakes',
    ],
  },
  {
    icon: '🍪',
    title: 'Cookies & Brownies',
    items: [
      'Gooey Fudgy Brownies',
      'Chocolate Crinkle Cookies',
      'Classic Chocolate Chip Cookies',
      'Melt-in-your-mouth Shortbread',
    ],
  },
  {
    icon: '🥧',
    title: 'Tarts & Pastries',
    items: [
      'Classic South African Milk Tart',
      'Handmade Meringues',
      'Seasonal Fruit Tarts',
      'Custom Cupcakes (by the dozen)',
    ],
  },
]

const fadeIn = (direction, i) => ({
  initial:      { opacity: 0, x: direction === 'left' ? -35 : 35 },
  whileInView:  { opacity: 1, x: 0 },
  viewport:     { once: true, margin: '-60px' },
  transition:   { duration: 0.65, delay: i * 0.08 },
})

const Menu = () => {
  return (
    <div className="menu-page">
      <section
        className="page-section bg-alt"
        style={{ paddingTop: 'calc(var(--nav-height) + 3rem)' }}
      >
        <div className="container">
          <div className="section-title">
            <h2>Our Menu</h2>
            <p>All items are made-to-order with love and the freshest ingredients.</p>
          </div>

          <div className="menu-grid">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                className="menu-category-card"
                {...fadeIn(i % 2 === 0 ? 'left' : 'right', i)}
              >
                <div className="menu-card-header">
                  <span className="menu-card-icon" aria-hidden="true">{cat.icon}</span>
                  <h3>{cat.title}</h3>
                </div>

                <ul>
                  {cat.items.map((item) => (
                    <li key={item}>
                      <span className="menu-item-bullet" aria-hidden="true">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="menu-note" role="note">
            <p>
              <strong>Pricing varies</strong> based on size, design complexity, and
              ingredients. Fill out our{' '}
              <a href="#/order" style={{ color: 'var(--clr-pink)', fontWeight: 600 }}>
                order form
              </a>{' '}
              and we&apos;ll send you a custom quote within 24 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Menu
