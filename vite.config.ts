import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // 获取所有可能的 Key，不管叫什么名字
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || "";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // 关键修复：这就是解决 "process is not defined" 的魔法
    define: {
      'process.env': {
        GEMINI_API_KEY: JSON.stringify(apiKey),
        NODE_ENV: JSON.stringify(mode),
      },
    },
    base: '/',
  };
});
