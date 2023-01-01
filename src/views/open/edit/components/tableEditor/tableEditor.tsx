import deepcopy from "deepcopy"
import { ElButton, ElTag } from "element-plus"
import { $tableDialog } from "../tableDialog/tableDialog"

export default defineComponent({
	props: {
		propConfig: {
			type: Object,
			default: () => {}
		},
		modelValue: {
			type: Array,
			default: () => []
		}
	},
	emits: ["update:modelValue"],
	setup(props, ctx) {
		const data = computed({
			get() {
				return props.modelValue || []
			},
			set(newValue) {
				ctx.emit("update:modelValue", deepcopy(newValue))
			}
		})
		const add = () => {
			$tableDialog({
				config: props.propConfig,
				data: data.value,
				onConfirm(value) {
					data.value = value
				}
			})
		}
		return () => {
			return (
				<div>
					{(!data.value || data.value.length === 0) && <ElButton onClick={add}>添加</ElButton>}
					{(data.value || []).map((item: any) => (
						<ElTag onClick={add}>{item[props.propConfig.table.key]}</ElTag>
					))}
				</div>
			)
		}
	}
})
