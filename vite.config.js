import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/site/program/financial/exchangeJSON': {
        target: 'https://www.koreaexim.go.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/site\/program\/financial\/exchangeJSON/, '/site/program/financial/exchangeJSON')
      }
    }
  }
})