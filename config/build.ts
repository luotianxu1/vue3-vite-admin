import { defineConfig } from 'vite'

export default defineConfig({
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
