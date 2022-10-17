import { defineConfig } from 'vite'
// const config = loadEnv('development', './')

export default defineConfig({
    server: {
        port: 8000,
        open: true
        // proxy: {
        //     // 开发环境代理配置
        //     [config.VITE_APP_BASE_URL + '/api']: {
        //         target: 'https://mock.apifox.cn/m1/1566639-0-default',
        //         changeOrigin: true,
        //         rewrite: (serverPath) =>
        //             serverPath.replace(config.VITE_APP_BASE_URL + '/api', '')
        //     },
        //     [config.VITE_APP_BASE_URL + '/jhApi']: {
        //         target: 'http://v.juhe.cn',
        //         changeOrigin: true,
        //         rewrite: (serverPath) =>
        //             serverPath.replace(config.VITE_APP_BASE_URL + '/jhApi', '')
        //     },
        //     [config.VITE_APP_BASE_URL + '/map']: {
        //         target: 'https://restapi.amap.com',
        //         changeOrigin: true,
        //         rewrite: (serverPath) =>
        //             serverPath.replace(config.VITE_APP_BASE_URL + '/map', '')
        //     }
        // }
    }
})
