import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Since the site is at the root domain (https://aqgaffoor.github.io/), we use '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
