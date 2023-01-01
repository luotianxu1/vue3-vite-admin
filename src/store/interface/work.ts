export interface ToDoItem {
	name: string
	time: number
	remind: boolean
	id: number
}

export interface WorkState {
	// 用户信息
	TODO_LIST: ToDoItem[]
}
