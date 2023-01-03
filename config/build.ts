import { defineConfig } from "vite"
import { viteMockServe } from "vite-plugin-mock"
import { getPlugins } from "./plugins"

export default defineConfig({
	plugins: [
		viteMockServe({
			// 更多配置见最下方
			mockPath: "./mock/", //mock文件地址
			localEnabled: false, // 开发打包开关
			prodEnabled: true, // 生产打包开关 // 这样可以控制关闭mock的时候不让mock打包到最终代码内
			injectCode: ` import { setupProdMockServer } from './utils/mockProdServer'; setupProdMockServer(); `,
			logger: false, //是否在控制台显示请求日志
			supportTs: true //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
		}),
		...getPlugins("production")
	],
	build: {
		rollupOptions: {
			output: {
				// 分包
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return id.toString().split("node_modules/")[1].split("/")[0].toString()
					}
				}
			}
		},
		assetsInlineLimit: 4096,
		minify: "terser",
		//  清除console和debugger
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	}
})
