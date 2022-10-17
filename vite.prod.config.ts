import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            output: {}
        },
        assetsInlineLimit: 4096
    }
})
