/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 */
import type { Directive, DirectiveBinding } from "vue"

interface ElType extends HTMLElement {
	handleClick: () => any
}
const debounce: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		if (typeof binding.value !== "function") {
			throw ElMessage.warning("请绑定函数！")
		}
		let timer: any = null
		el.handleClick = function () {
			if (timer) {
				clearInterval(timer)
			}
			timer = setTimeout(() => {
				binding.value()
			}, 500)
		}
		el.addEventListener("click", el.handleClick)
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", el.handleClick)
	}
}

export default debounce
