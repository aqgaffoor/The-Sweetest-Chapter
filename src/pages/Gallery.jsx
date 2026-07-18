import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../supabaseClient'

// 26 local cake images as fallback
const LOCAL_IMAGES = Array.from({ length: 26 }, (_, i) => ({
  src: `./images/cake${i + 1}.jpg`,
  alt: `Custom bake ${i + 1}`,
}))

const SkeletonGrid = () => (
  <div className="gallery-skeleton" aria-label="Loading gallery…" aria-busy="true">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="skeleton-item" aria-hidden="true" />
    ))}
  </div>
)

const Gallery = () => {
  const [images, setImages]         = useState([])
  const [loading, setLoading]       = useState(true)
  const [selectedImg, setSelectedImg] = useState(null)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          setImages(data.map((item) => ({ src: item.image_url, alt: 'Custom bake' })))
        } else {
          setImages(LOCAL_IMAGES)
        }
      } catch {
        setImages(LOCAL_IMAGES)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  // Close lightbox with ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedImg(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedImg ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedImg])

  const openImage  = useCallback((img) => setSelectedImg(img), [])
  const closeImage = useCallback(() => setSelectedImg(null), [])

  return (
    <div className="gallery-page">
      <section
        className="page-section bg-alt"
        style={{ paddingTop: 'calc(var(--nav-height) + 3rem)' }}
      >
        <div className="container">
          <div className="section-title">
            <h2>Our Creations</h2>
            <p>A glimpse into the treats we&apos;ve had the pleasure of baking. Each one tells a story.</p>
          </div>

          {loading ? (
            <SkeletonGrid />
          ) : (
            <div className="gallery-grid">
              {images.map(({ src, alt }, index) => (
                <motion.div
                  key={src + index}
                  className="gallery-item"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => openImage({ src, alt })}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${alt} in full screen`}
                  onKeyDown={(e) => e.key === 'Enter' && openImage({ src, alt })}
                >
                  <img src={src} alt={alt} loading="lazy" />
                  <div className="gallery-overlay" aria-hidden="true">
                    <span className="gallery-overlay-text">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      View
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeImage}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              className="lightbox-close"
              onClick={closeImage}
              aria-label="Close image viewer"
            >
              ✕
            </button>
            <motion.img
              src={selectedImg.src}
              alt={selectedImg.alt}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
