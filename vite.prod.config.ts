import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import cesium from 'vite-plugin-cesium'
import { viteMockServe } from 'vite-plugin-mock'
import viteCompression from 'vite-plugin-compression'

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
        cesium(),
        viteMockServe({
            // 更多配置见最下方
            mockPath: './mock/', //mock文件地址
            localEnabled: false, // 开发打包开关
            prodEnabled: true, // 生产打包开关 // 这样可以控制关闭mock的时候不让mock打包到最终代码内
            injectCode: ` import { setupProdMockServer } from './utils/mockProdServer'; setupProdMockServer(); `,
            logger: false, //是否在控制台显示请求日志
            supportTs: true //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
        }),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz'
        })
    ],
    build: {
        rollupOptions: {
            output: {
                // 分包
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                }
            }
        },
        assetsInlineLimit: 4096,
        //  清除console和debugger
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    }
})
