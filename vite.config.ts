import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 👇 这一段是解决黑屏的关键！
  // 它告诉浏览器："如果看到 process.env，别报错，就当它是个空对象"
  define: {
    'process.env': {},
  },
  base: '/',
})
