import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import setupExtend from 'vite-plugin-vue-setup-extend'
import { visualizer } from 'rollup-plugin-visualizer'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import cesium from 'vite-plugin-cesium'

export const getPlugins = (mode) => [
    vue(),
    vueJsx(),
    AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router'],
        dts: 'src/types/auto-imports.d.ts',
        eslintrc: {
            enabled: false, // Default `false`
            filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
            globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
    }),
    Components({
        resolvers: [ElementPlusResolver()],
        // dirs: ['src/components'],
        // directoryAsNamespace: true,
        dts: 'src/types/components.d.ts'
        // deep: true
    }),
    // setup语法糖设置名字
    setupExtend(),
    cesium(),
    // 生产报告 放在最后一个
    visualizer({
        open: mode === 'production',
        gzipSize: true,
        brotliSize: true,
        filename: resolve(process.cwd(), 'dist/report.html')
    })
]
