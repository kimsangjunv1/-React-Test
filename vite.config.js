import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.koreaexim.go.kr',  // 실제 API 서버 주소
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/site/program/financial/exchangeJSON/'),  // 경로 수정
      },
    },
  },
})