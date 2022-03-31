export type UserSate = {
    USER_INFO: {
        id?: number,
        name?: string,
        sex?: number,
        age?: number,
        type?: number,
        phone?: number,
        email?: string,
        city?: string,
        status?: number,
        img?: string,
        addTime?: string,
        editTime?: string
    }
}

const userSate: UserSate = {
  // 用户信息
  USER_INFO: {}
}

export type userSateType = typeof userSate

export default {
  namespaced: true,
  state: userSate,
  mutations: {
    SET_USER_INFO(state: UserSate, data) {
      state.USER_INFO = data
    }
  },
  actions: {},
  modules: {}
}
