import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173, // Ensure this matches the desired port
    host: '0.0.0.0', // Allows external access (important for servers)
    strictPort: true, // Ensures Vite runs only on the specified port
    allowedHosts: ['https://enactus-zarva-project-kappa.vercel.app/'], // Add your domain to allow access
    cors: true, // Enable CORS to prevent related issues
  }
});