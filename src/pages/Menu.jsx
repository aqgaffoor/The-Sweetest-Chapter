import { motion } from 'framer-motion'

const Menu = () => {
  const categories = [
    {
      title: 'Custom Cakes',
      items: ['Red Velvet Cake', 'Decadent Chocolate Cake', 'Rainbow Layer Cake', 'Classic Vanilla Bean', 'Carrot Cake with Cream Cheese', 'Custom-themed Birthday Cakes']
    },
    {
      title: 'Cookies & Brownies',
      items: ['Gooey Fudgy Brownies', 'Chocolate Crinkle Cookies', 'Classic Chocolate Chip Cookies', 'Melt-in-your-mouth Shortbread']
    },
    {
      title: 'Tarts & Pastries',
      items: ['Classic South African Milk Tart', 'Meringues', 'Seasonal Fruit Tarts', 'Custom Cupcakes (by the dozen)']
    }
  ]

  return (
    <div className="menu-page">
      <section className="page-section bg-alt" style={{ paddingTop: '150px' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Menu</h2>
            <p>All items are made-to-order with love and the freshest ingredients.</p>
          </div>

          <div className="menu-grid">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.title}
                className="menu-category-card"
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                transition={{ duration: 0.6 }}
              >
                <h3>{cat.title}</h3>
                <ul>
                  {cat.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
        }
        .menu-category-card {
          background: white;
          padding: 3rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          position: relative;
          overflow: hidden;
        }
        .menu-category-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 4px; height: 100%;
          background: var(--clr-gold);
        }
        .menu-category-card h3 {
          font-size: 2.2rem;
          color: var(--clr-pink);
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--clr-pink-light);
          padding-bottom: 1rem;
        }
        .menu-category-card li {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .menu-category-card li::before {
          content: '✦';
          color: var(--clr-gold);
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  )
}

export default Menu
