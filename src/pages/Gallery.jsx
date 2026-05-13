import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../supabaseClient'

const Gallery = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImg, setSelectedImg] = useState(null)

  // Local fallback images
  const localImages = Array.from({ length: 26 }, (_, i) => `/images/cake${i + 1}.jpg`)

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      if (data && data.length > 0) {
        setImages(data.map(item => item.image_url))
      } else {
        setImages(localImages)
      }
    } catch (error) {
      console.error('Error fetching gallery:', error.message)
      setImages(localImages)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="gallery-page">
      <section className="page-section bg-alt" style={{ paddingTop: '150px' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Creations</h2>
            <p>A glimpse into the treats we've had the pleasure of baking. Each one tells a story.</p>
          </div>

          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <div className="gallery-grid">
              {images.map((img, index) => (
                <motion.div 
                  key={index}
                  className="gallery-item"
                  whileHover={{ scale: 1.02 }}
                  layoutId={img}
                  onClick={() => setSelectedImg(img)}
                >
                  <img src={img} alt={`Custom cake ${index + 1}`} />
                  <div className="overlay">View Details</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImg && (
        <div className="lightbox" onClick={() => setSelectedImg(null)}>
          <motion.img 
            src={selectedImg} 
            layoutId={selectedImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        </div>
      )}

      <style jsx>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .gallery-item {
          position: relative;
          aspect-ratio: 1;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(217, 140, 140, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          opacity: 0;
          transition: 0.3s ease;
        }
        .gallery-item:hover .overlay { opacity: 1; }
        
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          cursor: zoom-out;
        }
        .lightbox img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 8px;
        }
        .loader {
          text-align: center;
          font-size: 1.5rem;
          padding: 4rem;
        }
      `}</style>
    </div>
  )
}

export default Gallery
