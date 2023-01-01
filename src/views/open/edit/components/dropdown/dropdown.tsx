import { createVNode, render } from "vue"
import "./dropdown.scss"

const DropdownComponent = defineComponent({
	props: {
		option: {
			type: Object,
			default: () => {}
		}
	},
	setup(props, ctx) {
		const state = reactive({
			option: props.option,
			isShow: false,
			top: 0,
			left: 0
		})
		// 让外界可以调用组件的方法
		ctx.expose({
			showDropdown(option) {
				state.option = option
				state.isShow = true
				let { top, left, height } = option.el.getBoundingClientRect()
				state.top = top + height
				state.left = left
			}
		})
		provide("hide", () => (state.isShow = false))
		const classes = computed(() => [
			"dropdown",
			{
				"dropdown-isShow": state.isShow
			}
		])
		const styles = computed(() => ({
			top: state.top + "px",
			left: state.left + "px"
		}))
		const el = ref()
		const onmousedownDocument = e => {
			//  r如果点击的是dropdown内部 什么都不做
			if (!el.value.contains(e.target)) {
				state.isShow = false
			}
		}
		onMounted(() => {
			// 事件的传递行为是先捕获，再冒泡
			// 之前为了阻止事件传播给block增加了stopPropagation
			document.addEventListener("mousedown", onmousedownDocument, false)
		})
		onBeforeUnmount(() => {
			document.removeEventListener("mousedown", onmousedownDocument)
		})
		return () => {
			return (
				<div class={classes.value} style={styles.value} ref={el}>
					{state.option.content()}
				</div>
			)
		}
	}
})

let vm
export function $dropdown(option) {
	if (!vm) {
		let el = document.createElement("div")
		vm = createVNode(DropdownComponent, { option })
		// 这里需要讲el渲染到页面中
		document.body.appendChild((render(vm, el), el))
	}
	// 讲组件渲染到这个el元素上
	let { showDropdown } = vm.component.exposed
	showDropdown(option)
}
