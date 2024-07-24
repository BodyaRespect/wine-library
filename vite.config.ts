import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper'
// import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    ViteSvgSpriteWrapper({
      outputDir: 'public/images',
      generateType: true,
    }),

    // ...(mode === 'development' ? [mkcert()] : []),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}))
