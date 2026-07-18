import { motion } from 'framer-motion'

const ORDER_STEPS = [
  {
    step:        1,
    title:       'Fill the Form',
    description: 'Tell us what you have in mind — flavour, size, date, and any special design ideas.',
  },
  {
    step:        2,
    title:       'Get a Quote',
    description: 'We&apos;ll reply within 24 hours with a personalised quote and available dates.',
  },
  {
    step:        3,
    title:       'Enjoy the Magic',
    description: 'Sit back while we bake your creation. Pickup or delivery arranged on your special day.',
  },
]

const Order = () => {
  return (
    <div className="order-page">
      <section
        className="page-section bg-alt"
        style={{ paddingTop: 'calc(var(--nav-height) + 3rem)' }}
      >
        <div className="container">
          <div className="section-title">
            <h2>Place an Order</h2>
            <p>Ready to start your sweetest chapter? Let&apos;s make it happen.</p>
          </div>

          {/* How it works */}
          <div className="order-intro" aria-label="How to order steps">
            {ORDER_STEPS.map(({ step, title, description }, i) => (
              <motion.div
                key={step}
                className="order-step"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
              >
                <div className="order-step-number" aria-hidden="true">{step}</div>
                <h4>{title}</h4>
                <p dangerouslySetInnerHTML={{ __html: description }} />
              </motion.div>
            ))}
          </div>

          {/* Order Form */}
          <motion.div
            className="form-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <form action="https://formspree.io/f/meendlrk" method="POST" noValidate>
              <div className="form-group">
                <label htmlFor="order-name">Your Name</label>
                <input
                  id="order-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="order-email">Email Address</label>
                <input
                  id="order-email"
                  type="email"
                  name="email"
                  required
                  placeholder="jane@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="order-phone">Phone Number</label>
                <input
                  id="order-phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="+27 82 000 0000"
                  autoComplete="tel"
                />
              </div>

              <div className="form-group">
                <label htmlFor="order-details">Order Details</label>
                <textarea
                  id="order-details"
                  name="message"
                  rows={6}
                  placeholder="Tell us about your order — occasion, flavour, size, date needed, and any design ideas…"
                />
              </div>

              <div className="form-submit">
                <button type="submit" className="cta-button">
                  Send Order Request
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  )
}

export default Order
