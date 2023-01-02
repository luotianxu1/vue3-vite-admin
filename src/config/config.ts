// * 首页地址（默认）
export const HOME_URL: string = "/system/user"

// * Tabs（黑名单地址，不需要添加到 tabs 的路由地址）
export const TABS_BLACK_LIST: string[] = ["/403", "/404", "/500", "/login"]

// 路由白名单
export const RROUTER_WHITLE: string[] = ["/login", "/work/index"]

// token名称
export const TOKEN = "token"

// 登录时间
export const TIME_STAMP = "timeStamp"

// token过期时间
export const TOKEN_TIME_VALUE = 2 * 3600 * 1000

// 名称
export const GLOB_APP_TITLE = "vue3-vite-admin"

// 主页面路由
export const GLOB_APP_HOME = "/system/user"

// 登陆页面路由
export const GLOB_APP_LOGIN = "/login"
