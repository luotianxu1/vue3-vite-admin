// * Tabs（黑名单地址，不需要添加到 tabs 的路由地址）
export const TABS_BLACK_LIST: string[] = ["/403", "/404", "/500", "/login"]

// 路由白名单
export const RROUTER_WHITLE: string[] = ["/login", "/work/index", "/newYear"]

// token名称
export const TOKEN: string = "token"

// 登录时间
export const TIME_STAMP: string = "timeStamp"

// token过期时间
export const TOKEN_TIME_VALUE: number = 2 * 3600 * 1000

// 名称
export const GLOB_APP_TITLE: string = "vue3-vite-admin"

// 主页面路由
export const GLOB_APP_HOME: string = "/system/user"

// 登陆页面路由
export const GLOB_APP_LOGIN: string = "/login"

// 默认主图色
export const DEFAULT_PRIMARY: string = "#409EFF"
