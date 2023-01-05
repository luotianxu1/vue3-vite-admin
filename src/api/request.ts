import { getToken } from "@/utils/token"
import { TOKEN } from "@/config/config"
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { checkStatus } from "./checkStatus"
import { isCheckTimeout } from "@/utils/auth"
import { UserStore } from "@/store/modules/user"

const request: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL as string,
	timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		if (config && config.headers && getToken(TOKEN)) {
			// token过期退出操作
			if (isCheckTimeout()) {
				const userState = UserStore()
				userState.logout()
				return Promise.reject("登录过期！请重新登录！")
			}
			config.headers["Authorization"] = `Bearer ${getToken(TOKEN)}`
		}
		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

// 响应拦截器
request.interceptors.response.use(
	(result: AxiosResponse) => {
		const { data } = result
		if (data.status && data.status !== 200) {
			return Promise.reject(data)
		}
		return data
	},
	(error: AxiosError) => {
		ElMessage.error(error)
		return Promise.reject(error)
	}
)

export default request
