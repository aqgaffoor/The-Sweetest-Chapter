import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { motion } from 'framer-motion'

const Admin = () => {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [galleryItems, setGalleryItems] = useState([])

  useEffect(() => {
    const session = supabase.auth.getSession()
    setUser(session?.user || null)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    if (session?.user) fetchGallery()

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
  }

  const fetchGallery = async () => {
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
    setGalleryItems(data || [])
  }

  const handleFileUpload = async (e) => {
    try {
      setUploading(true)
      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `gallery/${fileName}`

      // 1. Upload to Storage
      let { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      // 3. Save to Database
      const { error: dbError } = await supabase
        .from('gallery')
        .insert([{ image_url: publicUrl }])

      if (dbError) throw dbError

      alert('Image uploaded successfully!')
      fetchGallery()
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (id, url) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    
    // Extract file path from URL
    const path = url.split('/images/')[1]
    
    await supabase.storage.from('images').remove([path])
    await supabase.from('gallery').delete().eq('id', id)
    fetchGallery()
  }

  if (!user) {
    return (
      <div className="admin-login page-section" style={{ paddingTop: '150px' }}>
        <div className="container">
          <div className="form-container" style={{ maxWidth: '400px' }}>
            <div className="section-title">
              <h2>Bakery Login</h2>
              <p>Manage your site content</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="cta-button" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard page-section" style={{ paddingTop: '150px' }}>
      <div className="container">
        <div className="dashboard-header">
          <h2>Welcome, Bakery Owner</h2>
          <button onClick={handleLogout} className="cta-button outline">Logout</button>
        </div>

        <div className="dashboard-section reveal active">
          <h3>Manage Gallery</h3>
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
            <label htmlFor="file-upload" className="cta-button">
              {uploading ? 'Uploading...' : 'Upload New Photo'}
            </label>
          </div>

          <div className="admin-gallery-grid">
            {galleryItems.map(item => (
              <div key={item.id} className="admin-gallery-item">
                <img src={item.image_url} alt="Gallery item" />
                <button onClick={() => deleteImage(item.id, item.image_url)} className="delete-btn">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }
        .upload-box {
          background: white;
          padding: 3rem;
          border-radius: var(--radius-md);
          text-align: center;
          margin-bottom: 3rem;
          border: 2px dashed var(--clr-pink-light);
        }
        .admin-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }
        .admin-gallery-item {
          position: relative;
          aspect-ratio: 1;
        }
        .admin-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
        .delete-btn {
          position: absolute;
          top: 5px;
          right: 5px;
          background: rgba(255, 0, 0, 0.7);
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
        }
        .delete-btn:hover { background: red; }
      `}</style>
    </div>
  )
}

export default Admin
