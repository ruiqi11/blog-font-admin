import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    hwr: true, // 热更新
    port: 3000,
    proxy: {
      '/api': {
        // target: loadEnv(mode, process.cwd()).VITE_APP_PROXY_TARGET,
        target: 'http://localhost:8081/',
        secure: false,
        chagneOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
