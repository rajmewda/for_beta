import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config: React plugin + Google Fonts preconnect hint
export default defineConfig({
  plugins: [react()],
});
