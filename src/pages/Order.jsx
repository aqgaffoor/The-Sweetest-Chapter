import { motion } from 'framer-motion'

const Order = () => {
  return (
    <div className="order-page">
      <section className="page-section bg-alt" style={{ paddingTop: '150px' }}>
        <div className="container">
          <motion.div 
            className="form-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="section-title">
              <h2>Place an Order</h2>
              <p>Ready to start your sweetest chapter? Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form action="https://formspree.io/f/meendlrk" method="POST">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" name="name" required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input type="email" name="email" required placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" required placeholder="+1 234 567 890" />
              </div>
              <div className="form-group">
                <label>Order Details</label>
                <textarea name="message" rows="6" placeholder="e.g., A red velvet cake for a 21st birthday..."></textarea>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="cta-button">Send Order Request</button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .form-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 4rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
        }
        .form-group {
          margin-bottom: 2rem;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 1rem 1.5rem;
          border: 2px solid var(--clr-pink-light);
          border-radius: 8px;
          font-family: inherit;
        }
        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--clr-pink);
          box-shadow: 0 0 0 4px var(--clr-pink-light);
        }

        @media (max-width: 768px) {
          .form-container { padding: 2rem; }
        }
      `}</style>
    </div>
  )
}

export default Order
