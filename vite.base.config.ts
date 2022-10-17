import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import cesium from 'vite-plugin-cesium'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router'],
            dts: 'src/types/auto-imports.d.ts'
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            // dirs: ['src/components'],
            // directoryAsNamespace: true,
            dts: 'src/types/components.d.ts'
            // deep: true
        }),
        cesium()
    ],
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
