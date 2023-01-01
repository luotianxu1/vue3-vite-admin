import { ElButton, ElDialog, ElInput } from "element-plus"
import { createVNode, render } from "vue"

const DialogComponent = defineComponent({
	props: {
		option: {
			type: Object,
			default: () => {}
		}
	},
	setup(props, ctx) {
		const state = reactive({
			option: props.option,
			isShow: false
		})
		// 让外界可以调用组件的方法
		ctx.expose({
			showDialog(option) {
				state.option = option
				state.isShow = true
			}
		})
		const onCancel = () => {
			state.isShow = false
		}
		const onConfirm = () => {
			state.isShow = false
			state.option.onConfirm && state.option.onConfirm(state.option.content)
		}
		return () => {
			return (
				<ElDialog v-model={state.isShow} title={state.option.title}>
					{{
						default: () => <ElInput type="textarea" v-model={state.option.content} rows={10}></ElInput>,
						footer: () =>
							state.option.footer && (
								<div>
									<ElButton onClick={onCancel}>取消</ElButton>
									<ElButton type="primary" onClick={onConfirm}>
										确定
									</ElButton>
								</div>
							)
					}}
				</ElDialog>
			)
		}
	}
})

let vm
export function $dialog(option) {
	if (!vm) {
		let el = document.createElement("div")
		vm = createVNode(DialogComponent, { option })
		// 这里需要讲el渲染到页面中
		document.body.appendChild((render(vm, el), el))
	}
	// 讲组件渲染到这个el元素上
	let { showDialog } = vm.component.exposed
	showDialog(option)
}
