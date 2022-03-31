const systemState = {
  // 系统语言
  SYSTEM_LANGUAGE: 'zh',
  // 是否收缩侧边栏
  SYSTEM_COLLAPSE: false,
  // 当前页面路由
  SYSTEM_ACTIVE_ROUTER: '',
  // 历史路由
  SYSTEM_ROUTER: [] as Array<string>
}

export type SystemStateType = typeof systemState

export default {
  namespaced: true,
  state: systemState,
  mutations: {
    SET_SYSTEM_LANGUAGE(state: SystemStateType, data: string): void {
      state.SYSTEM_LANGUAGE = data
    },
    SET_SYSTEM_COLLAPSE(state: SystemStateType, data: boolean) {
      state.SYSTEM_COLLAPSE = data
    },
    SET_SYSTEM_ACTIVE_ROUTER(state: SystemStateType, data: string): void {
      state.SYSTEM_ACTIVE_ROUTER = data
    },
    SET_SYSTEM_ROUTER(state: SystemStateType, data: string): void {
      state.SYSTEM_ROUTER.push(data)
    },
    DEL_SYSTEM_ROUTER(state: SystemStateType, index: number): void {
      state.SYSTEM_ROUTER.splice(index, 1)
    },
    ClEAR_SYSTEM_ROUTER(state: SystemStateType): void {
      state.SYSTEM_ROUTER = []
    },
    CLOSEOTHER_SYSTEM_ROUTER(state: SystemStateType, data: []) {
      state.SYSTEM_ROUTER = data
    }
  },
  actions: {},
  modules: {}
}
