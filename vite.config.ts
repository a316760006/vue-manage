import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
// https://vitejs.dev/config/
const viteConfig = defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
    plugins: [vue()],
    resolve: {
      alias: [{
        find: '@',
        replacement: resolve(__dirname, 'src')
      }]
    },
    base: './', // 打包路径
    server: {
			host: '0.0.0.0',
      port: env.VITE_PORT as unknown as number,
      open: env.VITE_OPEN, // 服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      proxy: {
        '/api': {
          target: "http://xxxxxxx:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace('/api', '')
        }
      }
    }
  }
})
export default viteConfig