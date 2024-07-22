import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
// import mkcert from 'vite-plugin-mkcert'
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper'

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
  base: '/wine-library/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}))
