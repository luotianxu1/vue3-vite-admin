import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'src/assets')
        }
    },
    optimizeDeps: {
        exclude: [] // 将指定数组中的依赖不进行依赖预构建
    }
    // envPrefix: 'ENV_' // 配置vite注入客户端环境变量校验前缀
})
