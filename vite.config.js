import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // This repository is a GitHub Pages user site (kadevoss.github.io), so it
  // is served from the domain root rather than a /repository-name/ subpath.
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['.e2b.app'],
  },
  preview: {
    allowedHosts: ['.e2b.app'],
  },
})
