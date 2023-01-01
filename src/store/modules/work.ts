import { defineStore } from "pinia"
import { WorkState } from "../interface/work"
import piniaPersistConfig from "@/config/piniaPersist"

export const WorkStore = defineStore({
	id: "UserState",
	state: (): WorkState => ({
		TODO_LIST: []
	}),
	getters: {},
	actions: {},
	persist: piniaPersistConfig("UserState")
})
