import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { getPlugins } from './plugins'

export default defineConfig({
    plugins: [viteMockServe(), ...getPlugins('development')],
    server: {
        port: 8000,
        open: true
    }
})
