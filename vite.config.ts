import { defineConfig } from 'vite'
import { resolve } from 'path'
import { envResolver } from './config'

export default defineConfig(({ mode }) => {
    return Object.assign(envResolver[mode](), {
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@assets': resolve(__dirname, 'src/assets')
            }
        },
        envDir: resolve(__dirname, 'config/env'),
        // envPrefix: 'ENV_' // 配置vite注入客户端环境变量校验前缀
        optimizeDeps: {
            exclude: [] // 将指定数组中的依赖不进行依赖预构建
        }
    })
})
