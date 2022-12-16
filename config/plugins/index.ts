import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import cesium from 'vite-plugin-cesium'
import { viteMockServe } from 'vite-plugin-mock'

export const getPlugins = (mode) => [
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
    cesium(),
    viteMockServe()
]
