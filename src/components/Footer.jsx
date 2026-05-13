const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} The Sweetest Chapter. All rights reserved.</p>
        <p>
          Follow our journey on 
          <a href="https://www.instagram.com/thesweetest_chapter/" target="_blank" rel="noreferrer"> Instagram</a>
        </p>
      </div>
      <style jsx>{`
        .footer {
          padding: 4rem 0;
          background-color: var(--clr-brown);
          color: white;
          text-align: center;
          margin-top: 4rem;
        }
        .footer p {
          color: var(--clr-pink-light);
          margin-bottom: 1rem;
        }
        .footer a {
          color: var(--clr-pink);
          font-weight: 600;
        }
      `}</style>
    </footer>
  )
}

export default Footer
