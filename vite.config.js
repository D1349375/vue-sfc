import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // 🌟 這是解決白畫面的關鍵！必須跟你的 GitHub Repository 名稱完全一模一樣
  base: './', 
  plugins: [vue()],
})