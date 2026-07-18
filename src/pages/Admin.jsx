import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const Admin = () => {
  const [user, setUser]             = useState(null)
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [loading, setLoading]       = useState(false)
  const [uploading, setUploading]   = useState(false)
  const [galleryItems, setGalleryItems] = useState([])

  // Fix: getSession() returns a Promise — must be awaited
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      if (session?.user) fetchGallery()
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchGallery()
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setGalleryItems([])
  }

  const fetchGallery = async () => {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    setGalleryItems(data || [])
  }

  const handleFileUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file    = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
    const filePath = `gallery/${fileName}`

    setUploading(true)

    try {
      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      // 3. Save record to database
      const { error: dbError } = await supabase
        .from('gallery')
        .insert([{ image_url: publicUrl }])

      if (dbError) throw dbError

      alert('Image uploaded successfully!')
      fetchGallery()
    } catch (err) {
      alert(err.message)
    } finally {
      setUploading(false)
      // Reset file input so the same file can be re-uploaded if needed
      e.target.value = ''
    }
  }

  const deleteImage = async (id, url) => {
    if (!confirm('Delete this image? This cannot be undone.')) return

    try {
      // Extract storage path from full URL (everything after /images/)
      const path = url.split('/images/')[1]
      await supabase.storage.from('images').remove([path])
      await supabase.from('gallery').delete().eq('id', id)
      fetchGallery()
    } catch (err) {
      alert(`Could not delete image: ${err.message}`)
    }
  }

  /* ── Login screen ── */
  if (!user) {
    return (
      <div className="admin-login page-section">
        <div className="container">
          <div className="form-container">
            <div className="section-title">
              <h2>Bakery Login</h2>
              <p>Manage your site content</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="admin-email">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                className="cta-button"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Logging in…' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  /* ── Dashboard ── */
  return (
    <div
      className="admin-dashboard page-section"
      style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}
    >
      <div className="container">
        <div className="dashboard-header">
          <h2>Welcome, Bakery Owner ✨</h2>
          <button onClick={handleLogout} className="cta-button outline">
            Logout
          </button>
        </div>

        <div className="upload-box">
          <p>Add a new masterpiece to your gallery</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            id="file-upload"
            hidden
          />
          <label htmlFor="file-upload" className="cta-button" aria-busy={uploading}>
            {uploading ? 'Uploading…' : 'Upload New Photo'}
          </label>
        </div>

        {galleryItems.length > 0 ? (
          <div className="admin-gallery-grid">
            {galleryItems.map((item) => (
              <div key={item.id} className="admin-gallery-item">
                <img src={item.image_url} alt="Gallery item" loading="lazy" />
                <button
                  className="delete-btn"
                  onClick={() => deleteImage(item.id, item.image_url)}
                  aria-label="Delete this image"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--clr-brown-pale)', padding: '2rem 0' }}>
            No images in gallery yet. Upload one above!
          </p>
        )}
      </div>
    </div>
  )
}

export default Admin
