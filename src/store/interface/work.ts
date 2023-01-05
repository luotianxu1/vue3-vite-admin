export interface ToDoItem {
	name: string
	time: number
	remind: boolean
	id: number
}

export interface WorkState {
	todoList: ToDoItem[]
}
